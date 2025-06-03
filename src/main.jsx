import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css';
import { ConfigProvider } from "antd";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ConfigProvider>
        <App />
      </ConfigProvider>
    </BrowserRouter>

  </StrictMode>,
)
