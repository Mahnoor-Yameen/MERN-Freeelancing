import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import { AppRoute } from '../../App'

import axios from 'axios';


export default function SearchedProducts() {
  const { Search } = useParams();


  // API FETCHING
  const [ManyProducts, setManyProducts] = useState([])

  // data mungwa rahy
  useEffect(() => {
      axios.get(`${AppRoute}api/get-all-product`)
          .then((json) => 
{
          const searchWords = Search.split(" ");
        const filteredArray = json.data.Products.filter(obj => {
            return searchWords.every(word =>
                obj.ProductName.toLowerCase().includes(word.toLowerCase())
            );
        });
        setManyProducts(filteredArray)}
        )
          .catch((error) => console.log(error))
  }, [])

useEffect(()=>{
  
},[])



  return (
    <>
    <div style={{backgroundColor:"#ffecf1"}}>

    
    <div className="container">
    <div className='d-flex justify-content-center'>
        {ManyProducts?.length === 0 ? (
            <div className="text-center py-3">
                <h3>No products found</h3>
            </div>
        ) : (
            <div className="row container">
                {ManyProducts?.map((value, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={index} >
                        <Link className='text-decoration-none text-dark' to={`/get-product-by-id/${value._id}`}  >
                            <Card style={{ height: "360px" }}>
                                <Card.Img varient="top" src={value.ProductThumbnail} className='object-fit-contain border rounded img-fluid' style={{ height: "200px" }} />
                                <Card.Body>
                                    <div className="brand text-center">
                                    </div>
                                    <div className="text-center">
                                        {value?.ProductName?.length > 20 ? value?.ProductName.slice(0, 20) + '...' : value?.ProductName}
                                    </div>
                                    
                                    <div className='text-center' >
                                        <h5 className='text-danger fw-semibold  me-2 text-secondary'>Rs. {value?.ProductPrice}</h5>
                                    </div>
                                </Card.Body>
                                <span className="position-absolute translate-start badge bg-danger" style={{
                                    padding: '5px 10px',
                                    marginTop: '10px',
                                    marginLeft: '-4px',
                                    borderRadius: '4px'
                                }}>
                                    {value?.ProductCategory?.toUpperCase()}
                                </span>


                            </Card>
                        </Link>






                    </div>
                ))}
            </div>)}
    </div>
    
    </div>
    </div>
    </>
  )
}
