import { combineReducers } from 'redux'
import modalConfirmReducer from './slices/modalConfirm'
import notificationsReducer from './slices/notificationsSlice'


import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
  modalConfirm: modalConfirmReducer,
  notifications: notificationsReducer,
})

const store = configureStore({
  reducer,
  devTools: import.meta.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export const modalConfirmState = (state: RootState) => state.modalConfirm
export const notificationsState = (state: RootState) => state.notifications

export type AppDispatch = typeof store.dispatch

export default store
