export type ClientMessageCommand = 'SUBSCRIBE' | 'UNSUBSCRIBE' | 'CONNECT' | 'MESSAGE'

export type ServerMessageCommand = 'SUBSCRIBE_ACK' | 'OK' | 'DISCONNECT' | 'PING' | 'MESSAGE' | 'ERROR'

export type MessageCommand = ClientMessageCommand | ServerMessageCommand

export interface WebSocketMessage {
  command: MessageCommand
  headers: Record<string, string>
  body?: string | null
}
