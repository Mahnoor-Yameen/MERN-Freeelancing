import React, { useState, useEffect } from 'react'
import AddCategoryModal from '../components/AddCategoryModal'
import UpdateCategory from "../components/UpdateCategory"
import axios from 'axios'

import { AppRoute } from '../../App';

import {GrUpdate} from 'react-icons/gr'
import {MdDelete} from 'react-icons/md'


export default function Category() {

// API FETCHING
  const [Category, setCatgeory] = useState([])

  useEffect(() => {
    axios.get(`${AppRoute}api/get-all-categories`)
      .then((getAllCategories) => setCatgeory(getAllCategories.data.Categories))
      .catch((error) => console.log(error))
  }, [])

  // deleting a category

  const deleteCategory = (CategoryName) => {
    console.log(CategoryName);
  
    axios.delete(`${AppRoute}api/delete-category`, {
      data: { CategoryName } // Data ko object mein wrap karein
    })
      .then((response) => setCatgeory(response.data.Categories))
      .catch((error) => console.log(error.message));
  }
  

  // without refresh api field update

  return (
    <div style={{backgroundColor:"#f9e0b7"}}>

    <div className='container'>

      {/*                      HEADING */}
      <div className="d-flex  rounded my-3 p-2 justify-content-between align-items-center">
        <span className='fs-4 fw-bold '>Categories</span>

        {/* MOdal hai, ispe click se category add hojati */}
        <AddCategoryModal  recallData={setCatgeory}  />



      </div>


      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category Name</th>
            <th scope="col">Category Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            Category?.map((value, index) =>
              <tr key={index}>
                <th scope="row">{value._id}</th>
                <td>{value.CategoryName}</td>
                <td >
                  <img src={value.CategoryImage} alt=""  style={{height:'5vh', objectFit:'contain' }}/>
                </td>
                <td><UpdateCategory/>
                <button className='btn btn-success mx-2' onClick={()=>deleteCategory(value.CategoryName)}><MdDelete /></button>
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
