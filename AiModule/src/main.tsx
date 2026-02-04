import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme accentColor="orange" grayColor="slate" radius="medium">
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>,
)
