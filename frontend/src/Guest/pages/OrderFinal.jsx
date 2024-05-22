import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react'
import { CartContextVariable } from '../../GlobalContext/CartContext';   //likhna baki
import { AccountContextVariable } from '../../GlobalContext/AccountContext'
import { decodeToken } from 'react-jwt';
import { useContext } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Swal from 'sweetalert2'
import axios from 'axios';
import { AppRoute } from '../../App'




export default function OrderFinal() {

  const { cart_state, cart_dispatch } = useContext(CartContextVariable)
  const { account_state, account_dispatch } = useContext(AccountContextVariable)

  const [user,setUser] = useState(null)

  useEffect(() => {
    const getDecodeToken = (token) => {
      if (token === 'undefined' || token === 'null') {
      } else {
        // Assuming decodeToken is defined elsewhere
        const userfromdecode = decodeToken(token);
        setUser(userfromdecode)
      }
    };

    getDecodeToken(account_state.token);
  }, [account_state.token]);
  

  const [Deliveryfee, setDeliveryfee] = useState('')
  const [CardNumber, setCardNumber] = useState('')
  const [NameOnCard, setNameOnCard] = useState('')
  const [CardExpiryDate, setCardExpiryDate] = useState('')
  const [SecurityCode, setSecurityCode] = useState('')
  const [Country, setCountry] = useState('')
  const [Address, setAddress] = useState('')
  const [City, setCity] = useState('')
  const [Phone, setPhone] = useState('')
  const [totalPayment, setTotalPayment] = useState(0);
  const [FinalBill, setFinalBill] = useState(0);

  const [TrackingId, setTrackingId] = useState("")
  const [errors, setErrors] = useState({});     //validation k liye normal walidation
  
  // mode for delivey
  const [DeliveryMode, setDeliveryMode] = useState(null);
  const [paymode, setpayMode] = useState(null);


  // we are having two moodes    pickup 0 shipping 3.99
  const handleModeSelect = (selectedMode) => {
    setDeliveryMode(selectedMode); // Update mode based on the selected option
  };
  
  // payment form 
  const handlepayModeSelect = (selectedpayMode) => {
    setpayMode(selectedpayMode); // Update mode based on the selected option
  };

  useEffect(() => {

  const total = cart_state.cart.reduce((accumulator, product) => accumulator + ((product.ProductPrice || product.StitchTypePrice) * (product?.ProductQuantity || 1)), 0)

    setTotalPayment(total)
    setFinalBill(total)

    if (DeliveryMode == 'pickup') {
      setTotalPayment(total)
    setFinalBill(total+0)
      setDeliveryfee('0')
    }
    else {
      setDeliveryfee('250')
    setFinalBill(total+250)


    }

  }, [cart_state, DeliveryMode]);



  const validateForm = () => {
    const errors = {};

    // CREDIT CARD
    if (paymode === 'creditcard' && !CardNumber.trim()) {
      errors.CardNumber = 'Card Number is required';
    }
    if (paymode === 'creditcard' && !NameOnCard.trim()) {
      errors.NameOnCard = 'Name on Card is required';
    }
    if (paymode === 'creditcard' && !CardExpiryDate.trim()) {
      errors.CardExpiryDate = 'Expiry Date is required';
    }
    if (paymode === 'creditcard' && !SecurityCode.trim()) {
      errors.SecurityCode = 'Security Code is required';
    }

    // DELIVERY
    if (DeliveryMode === 'shipping' && !Country.trim()) {
      errors.Country = 'Country is required';
    }
    if (DeliveryMode === 'shipping' && !Address.trim()) {
      errors.Address = 'Address is required';
    }
    if (DeliveryMode === 'shipping' && !City.trim()) {
      errors.City = 'City is required';
    }
    if (DeliveryMode === 'shipping' && !Phone.trim()) {
      errors.Phone = 'Phone is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };



  // FORM SUBMISSION
  const payment = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return;
    }

 


    if (account_state.people === 'user' ) {

      // without working of empty running
      const payload = {
        customerName: user.UserName, 
        customerEmail: user.Email,
        customerId: user._id,
        items: cart_state.cart,
        totalBill: FinalBill,
        DeliveryMode,
        Deliveryfee,
        paymode,
        CardNumber,
        NameOnCard,
        CardExpiryDate,
        SecurityCode,
        Country,
        Address,
        City,
        Phone,
      }
      console.log("naacho", payload)
      for (const key in payload) {
        if (payload.hasOwnProperty(key) && typeof payload[key] === 'string' && payload[key].trim() === "") {
            payload[key] = "empty";
        }
    }
    
    console.log("Sanitized Payload:", payload);


      axios.post(`${AppRoute}api/place-order`, payload)
      .then((json) => {

        console.log("yipeee",json.data)
        setTrackingId(json.data.TrackingId)

        Swal.fire({
          title: 'Your Order Has Been Placed',
          text: `Thank you for placing order`,
          icon: 'success',
          confirmButtonText: 'Continue Shopping'
        })
        .then(() => {
          window.location.href = '/';
        });
      }


      )
      .catch((error) => console.log(error))
    }
    else {
      Swal.fire({
        title: 'ORDER NOT PLACED ',
        text: 'CREATE AN ACCOUNT FIRST',
        icon: 'error',
        confirmButtonText: 'Create Account'
      }).then(() => {
        // Redirect to the sign-up page
        window.location.href = '/register'; // Replace '/signup' with the actual sign-up page route
      });


    }

    


  }


  return (
    <>
      <div style={{ backgroundColor: "#ffecf1" }}>


        <div className="container" >
          <h1 className="text-center pt-5 " style={{ fontFamily: "cursive" }}>Shipping Details</h1>
          <hr />
        </div>


        {/* form */}
        <div className="container d-flex justify-content-center">


          <div className=' col-md-6 col-sm-12 col-lg-4'>
            <form onSubmit={payment} className='p-5 border border-warning' style={{ backgroundColor: "#f9e0b7", borderRadius: "50px" }}>

              {/* Delivery Options collaspe*/}
              <div>
                <h3 style={{ fontWeight: "bold" }} className='text-center my-3'>Delivery Mode:</h3>
                <div>
                  <Button
                    onClick={() => handleModeSelect('shipping')} // Set mode to 'shipping' when Shipping button is clicked
                    className={`w-100 btn btn-outline-warning text-dark ${DeliveryMode === 'shipping' ? 'btn-warning' : 'btn-light'} my-2 p-3`}>
                    Shipping {DeliveryMode === 'shipping' && <span>&#10003;</span>}
                  </Button>
                  <Collapse in={DeliveryMode === 'shipping'}>
                    <div id="shipping-collapse">
                      <div>
                        <input type="text" placeholder='Country/Region' className='my-1 py-2 w-100 rounded' value={Country} onChange={(e) => setCountry(e.target.value)} />
                        {errors.Country && <small className="text-danger">{errors.Country}</small>}


                        <input type="text" placeholder='Address' className='my-1 rounded py-2 w-100' value={Address} onChange={(e) => setAddress(e.target.value)} />
                        {errors.Address && <small className="text-danger">{errors.Address}</small>}


                        <input type="text" placeholder='City' className='my-1 rounded py-2 w-100' value={City} onChange={(e) => setCity(e.target.value)} />
                        {errors.City && <small className="text-danger">{errors.City}</small>}


                        <input type="text" placeholder='Phone' className='my-1 rounded py-2 w-100' value={Phone} onChange={(e) => setPhone(e.target.value)} />
                        {errors.Phone && <small className="text-danger">{errors.Phone}</small>}

                      </div>
                    </div>
                  </Collapse>
                </div>

                <div>
                  <Button
                    onClick={() => handleModeSelect('pickup')} // Set mode to 'pickup' when Pick-Up button is clicked
                    className={`w-100 btn btn-outline-warning text-dark ${DeliveryMode === 'pickup' ? 'btn-warning' : 'btn-light'} my-2 p-3`}>
                    Pick-Up  {DeliveryMode === 'pickup' && <span>&#10003;</span>}
                  </Button>
                  <Collapse in={DeliveryMode === 'pickup'}>
                    <div id="pickup-collapse">
                      <Card className='my-1' style={{ cursor: "pointer" }}>
                        <Card.Body>
                          <Card.Title>Location:</Card.Title>
                          <Card.Text>
                            21 East St. Barkings. Usually ready in 2 to 4 days
                            <p>Fee: Free</p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Collapse></div>
              </div>



              {/* PAYMENT WAY */}
              <div>
                <h2 style={{ fontWeight: "bold" }} className='text-center my-3'>Payment Mode:</h2>
                {/* <p>All Transactions Are secured and encrypted</p> */}
                <Button
                  onClick={() => handlepayModeSelect('creditcard')} // Set mode to 'shipping' when Shipping button is clicked
                  className={`w-100 btn btn-outline-warning text-dark ${paymode === 'creditcard' ? 'btn-warning' : 'btn-light'} my-2 p-3`}>
                  Credit Card {paymode === 'creditcard' && <span>&#10003;</span>}
                </Button>

                {/* yeh wo collapse ha jo credit card option select krny pe show ho raha  */}
                <Collapse in={paymode === 'creditcard'}>
                  {/* is div main credit card form and collapse for billing address ha  */}
                  <div id="creditcard-collapse">
                    <div>

                      <input type="text" placeholder='Card Number' className='my-1 rounded py-2 w-100' value={CardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                      {errors.CardNumber && <small className="text-danger">{errors.CardNumber}</small>}

                      <input type="text" placeholder='Expiry Date (MM/YY)' className='my-1 rounded py-2 w-100' value={CardExpiryDate} onChange={(e) => setCardExpiryDate(e.target.value)} />
                      {errors.CardExpiryDate && <small className="text-danger">{errors.CardExpiryDate}</small>}

                      <input type="text" placeholder='Security Code' className='my-1 rounded py-2 w-100' value={SecurityCode} onChange={(e) => setSecurityCode(e.target.value)} />
                      {errors.SecurityCode && <small className="text-danger">{errors.SecurityCode}</small>}

                      <input type="text" placeholder='Name On Card' className='my-1 rounded py-2 w-100' value={NameOnCard} onChange={(e) => setNameOnCard(e.target.value)} />
                      {errors.NameOnCard && <small className="text-danger">{errors.NameOnCard}</small>}

                    </div>
                  </div>
                </Collapse>   {/* end of collaspe of credit card */}

                <Button
                  onClick={() => handlepayModeSelect('paypal')} // Set mode to 'pickup' when Pick-Up button is clicked
                  className={`w-100 btn btn-outline-warning text-dark ${paymode === 'paypal' ? 'btn-warning ' : 'btn-light '} my-2 p-3`}>
                  Cash On Delivery  {paymode === 'paypal' && <span>&#10003;</span>}
                </Button>
                <Collapse in={paymode === 'paypal'}>
                  <div id="paypal-collapse">
                    <Card className='my-1' style={{ cursor: "pointer" }}>
                      <Card.Body>
                        {/* <button className="text-decoration-none btn btn-secondary  py-3 px-5" >Pay with PayPal</button> */}
                        <p>The Amount will be paid as cash on delivery.</p>

                      </Card.Body>
                    </Card>
                  </div>
                </Collapse>
              </div>

              {/* total payment show krny wala div */}
              <div>
                <hr />
                <h4>Total Bill With Shipping Charges:</h4>
                <div className='d-flex justify-content-between'><span>Subtotal:</span> <span>{totalPayment}</span>  </div>
                <div className='d-flex justify-content-between'><span>Delivery Charges:</span> <span> {Deliveryfee}</span>    </div>
                <hr />
                <div className='d-flex justify-content-between'><span>Total Amount: </span> <span>{FinalBill}</span>   </div>


              </div>




              <button className='text-decorations-none w-100  btn btn-dark p-5 my-3' style={{ fontSize: "18px", fontWeight: "bold" }}>Order</button>
            </form>
          </div>




        </div >

      </div>




    </>
  )
}
