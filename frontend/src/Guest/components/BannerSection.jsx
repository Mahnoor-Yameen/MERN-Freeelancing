import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from "./../../images/BannerImages/img1.jpg"
import img2 from "./../../images/BannerImages/img2.jpg"

import { Link } from 'react-router-dom';
export default function BannerSection() {
  return (
    <>
      <div style={{ backgroundColor: "#ffecf1" }}>
        <Carousel data-bs-theme="dark" className='container pt-1'>
          {/* second image */}
          <Carousel.Item style={{ borderRadius: "30px", border: "2px solid black" }} className=''>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
              style={{ maxHeight: "450px", objectFit: "cover", borderRadius: "30px", border: "2px solid black" }}
            />
            <Carousel.Caption className='d-flex justify-content-center' style={{ marginBottom: '150px', marginRight: '150px' }}>
              <Link to="/" className='text-decoration-none' >
                <h5 className="text-white text-uppercase ">Welcome To AV Boutique</h5>
                <h1 className="text-white   mb-4">Online Store</h1>
                {/* <a href="" className="btn btn-light ">Tap Here</a> */}
              </Link>
            </Carousel.Caption >
          </Carousel.Item>


          {/* first image */}
          <Carousel.Item style={{ borderRadius: "30px", border: "2px solid black" }} >


            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              style={{ maxHeight: "500px", objectFit: "cover", borderRadius: "30px", border: "2px solid black" }}
            />

          </Carousel.Item>






        </Carousel>
      </div>
      {/* <marquee behavior="ltr" direction="right">New Collection Launching Soon! </marquee> */}





    </>
  )
}
