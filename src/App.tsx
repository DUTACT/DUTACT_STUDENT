import { useLocation } from 'react-router-dom'
import useRouteElements from './routes/useRouteElements'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RequestInterceptor from './config/RequestInterceptor'
import ResponseInterceptor from './config/ResponseInterceptor'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalConfirm from './components/ModalConfirm'
import { connectWebSocket, disconnectWebSocket } from './services/websocket.ts'
import { addNotification } from './redux/slices/notificationsSlice.ts'
import { CONFIG } from './constants/config.ts'
import store from './redux/store.ts'
import { useAppContext } from './contexts/app.context.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 0
    }
  }
})

export default function App() {
  const routeElements = useRouteElements()
  const { pathname } = useLocation()
  const { isAuthenticated } = useAppContext()

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
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
    <QueryClientProvider client={queryClient}>
      <RequestInterceptor />
      <ResponseInterceptor />
      {routeElements}
      <ModalConfirm />
      <ToastContainer />
    </QueryClientProvider>
  )
}
