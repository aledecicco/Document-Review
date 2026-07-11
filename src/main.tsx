import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/app'
import { ApiProvider } from '@/providers/api'
import { RouteProvider } from '@/providers/route'
import { ThemeProvider } from '@/providers/theme'

import '@/styles/globals.css'
import { RPConfig } from '@react-pdf-kit/viewer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteProvider>
        <ApiProvider>
          <ThemeProvider defaultTheme="light">
            <RPConfig>
              <App />
            </RPConfig>
          </ThemeProvider>
        </ApiProvider>
      </RouteProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
