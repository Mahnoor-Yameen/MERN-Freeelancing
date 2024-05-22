import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../App'
import './StitchType.css'
import AOS from 'aos';
import 'aos/dist/aos.css'
export default function Categories() {
  useEffect(() => {
    AOS.init({
      offset: 300,
      duration: 500
    });
  
  },[])
  const [Category, setCategory] = useState([])

  useEffect(() => {
    axios.get(`${AppRoute}api/get-all-Categories`)
      .then((res) => setCategory(res.data.Categories))
      .catch((error) => { console.log(error.message) })
  }, [])

  return (
    <>
      <div style={{ backgroundColor: "#ffecf1" }}>

      <h1 className='text-center'>Category </h1>
    


      <div className="container py-2">

<div className="row">
 {
     Category.map((value,index)=>
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




    </>
  )
}
