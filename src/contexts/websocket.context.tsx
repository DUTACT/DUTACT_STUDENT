import { useSnackbar } from 'notistack'
import { createContext, useContext, useRef, useState } from 'react'
import CustomSnackbar from 'src/components/CustomSnackbar'
import NotificationContentSnackbar from 'src/components/NotificationContentSnackbar'
import { EventNotification, EventNotificationContent } from 'src/types/notification.type'
import { MessageCommand } from 'src/types/websocket.type'
import { getOrCreateFingerprintId } from 'src/utils/fingerprint'
import notificationSound from 'src/assets/sound/notification.wav'
import { useNotifications } from 'src/hooks/useNotifications'
import { useStudentId } from 'src/hooks/useStudentId'
import moment from 'moment'
import { DIFF_TIME_FOR_OLD_NOTIFICATION } from 'src/constants/common'

interface WebSocketMessage {
  command: string
  headers: Record<string, string>
  body?: string | null
}

interface WebSocketProviderProps {
  children: React.ReactNode
}

interface WebSocketContextType {
  connectWebSocket: (_url: string, _onMessage: (_data: any) => void) => void
  disconnectWebSocket: () => void
  sendMessage: (_message: WebSocketMessage) => void
  handleMessage: (_message: string, _onMessage: (_data: any) => void) => void
  notificationCount: number
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider')
  }
  return context
}

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

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const { addNotificationToCache } = useNotifications()
  const studentId = useStudentId()

  const socket = useRef<WebSocket | null>(null)
  const [notificationCount, setNotificationCount] = useState<number>(0)

  const connectWebSocket = (url: string, onMessage: (_data: any) => void) => {
    socket.current = new WebSocket(url)

    socket.current.onopen = async () => {
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

    socket.current.onmessage = (event) => {
      handleMessage(event.data, onMessage)
    }

    socket.current.onclose = () => {
      console.log('WebSocket disconnected')
    }

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  const disconnectWebSocket = () => {
    if (socket.current) {
      if (socket.current.readyState === WebSocket.OPEN) {
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
        localStorage.removeItem('subscription-token')
        socket.current.close()
        socket.current = null
      }
    }
  }

  const sendMessage = (message: WebSocketMessage) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(convertToWebSocketMessage(message))
    } else {
      console.warn('WebSocket is not open. Message not sent.')
    }
  }

  const handleMessage = (message: string, onMessage: (_data: any) => void) => {
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
              const notificationContent: EventNotificationContent = JSON.parse(parsedMessage.body)
              const createdAt = moment(notificationContent.createdAt)
              const currentTime = moment()

              const isOldNotification = currentTime.diff(createdAt, 'minutes') > DIFF_TIME_FOR_OLD_NOTIFICATION

              if (!isOldNotification) {
                enqueueSnackbar('notification', {
                  content: (key) => (
                    <CustomSnackbar
                      snackbarKey={key}
                      message={<NotificationContentSnackbar content={notificationContent} />}
                    />
                  ),
                  autoHideDuration: 2 * 60 * 1000
                })
                const audio = new Audio(notificationSound)
                audio.play().catch((error) => {
                  console.error('Failed to play audio:', error)
                })
              }

              setNotificationCount((prev) => prev + 1)
              addNotificationToCache({
                account_id: studentId,
                created_at: notificationContent.createdAt,
                id: notificationContent.notificationId,
                notification_type: notificationContent.notificationType,
                details: notificationContent.details
              } as EventNotification)
            }
          }
        }
        onMessage(message)
      }
    }
  }

  return (
    <WebSocketContext.Provider
      value={{
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
        handleMessage,
        notificationCount,
        setNotificationCount
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}
