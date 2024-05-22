import React, { useContext, useState } from 'react'
import { CartContextVariable } from '../../GlobalContext/CartContext';   //likhna baki
import { AccountContextVariable } from '../../GlobalContext/AccountContext'
import { decodeToken } from 'react-jwt';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { AppRoute } from '../../App'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import CheckoutQuantity from '../components/CheckoutQuantity';
import { FaRegTrashAlt } from "react-icons/fa";

import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


export default function Checkout() {


  const { cart_state, cart_dispatch } = useContext(CartContextVariable)
  const { account_state, account_dispatch } = useContext(AccountContextVariable)


  //   console.log(state)             token araha
  const user = decodeToken(account_state.token)

  const total = cart_state.cart.reduce((accumulator, product) => accumulator + ((product.ProductPrice || product.StitchTypePrice) * (product?.ProductQuantity || 1)), 0)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [TrackingId, setTrackingId] = useState("")

  const [customerAddress, setcustomerAddress] = useState("")
  const [customerContact, setcustomerContact] = useState("")


  const OrderDetailSubmission = (e) => {
    e.preventDefault();


    const payload = {
      customerName: user.Username,
      customerEmail: user.Email,
      customerAddress: customerAddress,
      customerContact: customerContact,
      customerId: user._id,
      items: cart_state.cart,
      totalBill: total,
    }
    console.log(payload)

    axios.post(`${AppRoute}api/place-order`, payload)
      .then((json) => {
        setTrackingId(json.data.TrackingId)


        Swal.fire({
          title: 'Thank you for placing order',
          text: `Your Order Tracking id is: ${TrackingId}`,
          icon: 'success',
          confirmButtonText: 'Continue Shopping'
        })
      }


      )
      .catch((error) => console.log(error))



  }

  const DeleteOne = (_id) => {
    // Dispatch action to decrease quantity for matching product
    cart_dispatch({ type: 'DELETE_PRODUCT', ProductID: _id });
  };

  return (
    <>
      <div style={{ backgroundColor: "#ffecf1" }}>

        <div className="container">
          <h1 className="text-center py-5">Your Cart</h1>
        </div>
        {/* table for products */}


        <div className="container my-3">
        <h3 className="text-center py-2">Products:</h3>
         

          <div className='container'>

            {
              cart_state.cart?.map((value, index) =>
                <div key={index} className='row bg-white '>

                  <div className="d-flex justify-content-center mt-2 col-12 col-xs-12 col-sm-3 col-md-3 col-lg-3">
                    {value?.ProductName && (
                      <div  ><img src={value.ProductThumbnail} alt="" className="m-1 " style={{ height: '10vh', objectFit: 'contain' }} />{value.ProductName}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2 col-12 col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    {value?.ProductName && (

                      <div >Rs. {value.ProductPrice}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2 col-12 col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    {value?.ProductName && (
                      <div >Sub Total: {value.ProductQuantity * value.ProductPrice}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2 col-12 col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    {value?.ProductName && (
                      <div className='d-flex justify-content-center align-items-center'><span>Delete: </span> <FaRegTrashAlt className='mx-3' style={{ cursor: "pointer" }} onClick={() => DeleteOne(value._id)} />
                      </div>
                    )}
                  </div>
                   <div className="d-flex justify-content-center align-items-center mt-2  col-12 col-xs-12 col-sm-3 col-md-3 col-lg-3">
                    {value?.ProductName && (
                      <div  >
                        <CheckoutQuantity data={value} />
                      </div>
                    )}
                  </div>
                  <hr className='mt-2' />









                </div>

              )
            }

          </div>



        </div>



        {/* table for Bookings */}
        <div className="container my-3">
        <h3 className="text-center py-2">Stitching Bookings:</h3>
            {
              cart_state.cart?.map((value, index) =>
                <div key={index} className='row bg-white '>

                  <div className="d-flex justify-content-center mt-2 col-12 col-xs-12 col-sm-3 col-md-3 col-lg-3">
                    {value?.StitchTypeName && (
                      <div  ><img src={value.StitchTypeImage} alt="" className="m-1 " style={{ height: '10vh', objectFit: 'contain' }} />{value.StitchTypeName}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2 col-12 col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    {value?.StitchTypeName && (

                      <div >Rs. {value.StitchTypePrice}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2 col-12 col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    {value?.StitchTypeName && (
                      <div >Sub Total: {value.StitchTypePrice}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2 col-12 col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    {value?.StitchTypeName && (
                      <div className='d-flex justify-content-center align-items-center'><span>Delete: </span> <FaRegTrashAlt className='mx-3' style={{ cursor: "pointer" }} onClick={() => DeleteOne(value._id)} />
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-2 col-12 col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    {value?.StitchTypeName && (
                      <div >Gender: {value.Gender}</div>
                    )}
                  </div>
                  
                </div>

              )
            }
        </div>
        











        {/* price and order detail taking  */}

        <h3 className='text-center' style={{ fontWeight: "bold" }}>Total Price: {total}</h3>
        <div className="container d-flex justify-content-center py-3">
          <Link to='/orderplacement' className='text-decoration-none'>

            <Button variant="btn btn-dark " className='mx-5  ' onClick={handleShow}>
              Proceed to Fill details to order
            </Button>
          </Link>






        </div>
      </div>





    </>
  )
}
