import React, { useState, useEffect } from 'react'
import AddStitchTypeModal from '../components/AddStitchTypeModal'
import UpdateStitchType from '../components/UpdateStitchType'
import { AppRoute } from '../../App';
import axios from 'axios'


import {GrUpdate} from 'react-icons/gr'
import {MdDelete} from 'react-icons/md'


export default function StitchType() {

// API FETCHING
  const [StitchTypes, setStitchTypes] = useState([])

  useEffect(() => {
    axios.get(`${AppRoute}api/get-all-StitchTypes`)
      .then((json) => setStitchTypes(json.data.StitchTypes))
      .catch((error) => console.log(error))
  }, [])

  // deleting a StitchTypes

  const deleteStitchTypes = (_id) => {
    console.log(_id);
  
    axios.delete(`${AppRoute}api/delete-StitchType`, {
      data: { _id } // Data ko object mein wrap karein
    })
      .then((response) => setStitchTypes(response.data.StitchTypes))
      .catch((error) => console.log(error.message));
  }
  

  // without refresh api field update

  return (

    <div style={{backgroundColor:"#f9e0b7"}}>

    <div className='container'>

      {/*                      HEADING */}
      <div className="d-flex  rounded my-3 p-2 justify-content-between align-items-center">
        <span className='fs-4 fw-bold text-dark'>StitchTypes</span>

        {/* MOdal hai, ispe click se StitchTypes add hojati */}
        <AddStitchTypeModal  recalllData={setStitchTypes}  />



      </div>


      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">StitchTypes Name</th>
            <th scope="col">StitchTypes Price</th>

            <th scope="col">StitchTypes Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            StitchTypes?.map((value, index) =>
              <tr key={index}>
                <th scope="row">{value._id}</th>
                <td>{value.StitchTypeName}</td>
                <td>{value.StitchTypePrice}</td>

                <td >
                  <img src={value.StitchTypeImage} alt=""  style={{height:'5vh', objectFit:'contain' }}/>
                </td>
                <td><UpdateStitchType/>
                <button className='btn btn-success mx-2' onClick={()=>deleteStitchTypes(value._id)}><MdDelete /></button>
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
