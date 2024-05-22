import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import SearchedProducts from "./pages/SearchedProducts"
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Navigationbar from './components/Navigationbar'
import OrderFinal from './pages/OrderFinal'

import StitchType from './pages/StitchType'
import Products from './pages/Products'
import SingleProductDynamic from './pages/SingleProductDynamic'
import SingleBrandDynamic from './pages/SingleBrandDynamic'
import Categories from './pages/Categories'
import SingleCategoryDynamic from './pages/SingleCategoryDynamic'
import Profile from "./../User/pages/Profile"
import Checkout from "./pages/Checkout"
import NavLine from './components/NavLine'
import StitchBook from './pages/StitchBook'



export default function Guest() {
  
return (
<>

<Navigationbar/>
<NavLine/>
<Routes>
     <Route path="/" element={<Home />} />
     <Route path="/home" element={<Home />} />

     <Route path="/login" element={<LoginPage />} />
     <Route path="/register" element={<Register />} />
     <Route path="*" element={<Navigate to="/" replace={true} />} />

     
     <Route path="/products" element={<Products />} />
     <Route path="/get-product-by-id/:_id" element={<SingleProductDynamic />} />

     <Route path="/StitchTypes" element={<StitchType />} />
     <Route path="/StitchTypes/:StitchTypeName" element={<StitchBook />} />
     <Route path="/:Search" element={<SearchedProducts />} />

     <Route path="/categories" element={<Categories />} />
     <Route path="/category/:CategoryName" element={<SingleCategoryDynamic />} />






     <Route path="/profile" element={<Profile />} />
     
     <Route path="/Checkout" element={<Checkout />} />
     
     <Route path="/orderplacement" element={<OrderFinal />} />


</Routes>
</>
  )
}
