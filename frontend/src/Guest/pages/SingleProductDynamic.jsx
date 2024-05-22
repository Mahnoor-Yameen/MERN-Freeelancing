import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import Swal from 'sweetalert2'
import ImageSection from '../components/ImageSection'
import { CartContextVariable } from '../../GlobalContext/CartContext';   //likhna baki
import { AccountContextVariable } from './../../GlobalContext/AccountContext';   //likhna baki
import { decodeToken } from 'react-jwt'


import { AppRoute } from '../../App'



export default function SingleProductDynamic() {

  // for page detail
  const { _id } = useParams();

  const { cart_state, cart_dispatch } = useContext(CartContextVariable)
  const { account_state, account_dispatch } = useContext(AccountContextVariable)

  const decodeUser = (token) => {
    if (!token) {
      return undefined;
    } else {
      const res = decodeToken(token);
      return res?.Username ?? "Guest";
    }
  };
  const user = decodeUser(account_state.token)

  const type = 'product'

  //   rating stars by user right side wala
  const [review, setreview] = useState("")
  const [rating, setrating] = useState(0)
  // yahan product data ayega from api
  const [productdetail, setproductdetail] = useState({})




  // api fetching
  useEffect(() => {
    axios.get(`${AppRoute}api/get-product-by-id?_id=${_id}`)
      .then(json => setproductdetail(json.data.ProductById))
      .catch(err => console.log(err))
  }, [])

  const ratingChanged = (newRating) => setrating(newRating)


  // submit button function

  const submitReview = () => {
    const payload = {
      _id: productdetail._id,
      rating,
      username: user,
      review
    }

    axios.post(`${AppRoute}api/review-product`, payload)
      .then(json => {

        console.log("tun tun tun ", json.data)
        const totalRating = json.data.Product.reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
        const averageRating = (totalRating / json.data.Product.reviews.length).toFixed(1);
        // 
        const UpdateProductPayload = {
          _id: productdetail._id,
          rating: averageRating
        }



        axios.put(`${AppRoute}api/update-product`, UpdateProductPayload).then((json) => {


          const updated = json.data.ProductUpdate?.find(item => item._id === productdetail._id);
          console.log("biryani", json.data)
          setproductdetail(updated);
          // 
          Swal.fire({
            title: 'Sucessfully Submitted!',
            text: 'Thanks for reviewing this Ad',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          setreview('')
          setrating(0)
        })
          .catch((err) => console.log(err))
      })
      .catch(err => console.log(err))


  }
  //                     CART

  const [ProductQuantity, setProductQuantity] = useState(0)

  const addtocart = () => {

    const payload = {
      ...productdetail,
      type,
      ProductQuantity,
      TotalPrice: productdetail.ProductPrice * ProductQuantity
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart_state.cart.findIndex(item => item._id === productdetail._id);
  
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cart_state.cart];
      updatedCart[existingProductIndex].ProductQuantity += ProductQuantity;
      updatedCart[existingProductIndex].TotalPrice += payload.TotalPrice;
      cart_dispatch({ type: "UPDATE_CART", payload: updatedCart });
    } else {
      // If the product is not in the cart, add it
      cart_dispatch({ type: "ADD_TO_CART", payload });
    }
    Swal.fire({
      title: 'ADDED TO CART',
      text: 'check your cart for checkout',
      icon: 'success',
      confirmButtonText: 'Continue Shopping'
    })

   

  

  }

  return (
    <>
      <div style={{ backgroundColor: "#ffecf1" }}>

      





        <div className="container row">
          {/* RIGHT image and slider wala side */}



          <div className="row mt-5">
            <div className="col-md-6 ">
              {
                productdetail?.ProductImageArray?.length > 0 && <ImageSection images={productdetail.ProductImageArray} />
              }
            </div>

            <div className="col-md-5 ">
              <div className="container">
                {/* <div>
                  <h1>{productdetail?.ProductName} </h1>



                  <div className='d-flex'>
                    <span className='text-danger'>Brand:  <span className='text-dark'></span></span>
                    <div style={{ borderLeft: "2px solid #dc3545", height: "20px" }} className='mt-1 mx-2 '></div>
                    <span className='text-danger'> {productdetail?.ProductBrand} <span className='text-dark'></span></span>
                  </div>
                </div> */}

                <div className="text-danger mt-2 ">
                  <h3>Rs: {productdetail?.ProductPrice}</h3>
                </div>


               

                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    edit={false}
                    value={productdetail?.rating}
                    color2={'#ffd700'} />
                </div>
                
                <h2 className='text-Dark mt-3'>Description: </h2>
                <p className='text-secondary'> {productdetail?.ProductDescription}</p>



{/* ADD TO CART started */}
                <div className='d-flex justify-content-center my-2 align-items-center '>
              <span className='mx-5 ' style={{fontSize:"15px", fontWeight:"bold"}}>Quantity:</span>
              <button disabled={ProductQuantity > 1 ? false : true} className="btn btn-dark border  py-2" onClick={() => setProductQuantity(ProductQuantity - 1)}>-</button>
              <span className='mx-3'>{ProductQuantity}</span>
              <button className="btn btn-dark border mx-3 py-2" onClick={() => setProductQuantity(ProductQuantity + 1)}>+</button>
            </div >

{/* 6 cols again */}
          <div className='d-flex justify-content-center my-5'>
            <button className=' p-4 mx-3 btn btn-dark border' onClick={addtocart}>Add to Cart</button>
            {/* <button className='p-4 mx-3 bg-light border' onClick={addtocart}><Link to="/checkout" className='text-dark  text-decoration-none'>Other Payment Options</Link></button> */}

          </div>



{/* add to cart ended */}
              </div>
            </div>

          </div>

          {/* LEFT review wala side */}
          <div className="col-md-6">




            <div className='mt-5 text-center'>
              <h2>Review this Product:</h2>
              <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam doloribus ut</p>
            </div>

            <div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  defaultValue={review}
                  onChange={(e) => setreview(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">Comments</label>
              </div>
            </div>

            <div className="mt-3">
              Rate Us:
              <div className="d-flex align-items-center">
                <ReactStars
                  count={5}
                  size={24}
                  onChange={ratingChanged}
                  value={rating}
                  color2={'#ffd700'} />

                <div className='ms-3'>({rating})</div>

              </div>
            </div>
            <button className='btn btn-dark my-3' onClick={submitReview}>Submit Reviews</button>

            <div>
              <hr />
              <div className=''>Product Reviews</div>
              <hr />

              {
                productdetail?.reviews?.map((val, key) =>
                  <div key={key}>
                    <span className='fw-bold'>{val.username}</span>
                    <ReactStars
                      count={5}
                      size={15}
                      edit={false}
                      value={val.rating}
                      color2={'#ffd700'} />
                    <p>{val.review}</p>
                    <hr />
                  </div>
                )
              }
            </div>
          </div>

        </div>
      </div>






    </>
  )
}
