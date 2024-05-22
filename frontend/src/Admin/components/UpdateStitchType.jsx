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


export default function UpdateStitchType() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }

    const [_id, set_id] = useState("")
    const [StitchTypeName, setStitchTypeName] = useState("")
    const [StitchTypeImage, setStitchTypeImage] = useState("")



    //                      FORM SUBMIT FUNCTION
    const UpdateStitchType = (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `images/StitchTypeImages/${StitchTypeImage?.name}`);
        uploadBytes(storageRef, StitchTypeImage).then((snapshot) => {   //success output = snapshot = metadata

            getDownloadURL(snapshot.ref)  //snapshot ka refernce diya k us success output pe jao
                .then((url) => {
                    console.log(url)  //posted image url in internet =url
                    const payload = {
                        _id,
                        StitchTypeName,
                        StitchTypeImage: url   //jo image bheji uska firebase se aya hua url
                    }
                    console.log(payload)

                    axios.put(`${AppRoute}api/update-StitchType`, payload).then((json) => {
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
                    <Modal.Title>UPDATE StitchType</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateStitchType}>
                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="StitchTypeid" label="StitchType id" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="StitchType id" value={_id} onChange={(e) => set_id(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="StitchTypeName" label="StitchTypeName" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="StitchTypeName" value={StitchTypeName} onChange={(e) => setStitchTypeName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>



                        <div className="mb-3">
                            <label htmlFor="StitchTypeImage" className="form-label">
                                StitchTypeImage
                            </label>
                            <input className="form-control" onChange={(e) => setStitchTypeImage(e.target.files[0])} type="file" id="StitchTypeImage" />
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
