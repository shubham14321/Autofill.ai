import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// BrowserRouter ko import karne wali line ko badlein
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> ko <HashRouter> se badal dein */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
