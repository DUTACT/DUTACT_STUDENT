import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/app.context.tsx'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import { connectWebSocket } from './services/websocket.ts'
import { addNotification } from './redux/slices/notificationsSlice.ts'
import { CONFIG } from './constants/config.ts'

connectWebSocket(CONFIG.WEBSOCKET_URL, (data) => {
  store.dispatch(addNotification(data))
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
