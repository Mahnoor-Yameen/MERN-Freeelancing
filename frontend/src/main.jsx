import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AccountContextProvider from './GlobalContext/AccountContext.jsx'
import CartContextProvider from './GlobalContext/CartContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
    <AccountContextProvider>
<CartContextProvider>
    <App />
</CartContextProvider>
  </AccountContextProvider>
    </BrowserRouter>
  </React.StrictMode>,


)
