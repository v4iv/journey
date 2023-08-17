import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/globals.css'
import App from './app'
import './i18n/config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
