import React from 'react'
import Sidebar from './components/Sidebar'
import Category from './pages/Category'
import Products from './pages/Products'
import StitchType from './pages/StitchType'
import Orders from './pages/Orders'
import SingleOrder from './pages/SingleOrder'
import OrderFinal from '../Guest/pages/OrderFinal'


import { Routes, Route } from 'react-router-dom'


export default function Admin() {
  return (
  
    <div className="row" style={{backgroundColor:"#f9e0b7"}}>
      <div className="col-md-3 m-0 p-0 border border-secondary" style={{ height: '100vh' }}><Sidebar /></div>
      <div className="col-md-9">

        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/home" element={<Category />} />
          <Route path="/login" element={<Category />} />



          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/StitchTypes" element={<StitchType/>} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:_id" element={<SingleOrder />} />
{/* /userorders/:_id */}


          <Route path="*" element={<Category />} />
     <Route path="/orderplacement" element={<OrderFinal />} />

        </Routes>
      </div>
    </div>


    
  )
}
