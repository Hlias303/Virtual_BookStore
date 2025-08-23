import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ContextProvider} from './Context/ContextProvider.jsx'
//import '../src/Styles/HomePage.css'

createRoot(document.getElementById('root')).render(
    
  <ContextProvider>
    <App />
  </ContextProvider>
    
)
