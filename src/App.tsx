import { useLocation } from 'react-router-dom'
import useRouteElements from './routes/useRouteElements'
import { useEffect } from 'react'
import RequestInterceptor from './config/RequestInterceptor'
import ResponseInterceptor from './config/ResponseInterceptor'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalConfirm from './components/ModalConfirm'
import { addNotification } from './redux/slices/notificationsSlice.ts'
import { CONFIG } from './constants/config.ts'
import store from './redux/store.ts'
import { useAppContext } from './contexts/app.context.tsx'
import { useWebSocketContext } from './contexts/websocket.context.tsx'

export default function App() {
  const routeElements = useRouteElements()
  const { pathname } = useLocation()
  const { isAuthenticated } = useAppContext()

  const { connectWebSocket, disconnectWebSocket } = useWebSocketContext()
  useEffect(() => {
    if (isAuthenticated) {
      connectWebSocket(CONFIG.WEBSOCKET_URL, (data) => {
        store.dispatch(addNotification(data))
      })
    }

    return () => {
      disconnectWebSocket()
    }
  }, [isAuthenticated])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <>
      <RequestInterceptor />
      <ResponseInterceptor />
      {routeElements}
      <ModalConfirm />
      <ToastContainer />
    </>
  )
}
