import { toast } from 'react-toastify'
import useLocalStorage from 'src/hooks/useLocalStorage'
import { MessageCommand, WebSocketMessage } from 'src/types/websocket.type'
import { getOrCreateFingerprintId } from 'src/utils/fingerprint'

let socket: WebSocket | null = null

export const convertToWebSocketMessage = (message: WebSocketMessage): string => {
  const headersString = Object.entries(message.headers)
    .map(([key, value]) => `${key}:${value}`)
    .join('\n')

  return `${message.command}\n${headersString}\n\n${message.body ?? ''}\n\n`
}

export const parseMessage = (message: string): WebSocketMessage => {
  const [commandLine, ...lines] = message.split('\n')
  const command = commandLine.trim() as MessageCommand
  const headers: Record<string, string> = {}
  let body: string | null = null

  let i = 0

  while (i < lines.length && lines[i].trim() !== '') {
    const line = lines[i].trim()
    const [key, value] = line.split(':')
    if (key && value) {
      headers[key.trim()] = value.trim()
    }
    i++
  }

  i++

  if (i < lines.length) {
    body = lines.slice(i).join('\n').trim()
  }

  return {
    command,
    headers,
    body: body || null
  }
}

const handleMessage = (message: string, onMessage: (data: any) => void) => {
  if (message.startsWith('{') || message.startsWith('[')) {
    try {
      onMessage(JSON.parse(message))
    } catch (error) {
      console.error('Failed to parse JSON message:', error)
    }
  } else {
    const parsedMessage = parseMessage(message)

    if (parsedMessage.command === 'SUBSCRIBE_ACK') {
      const subscriptionToken = parsedMessage.headers['subscription-token']
      if (subscriptionToken) {
        localStorage.setItem('subscription-token', subscriptionToken)
        sendMessage({
          command: 'CONNECT',
          headers: { 'subscription-token': subscriptionToken }
        })
      }
    } else {
      switch (parsedMessage.command) {
        case 'MESSAGE': {
          if (parsedMessage.body) {
            const { notificationType, details } = JSON.parse(parsedMessage.body)
            if (notificationType === 'post_created') {
              console.log('details', details)
              toast.info(`Sự kiện ${details.event.name} vừa có một bài đăng mới`, {
                autoClose: 5 * 60 * 1000
              })
            }
          }
        }
      }
      onMessage(message)
    }
  }
}

const sendMessage = (message: WebSocketMessage) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(convertToWebSocketMessage(message))
  } else {
    console.warn('WebSocket is not open. Message not sent.')
  }
}

export const connectWebSocket = (url: string, onMessage: (data: any) => void) => {
  socket = new WebSocket(url)

  socket.onopen = async () => {
    console.log('WebSocket connected')
    const accessToken = localStorage.getItem('access_token')
    try {
      const tokenString = accessToken ? JSON.parse(accessToken).toString() : ''
      const subscriptionToken = localStorage.getItem('subscription-token')
      if (subscriptionToken) {
        sendMessage({
          command: 'CONNECT',
          headers: { 'subscription-token': subscriptionToken }
        })
      } else {
        const deviceId = await getOrCreateFingerprintId()
        sendMessage({
          command: 'SUBSCRIBE',
          headers: {
            'device-id': deviceId,
            'access-token': tokenString
          }
        })
      }
    } catch (error) {
      console.error('Failed to parse access_token:', error)
    }
  }

  socket.onmessage = (event) => handleMessage(event.data.trim(), onMessage)

  socket.onclose = () => {
    console.log('WebSocket disconnected')
    socket = null
  }

  socket.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
}

export const disconnectWebSocket = () => {
  if (socket) {
    if (socket.readyState === WebSocket.OPEN) {
      const subscriptionToken = localStorage.getItem('subscription-token')
      if (subscriptionToken) {
        sendMessage({
          command: 'DISCONNECT',
          headers: {
            'subscription-token': subscriptionToken
          }
        })
        sendMessage({
          command: 'UNSUBSCRIBE',
          headers: {
            'subscription-token': subscriptionToken
          }
        })
      }
    }

    socket.close()
    socket = null
  }
}
