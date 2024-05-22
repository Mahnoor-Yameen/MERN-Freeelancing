import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AppRoute } from '../../App'
import AOS from 'aos';
import 'aos/dist/aos.css'
import './StitchType.css'

import { Link } from 'react-router-dom'
export default function StitchType() {

  const [StitchType, setStitchTypes] = useState([])

  useEffect(() => {
    axios.get(`${AppRoute}api/get-all-StitchTypes`)
      .then((res) => setStitchTypes(res.data.StitchTypes))
      .catch((error) => { console.log(error.message) })
  }, [])

  useEffect(() => {
    AOS.init({
      offset: 300,
      duration: 500
    });
  
  },[])


  return (
    <>
   <div style={{ backgroundColor: "" }} className='bg-light'>
  <h2 className='text-center py-5'>Stitching Services</h2>
  <div className="container py-2">
    <div className="row">
      {StitchType.map((value, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2 bg-light" style={{ backgroundColor: "" }} data-aos="fade-up" data-aos-duration="1000" key={index}>
          <Link to={`/StitchTypes/${value.StitchTypeName}`} className='text-decoration-none'>
            <div className="card position-relative">
              <img src={value.StitchTypeImage} className='object-fit-contain border rounded img-fluid' style={{ height: "300px" }} alt="..." />
              <div className="card-body">
                <p className="card-text fw-bold text-center">{value.StitchTypeName}</p>
                <p className="card-text fw-bold text-center">Rs.{value.StitchTypePrice}</p>
              </div>
              <div className="overlay">
                <button className="btn btn-primary">Book Now</button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>





    </>
  )
}
