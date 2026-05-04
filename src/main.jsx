import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AdminDashboard from './AdminDashboard.jsx'
import Passwordreset from './Passwordreset.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Passwordreset />
    </div>
  </StrictMode>,
)
