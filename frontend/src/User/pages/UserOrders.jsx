import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../App'
import { AccountContextVariable } from '../../GlobalContext/AccountContext'
import { decodeToken } from 'react-jwt';
import { useContext } from 'react';

export default function UserOrders() {
    // yahan se token decode kr k api se email bhejengy
    const { account_state, account_dispatch } = useContext(AccountContextVariable)


    // yahan product data ayega from api
    const [OrdersByUserEmail, setOrdersByUserEmail] = useState([])
    const user = decodeToken(account_state.token);


    // api fetching
    useEffect(() => {
        axios.get(`${AppRoute}api/order-by-user-email?customerEmail=${user.Email}`)
            .then(json => { setOrdersByUserEmail(json.data.OrderByEmail) })
            .catch(err => console.log(err))
    }, [])

    console.log(OrdersByUserEmail)

    return (
        <>
            <div style={{ backgroundColor: "#ffecf1", minHeight: "100vh" }}>

                <div className="container py-5">
                    <h1 className='text-center'>Track Your Orders </h1>
                </div>
               


                {OrdersByUserEmail.length === 0 ? (
                    <div className='container'>
                        
                        <p className="text-center">You Have No Orders</p>
                    </div>
                ) : ( <div className='container'>
                    {OrdersByUserEmail.map((value, index) => (

                        <div key={index} className="card my-2">
                            <div className="card-header">Tracking Id: {value._id}</div>
                            <div className="card-body">
                                <div> Customer Name: {value.customerName}</div>
                                <div> Total Items: {value.items.length}</div>
                                <div>Order Placement Date: {new Date(value.order_at).toLocaleDateString('en-GB')}</div>
                                <Link className="text-decoration-none d-flex justify-content-center  btn btn-dark border py-2 pe-5 mt-2 " to={`/userorders/${value._id}`} >More Details
                                </Link>

                            </div>



                        </div>
                    ))}

                </div>) }
            </div>



        </>
    )
}
