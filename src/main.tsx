import './styles/fonts.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/missionUI.css'
import App from './App'
import { A11yProvider } from './contexts/A11yContext'
import './styles/safeMode.module.css'
import { restoreAccessOnEntry } from './lib/ending'

restoreAccessOnEntry()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <A11yProvider><App /></A11yProvider>
  </StrictMode>,
)
