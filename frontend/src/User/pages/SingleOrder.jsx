import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { AccountContextVariable } from '../../GlobalContext/AccountContext'
import axios from 'axios'
import { AppRoute } from '../../App'


export default function SingleOrder() {
    const { account_state, account_dispatch } = useContext(AccountContextVariable)
    const { _id } = useParams();
    const [Order, setOrder] = useState({});
    const [DeliveryFee, setDeliveryFee] = useState(0)
    const [AmountWithoutDelivery, setAmountWithoutDelivery] = useState(0)
    const [ShippingOpen, setShippingOpen] = useState(false);

    const [ServiceDetailOpen, setServiceDetailOpen] = useState(false);

    // const [CardOpen, setCardOpen] = useState(false);

    // api fetching
    useEffect(() => {
        axios.get(`${AppRoute}api/track-order-by-id?_id=${_id}`)
            .then(json => setOrder(json.data.order))
            .catch(err => console.log(err))
    }, [_id])


    console.log("dabba", Order)







    useEffect(() => {
        if (Order.items) {
            const total = Order.items.reduce((accumulator, product) => accumulator + ((product.ProductPrice || product.StitchTypePrice) * (product?.ProductQuantity || 1)), 0)
            setAmountWithoutDelivery(total);
        }

    }, [Order]);

    useEffect(() => {
        if (Order.DeliveryMode === 'pickup') {
            setDeliveryFee(0)
        }
        else {
            setDeliveryFee(250)
        }
    }, [Order])




    return (
        <>   <div>
            <section className="h-100 " style={{ backgroundColor: "#ffecf1" }}>
                <h2 className='text-center pt-5'>Order Details</h2>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-8">
                            <div className="card" style={{ borderRadius: 10 }}>
                                <div className="card-header px-4 py-5">
                                    <h5 className="text-muted mb-0">
                                        Order ID:{" "}
                                        <span style={{ color: "#a8729a" }}>{_id}</span>
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                                            Receipt
                                        </p>
                                    </div>



                                    {/* one card */}
                                    {Order?.items?.map((value, index) => (
                                        <div className="card shadow-0 border mb-4" key={index}>
                                            <div className="card-body" >
                                                <div className="row">
                                                    <div className="col-md-2 d-flex align-items-center justify-content-center">

                                                        <img
                                                            src={(value.ProductThumbnail) || (value.StitchTypeImage)}
                                                            className="img-fluid"
                                                            style={{
                                                                height: '10vh',
                                                                objectFit: 'contain'
                                                            }}
                                                            alt="Phone"
                                                        />

                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0">{(value.ProductName) || (value.StitchTypeName)}</p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Price:  Rs {(value.ProductPrice) || (value.StitchTypePrice)}</p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Qty: {(value.ProductQuantity) || (1)}</p>
                                                    </div>
                                                    <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Subtotal Price: Rs {(value.ProductPrice * value.ProductQuantity) || (value.StitchTypePrice)} </p>
                                                    </div>

                                                </div>
                                                <hr
                                                    className="mb-4"
                                                    style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                                                />

                                                {value.type === 'product' && (
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-md-2">
                                                            <p className="text-muted mb-0 small">Description: </p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="d-flex justify-content-around mb-1">
                                                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                                    {value?.ProductDescription}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {value.type === 'booking' && (
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-md-4">
                                                            <Button
                                                                onClick={() => setServiceDetailOpen(!ServiceDetailOpen)}
                                                                aria-controls="example-collapse-text-ServiceDetailOpen"
                                                                aria-expanded={ServiceDetailOpen}
                                                                className='btn btn-dark w-100'
                                                            >
                                                                Booking Details
                                                            </Button>

                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className=" mb-1">
                                                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                                    <Collapse in={ServiceDetailOpen}>
                                                                        <div id="example-collapse-text-ServiceDetailOpen">
                                                                            <div>
                                                                                <p>Gender: {value?.Gender || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>Length: {(value?.Length) || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>SleeveLength: {value?.SleeveLength || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>HipSize: {value?.HipSize || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>WaistSize: {value?.WaistSize || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>FootHole: {value?.FootHole || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>ExtraDetail: {value?.ExtraDetail || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>ArmHole: {value?.ArmHole || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>Shoulder: {value?.Shoulder || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p>ChestSize: {value?.ChestSize || ("Not Mentioned by You")}</p>
                                                                            </div>
                                                                            {/* <div>
                                                                                <span>Your Given Designs: </span>
                                                                                {
                                                                                    value?.DesignImageArray?.map((val, key) =>
                                                                                        <div key={key} className="bg-light border rounded col-md-1"
                                                                                            >
                                                                                            <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}

                                                                                                className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                                                                        </div>)
                                                                                } */}
                                                                            {/* </div> */}

                                                                        </div>
                                                                    </Collapse>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>


                                        </div>
                                    ))}


                                    {/* -----------------------------------------------last part with shipping details */}

                                    <div className='row d-flex justify-content-between'>
                                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 mt-4'>
                                            <p className="fw-bold mb-0 mt-2">Order Details</p>
                                            <p className="text-muted mb-0 mt-2">Order Placement Date  : {new Date(Order.order_at).toLocaleDateString('en-GB')}</p>
                                            <p className="text-muted mb-0 mt-2">Payment Mode : {Order.paymode}</p>
                                            <p className="text-muted mb-0 mt-2">Customer Email : {Order.customerEmail}</p>


                                        </div>
                                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 mt-4'>
                                            <p className="text-muted mb-0 mt-2">
                                                <span className="fw-bold me-4 ">Sub Total</span>Rs {AmountWithoutDelivery}
                                            </p>
                                            <p className="text-muted mb-0 mt-2">
                                                <span className="fw-bold me-4">Delivery: </span>{Order.DeliveryMode}
                                            </p>
                                            <p className="text-muted mb-0 mt-2">
                                                <span className="fw-bold me-4">Delivery Charges</span> Rs {DeliveryFee}
                                            </p>
                                            <p className="text-muted mb-0 mt-2">
                                                <span className="fw-bold me-4">Total Bill</span> Rs {AmountWithoutDelivery + DeliveryFee}
                                            </p>
                                        </div>
                                    </div>






                                </div>

                                {Order.DeliveryMode == 'shipping' &&
                                    <div className="d-flex mb-2">
                                        {/* Shipping address */}

                                        <div className="d-flex justify-content-between mx-2 pt-2">
                                            <p className="text-muted mb-0">

                                                <Button
                                                    onClick={() => setShippingOpen(!ShippingOpen)}
                                                    aria-controls="example-collapse-text-Shipping"
                                                    aria-expanded={ShippingOpen}
                                                    className='btn btn-light'
                                                >
                                                    Shipping Details
                                                </Button>

                                                <Collapse in={ShippingOpen}>
                                                    <div id="example-collapse-text-Shipping">
                                                        <div>
                                                            <p>Country: {Order.Country}</p>
                                                        </div>
                                                        <div>
                                                            <p>Address: {Order.Address}</p>
                                                        </div>
                                                        <div>
                                                            <p>City: {Order.City}</p>
                                                        </div>
                                                        <div>
                                                            <p>Phone No: {Order.Phone}</p>
                                                        </div>
                                                    </div>
                                                </Collapse>

                                            </p>
                                        </div>



                                        {/* Creadit card details */}
                                        {/* {Order.paymode === "creditcard" && login_state.token === 'admin' && (
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">
                                                <Button
                                                    onClick={() => setCardOpen(!CardOpen)}
                                                    aria-controls="example-collapse-text-Card"
                                                    aria-expanded={CardOpen}
                                                    className='btn btn-light'
                                                >
                                                    Card Details
                                                </Button>

                                                <Collapse in={CardOpen}>
                                                    <div id="example-collapse-text-Card">
                                                        <div>
                                                            <p>Name on Card: {Order.NameOnCard}</p>
                                                        </div>
                                                        <div>
                                                            <p>Card Expiry Date: {Order.CardExpiryDate}</p>
                                                        </div>
                                                        <div>
                                                            <p>Card Number: {Order.CardNumber}</p>
                                                        </div>

                                                        <div>
                                                            <p>Security Code: {Order.SecurityCode}</p>
                                                        </div>

                                                    </div>
                                                </Collapse>
                                            </p>
                                        </div>
                                    )} */}

                                    </div>
                                }
                                {/* paymode -- paypal, creditcard    */}

                                <div
                                    className="card-footer border-0 px-4 py-5"
                                    style={{
                                        backgroundColor: "#a8729a",
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10
                                    }}
                                >
                                    <h5 className="d-flex align-items-center justify-content-center text-white text-uppercase mb-0">
                                         <span className="h2 mb-0 ms-2">Total : Rs. {AmountWithoutDelivery + DeliveryFee} </span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div></>
    )
}
