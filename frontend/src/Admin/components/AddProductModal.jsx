import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2'
import { AppRoute } from '../../App';


import FloatingLabel from 'react-bootstrap/FloatingLabel';
//                         FIREBASE
import { storage } from '../../Firebase/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProductModal({ recallProductData }) {

    //yeh ha modal ki setting ka
    const [show, setShow] = useState(false);

    //wo api jo mungwai
    // const [brands, setbrand] = useState([])
    const [Category, setCategories] = useState([])

    //hamary pas each elements, USESTATES FOR ELEMENTS STORING
    const [ProductName, setProductName] = useState("")
    const [ProductPrice, setProductPrice] = useState(0)
    const [ProductCategory, setProductCategory] = useState("")
    // const [ProductBrand, setProductBrand] = useState("")
    const [ProductThumbnail, setProductThumbnail] = useState(null)
    const [ProductDescription, setProductDescription] = useState("")
    const [ProductImageArray, setProductImageArray] = useState([])


    const handleClose = () => setShow(false);

    // category and brand mungwa liya
    const handleShow = () => {
        // axios.get(`${AppRoute}api/get-all-brands`).then(json => {
            // setbrand(json.data.Brands)
            axios.get(`${AppRoute}api/get-all-categories`).then(json => {
                setCategories(json.data.Categories)
                setShow(true);
            })
        }

    


    //image bhej kr url mungwana paancho k liye
    const urls = []  //array isliye ku k ziada hain images

    const MultipleImageUpload = () => ProductImageArray?.map((val) => {   //ku k yeh array hai isliye index nh diya
        const MultipleImageRef = ref(storage, `/images/products/${ProductName}/${val.name}`);
        return uploadBytes(MultipleImageRef, val).then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => { urls.push(url) }).catch((error) => alert(error));
        });
    })


    //                      FORM SUBMIT FUNCTION
    const AddProduct = (e) => {
        e.preventDefault();

        //images upload kr rhy hain hum 
        const uploadImages = MultipleImageUpload()

        // jo images ayin hain unko promise banaya
        Promise.all(uploadImages)
            .then(() => {

                const storageRef = ref(storage, `/images/products/${ProductName}/${ProductThumbnail.name}`);
                uploadBytes(storageRef, ProductThumbnail)
                    .then((snapshot) => {

                        // successfully firebase pe jany k bad ab hum unka url mungwa rhy
                        getDownloadURL(snapshot.ref)
                            .then((url) => {

                                const payload = {
                                    ProductName,
                                    ProductPrice,
                                    ProductCategory,
                                    // ProductBrand,
                                    ProductThumbnail: url,
                                    ProductDescription,
                                    ProductImageArray: urls
                                }
                                console.log(payload)
                                axios.post("http://localhost:1234/api/create-product", payload).
                                    then((json) => {
                                        console.log(json.data)
                                        Swal.fire({
                                            title: 'New Product Added',
                                            text: 'Check All the details ',
                                            icon: 'success',
                                            confirmButtonText: 'Continue'
                                        })
                                        setShow(false)
                                    })
                                    .catch(err => console.log(err))
                            })
                            .catch((error) => { console.log(error) });
                    });
            })
            .catch(err => console.log(err))



    }


    return (
        <>
            <Button variant="dark" onClick={handleShow}>Add Product</Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddProduct}>


                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="productname" label="Product Name" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="price" label="Product Price ($)" className="mb-3 text-secondary"                                >
                                    <Form.Control type="number" placeholder="Product Price" value={ProductPrice} onChange={(e) => setProductPrice(e.target.value)} />
                                </FloatingLabel>
                            </div>

                        </div>



                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Product Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => setProductThumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div>
                        {/* ---------------------------------------------------------------------------image array */}
                        <div className="mb-3">
                            <p className='mb-0 fw-semibold'>Choose Images</p>
                            <small className="text-secondary">Double Click to Delete Images</small>
                            <div className="mt-2 d-flex gap-2 align-items-center">
                                {
                                    ProductImageArray.map((val, key) =>
                                        <div key={key} className="bg-light border rounded col-md-1"
                                            //double click se image hatwa dengy
                                            onDoubleClick={() => setProductImageArray(ProductImageArray.filter((img) => img != val))}>
                                            <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}

                                                className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                        </div>)
                                }
                                <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">+</label>
                            </div>


                            <input className="form-control d-none" onChange={(e) => setProductImageArray([...ProductImageArray, e.target.files[0]])} type="file" id="formFile" />
                        </div>

                        {/* --------------------------------------------------------------------------------------brand */}
                        <div className="row">
                            {/* <div className="col">
                                <Form.Group className="mb-3" >

                                    <FloatingLabel controlId="floatingSelectBrand" label="Select Brand">
                                        <Form.Select aria-label="Please Select a Brand" onChange={(e) => setProductBrand(e.target.value)}>
                                            <option>Please Select a Brand</option>
                                            {
                                                brands?.map((val, key) => <option key={key} value={val.BrandName}>{val.BrandName}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div> */}
                            <div className="col">
                                <Form.Group className="mb-3" >
                                    <FloatingLabel controlId="selectCategory" label="Select Category">
                                        <Form.Select aria-label="Please Select a Category" onChange={(e) => setProductCategory(e.target.value)}>
                                            <option>Please Select a Category</option>
                                            {
                                                Category?.map((val, key) => <option key={key} value={val.CategoryName}>{val.CategoryName}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>
                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={ProductDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );



}
