import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/app.context.tsx'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { WebSocketProvider } from './contexts/websocket.context.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProvider>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </SnackbarProvider>
      </AppProvider>
    </Provider>
  </BrowserRouter>
)
