import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { AppRoute } from '../../App'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import '../../App.css'
import './../pages/StitchType.css'




import AOS from 'aos';
import 'aos/dist/aos.css'
export default function CategoryHome() {
const [category,setcategory]=useState([])

useEffect(() => {
    AOS.init({
      offset: 300,
      duration: 500
    });
  
  },[])

// hitting api and applying useEffect, so that whenever component refresh we will get our updated category
useEffect(()=>{
    axios.get(`${AppRoute}api/get-all-categories`)
    .then((json)=>setcategory(json.data.Categories))
    .catch((error)=>console.log(error))
 },[])


    return (
        <>

            {/* ek container */}
            <section className='py-5' style={{backgroundColor:"#ffecf1"}} >

            <div className="container">
                <div className="text-center my-5">
                    <h3 className='font-weight-bold'>Our Collection</h3>
<hr />
                </div>

      <div className="container py-2">

                <div className="row">
                 {
                     category.map((value,index)=>
                     <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2" data-aos="fade-up" data-aos-duration="1000" key={index}>
                <Link to={`/category/${value.CategoryName}`} className='text-decoration-none'>
                <div className="card position-relative" >
                    <img src={value.CategoryImage} className='object-fit-contain border rounded img-fluid' style={{ height: "300px" }} alt="..." />
                    <div className="card-body">
                        <p className="card-text">
                            {value.CategoryName}
                        </p>
                    </div>
                    <div className="overlay">
                <button className="btn btn-primary">Explore</button>
              </div>
                </div>
                </Link>
            </div>
                     )
                    } 
                </div>

            </div>

            </div>
                    </section>

        </>
    )
}
