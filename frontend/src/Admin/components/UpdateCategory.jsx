import React from 'react'
import { GrUpdate } from 'react-icons/gr'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { AppRoute } from '../../App';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
//                         FIREBASE
import { storage } from '../../Firebase/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function UpdateCategory() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }

    const [_id, set_id] = useState("")
    const [CategoryName, setCategoryName] = useState("")
    const [CategoryImage, setCategoryImage] = useState("")



    //                      FORM SUBMIT FUNCTION
    const UpdateCategory = (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `images/CategoryImages/${CategoryImage?.name}`);
        uploadBytes(storageRef, CategoryImage).then((snapshot) => {   //success output = snapshot = metadata

            getDownloadURL(snapshot.ref)  //snapshot ka refernce diya k us success output pe jao
                .then((url) => {
                    console.log(url)  //posted image url in internet =url
                    const payload = {
                        _id,
                        CategoryName,
                        CategoryImage: url   //jo image bheji uska firebase se aya hua url
                    }
                    console.log(payload)

                    axios.put(`${AppRoute}api/update-Category`, payload).then((json) => {
                        console.log(json.data)
                    })



                })
        })





    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <GrUpdate />
            </Button>

            <Modal show={show} centered backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateCategory}>
                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="Categoryid" label="Category id" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="Category id" value={_id} onChange={(e) => set_id(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="CategoryName" label="CategoryName" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="CategoryName" value={CategoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>



                        <div className="mb-3">
                            <label htmlFor="CategoryImage" className="form-label">
                                CategoryImage
                            </label>
                            <input className="form-control" onChange={(e) => setCategoryImage(e.target.files[0])} type="file" id="CategoryImage" />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>



                </Modal.Body>

            </Modal>

        </>
    )
}
