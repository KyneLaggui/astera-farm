import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from '@src/components/theme-provider.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
