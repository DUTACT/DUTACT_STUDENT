import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  notificationId: string
  createdAt: string
  notificationType: string
  details: any
}

interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: []
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    }
  }
})

export const { addNotification, clearNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer
