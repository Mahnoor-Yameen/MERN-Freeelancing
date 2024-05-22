import React, { useState, useEffect } from 'react'
import AddProductModal from '../components/AddProductModal'
import axios from 'axios'
import UpdateProductModal from '../components/UpdateProductModal'
import { AppRoute } from '../../App';

import {MdDelete} from 'react-icons/md'

export default function Products() {

// API FETCHING
  const [Product, setProduct] = useState([])


  // data mungwa rahy
  useEffect(() => {
    axios.get(`${AppRoute}api/get-all-product`)
      .then((json) => setProduct(json.data.Products))
      .catch((error) => console.log(error))
  }, [])


  // deleting by a specific id 
  const deleteProduct = (_id) => {
    console.log(_id);
  
    axios.delete(`${AppRoute}api/delete-product`, {
      data: { _id } // Data ko object mein wrap karein
    })
      .then((response) => setProduct(response.data.Products))
      .catch((error) => console.log(error.message));
  }

  //updating Product


  // without refresh api field update

  return (
    <div style={{backgroundColor:"#f9e0b7"}}>

    <div className='container'>

      {/*                      HEADING */}
      <div className="d-flex rounded my-3 p-2 justify-content-between align-items-center">
        <span className='fs-4 fw-bold '>Products</span>

        {/* MOdal hai, ispe click se category add hojati */}
        <AddProductModal  recallProductData={setProduct}  />



      </div>


      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col"> ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Description</th>
            <th scope="col">Product Price</th>
            {/* <th scope="col">Product Brand</th> */}
            <th scope="col">Product Category</th>
            <th scope="col">Product Thumbnail</th>
            {/* <th scope="col" className='text-center' colSpan={5}>Product Image Array</th> */}
            <th scope="col">Action</th>

          </tr>
        </thead>
        <tbody>
           {
            Product?.map((value, index) =>
              <tr key={index}>
                <th scope="row">{value._id}</th>
                <td>{value.ProductName}</td>
                <td>{value.ProductDescription}</td>
                <td>{value.ProductPrice}</td>
                {/* <td>{value.ProductBrand}</td> */}
                <td>{value.ProductCategory}</td>
                <td>
                  <img src={value.ProductThumbnail} alt=""  style={{height:'5vh', objectFit:'contain' }}/>
                </td>
                {/* {value.ProductImageArray?.map((v,i)=>
                <td key={i}>
                <img src={v} alt=""  style={{height:'5vh', objectFit:'contain' }}/>
              </td>)
                }
                <td> */}
                  {/* <img src={value.ProductThumbnail} alt=""  style={{height:'5vh', objectFit:'contain' }}/>
                </td> */}
                
                <td><UpdateProductModal/>
                <button className='btn btn-success mx-2 my-2' onClick={()=>deleteProduct(value._id)}><MdDelete /></button>
                </td>
                
              </tr>

            )
          } 

        </tbody>
      </table>



    </div>
    </div>

  )
}
