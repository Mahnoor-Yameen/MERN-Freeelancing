import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AppRoute } from '../../App';

import {MdDelete} from 'react-icons/md'
import { Link } from 'react-router-dom';


export default function Orders() {
  
// API FETCHING
const [Orders, setOrders] = useState([])


// data mungwa rahy
useEffect(() => {
  axios.get(`${AppRoute}api/get-all-orders`)
    .then((json) => setOrders(json.data.orders))
    .catch((error) => console.log(error))
}, [])

console.log(Orders)

// deleting by a specific id 
const deleteProduct = (_id) => {
  console.log(_id);

  axios.delete(`${AppRoute}api/delete-product`, {
    data: { _id } // Data ko object mein wrap karein
  })
    .then((response) => setOrders(response.data.Products))
    .catch((error) => console.log(error.message));
}

//updating Product


// without refresh api field update

return (
  <>
  <div style={{backgroundColor:"#f9e0b7"}}>

  <div className='container'>

    {/*                      HEADING */}
    <div className="d-flex rounded my-3 p-2 justify-content-between align-items-center">
      <span className='fs-4 fw-bold '>Products</span>

      {/* MOdal hai, ispe click se category add hojati */}
      {/* <AddProductModal  recallProductData={setOrders}  /> */}



    </div>


    {/* Table */}
    <table className="table">
      <thead>
        <tr>
          <th scope="col"> ID</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Orders Date</th>
          <th scope="col">Orders Items</th>
          <th scope="col"> Delivery Mode</th>
          <th scope="col">Payment Mode</th>
          <th scope="col">Total Bill</th>
          <th scope="col">Action</th>

        </tr>
      </thead>
      <tbody>
         {
          Orders?.map((value, index) =>
            
              
            <tr key={index}>
              <th scope="row">{value._id}</th>
              <td>{value.customerName}</td>
              <td>{new Date(value.order_at).toLocaleDateString('en-GB')}</td>
              <td>{value.items.length}</td>
              <td>{value.DeliveryMode}</td>
              <td>{value.paymode}</td>
              <td>
               {value.totalBill}
              </td>
              <td>
                {/* to={`/userorders/${value._id}`} */}
              <Link to={`/orders/${value._id}`} className='text-decoration-none'>
               Details
               </Link>
              </td>
              
              {/* <td> */}
              {/* <button className='btn btn-success mx-2 my-2' onClick={()=>deleteProduct(value._id)}><MdDelete /></button> */}
              {/* </td> */}
              
            </tr>

            
          )
        } 

      </tbody>
    </table>



  </div>
  </div>
  </>
)
}
