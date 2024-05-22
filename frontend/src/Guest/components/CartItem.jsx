import React, { useEffect, useState } from 'react'
import { CartContextVariable } from '../../GlobalContext/CartContext';   //likhna baki
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from 'react';

export default function CartItem({ data }) {
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


  const DeleteOne = () => {
    // Dispatch action to decrease quantity for matching product
    cart_dispatch({ type: 'DELETE_PRODUCT', ProductID: data._id });
  };



  return (
    <>

      <div className='card mb-3 shadow-sm' style={{ backgroundColor: "#ffecf1" }}>
      <div className="row g-0">
                  {/* {console.log("array val hua va", data)} */}


                  <div className="col-md-4 col-sm-4 col-4 d-flex align-items-center">

                    <img
                      src={data?.ProductThumbnail || data?.StitchTypeImage}
                      alt="..."
                      style={{
                        height: '20vh',
                        objectFit: 'contain'
                      }}
                      className='img-fluid rounded-start bg-dark'
                    />
                  </div>



                  <div className="col-md-8 col-sm-8 col-8 ">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-1">
{data?.ProductName && (

                        <h6 className="card-title">{data?.ProductName?.length > 20 ? data?.ProductName?.slice(0, 25) + '...' : data?.ProductName }</h6>
)}

{data?.StitchTypeName && (

<h6 className="card-title">{data?.StitchTypeName?.length > 20 ? data?.StitchTypeName?.slice(0, 25) + '...' : data?.StitchTypeName }</h6>
)}

                      </div>

                      {data?.ProductQuantity && (
  <div className='d-flex align-items-center justify-content-between'>
  <span className="badge bg-secondary p-2" style={{ fontSize: "13px" }}>Price:  &#163;{data?.ProductPrice || data?.StitchTypePrice}</span>
  <FaRegTrashAlt className='mx-3' style={{ cursor: "pointer" }} onClick={() => DeleteOne()} />
</div>

)}                  
{data?.StitchTypePrice && (
  <div className='d-flex align-items-center justify-content-between'>
  <span className="badge bg-secondary p-2" style={{ fontSize: "13px" }}>Price:  &#163;{data?.StitchTypePrice || data?.StitchTypePrice}</span>
  {/* <FaRegTrashAlt className='mx-3' style={{ cursor: "pointer" }} onClick={() => DeleteOne()} /> */}
</div>

)}          
                    

{data?.ProductQuantity && (
  <p className='mt-1'>Product Quantity: {data.ProductQuantity}</p>

)}


                      <p className='mt-2'> Total Price: {data?.ProductQuantity * data?.ProductPrice  || data?.StitchTypePrice}</p>


                      {/* Quantity Manager */}
                      {data?.ProductQuantity && (
                         <div className='d-flex justify-content-center my-2 align-items-center '>
                        <button disabled={data.ProductQuantity > 1 ? false : true} className="btn btn-dark border " onClick={() => decreaseQuantity(data._id)}>-</button>
                        <span className='mx-3'>{data.ProductQuantity}</span>
                        <button className=" btn btn-dark border  mx-3" onClick={() => increaseQuantity()}>+</button>
                      </div>
                      )}

                     




                    </div>
                  </div>


                </div>


      </div>

    </>
  )
}
