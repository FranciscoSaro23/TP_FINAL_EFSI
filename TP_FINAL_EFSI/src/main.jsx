import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PresupuestoProvider } from './context/PresupuestoContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PresupuestoProvider>
      <App />
    </PresupuestoProvider>
  </React.StrictMode>,
)
