// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './RootComp.jsx'
import './services/i18.js'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  /* </StrictMode>, */
)
