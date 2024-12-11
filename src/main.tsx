import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/app.context.tsx'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { WebSocketProvider } from './contexts/websocket.context.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 0
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <WebSocketProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </WebSocketProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
)
