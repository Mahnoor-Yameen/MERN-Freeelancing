import React, { useEffect, useState } from 'react'
import { CartContextVariable } from '../../GlobalContext/CartContext';   //likhna baki
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from 'react';


export default function CheckoutQuantity({ data }) {

    const { cart_state, cart_dispatch } = useContext(CartContextVariable)
  const [ProductQuantity, setProductQuantity] = useState(data.ProductQuantity)

  const increaseQuantity = () => {

    
  const payload = {
    ...data,
    ProductQuantity: ProductQuantity+1,
    TotalPrice: data.ProductPrice * ProductQuantity
  }

  // Check if the product is already in the cart
  const existingProductIndex = cart_state.cart.findIndex(item => item._id === data._id);

  if (existingProductIndex !== -1) {
    // If the product is already in the cart, update its quantity
    const updatedCart = [...cart_state.cart];
    updatedCart[existingProductIndex].ProductQuantity += 1;
    updatedCart[existingProductIndex].TotalPrice += payload.TotalPrice;
    cart_dispatch({ type: "UPDATE_CART", payload: updatedCart });
  } else {
    // If the product is not in the cart, add it
    cart_dispatch({ type: "ADD_TO_CART", payload });
  }

  }
 

  const decreaseQuantity = () => {

    
    const payload = {
      ...data,
      ProductQuantity: ProductQuantity-1,
      TotalPrice: data.ProductPrice * ProductQuantity
    }
  
    // Check if the product is already in the cart
    const existingProductIndex = cart_state.cart.findIndex(item => item._id === data._id);
  
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cart_state.cart];
      updatedCart[existingProductIndex].ProductQuantity -= 1;
      updatedCart[existingProductIndex].TotalPrice += payload.TotalPrice;
      cart_dispatch({ type: "UPDATE_CART", payload: updatedCart });
    } else {
      // If the product is not in the cart, add it
      cart_dispatch({ type: "ADD_TO_CART", payload });
    }
  
    }


  

  return (
    <>
    
    <div className='d-flex  align-items-center '>
                        <button disabled={data.ProductQuantity > 1 ? false : true} className="btn btn-dark border " onClick={() => decreaseQuantity(data._id)}>-</button>
                        <span className='mx-2'>{data.ProductQuantity}</span>
                        <button className=" btn btn-dark border " onClick={() => increaseQuantity(data._id)}>+</button>
                      </div>
    
    
    </>
  )
}
