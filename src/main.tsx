import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import { FlowProvider } from './Context/FlowContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render( 
  <React.StrictMode>
    <FlowProvider>
      <App />
    </FlowProvider>
  </React.StrictMode>,
)
