import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { AppRoute } from '../../App';
//                         FIREBASE
import { storage } from '../../Firebase/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function AddStitchTypeModal({recalllData}) {

    
    // MODAL FUNCTIONS
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // USESTATES FOR StitchType NAME AND IMAGE
    const [StitchTypeName, setStitchTypeName] = useState("")
    const [StitchTypePrice, setStitchTypePrice] = useState("")

    const [StitchTypeImage, setStitchTypeImage] = useState(null)

    //                      FORM SUBMIT FUNCTION
    const AddStitchType = (e) => {
        e.preventDefault();

        //                               FIREBASE
        //           FIREBASE PE PIC BHEJI,URL LIYA, AXIOS SE IMAGE AND NAME POSTED ON MONGODB
        // console.log(StitchTypeImage.name)     //StitchTypeimage.name = actual name of image
        const storageRef = ref(storage, `images/StitchTypeImages/${StitchTypeImage.name}`);
        uploadBytes(storageRef, StitchTypeImage).then((snapshot) => {   //success output = snapshot = metadata

            getDownloadURL(snapshot.ref)  //snapshot ka refernce diya k us success output pe jao
                .then((url) => {          
                    console.log(url)  //posted image url in internet =url
                    const payload={
                        StitchTypeName,
                        StitchTypePrice,
                        StitchTypeImage: url   //jo image bheji uska firebase se aya hua url
                    }
                    console.log(payload)    //image url,  name mil raha in object

                    axios.post(`${AppRoute}api/create-StitchType`, payload)
                    .then((json)=>{ setShow(false); //after post modal band krdena
                    recalllData(json.data.StitchTypes);
                    }
                    
                    )          
                    .catch((error)=>alert(error.message))
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }

    // TASK : StitchType AND PRODUCT PE FIREBASE LAGANA
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Add StitchType
            </Button>
            {/* MOdal pe click pe form open hota to add a new StitchType */}
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add StitchType</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Yahan hum apna form laga rahy,*/}
                    <form onSubmit={AddStitchType}>
                        <div className="mb-3">
                            <label htmlFor="StitchTypeName" className="form-label">
                                StitchType Name
                            </label>
                            <input
                                value={StitchTypeName}
                                onChange={(e) => { setStitchTypeName(e.target.value) }}
                                type="text"
                                className="form-control"
                                id="StitchTypeName"
                                aria-describedby="emailHelp"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="StitchTypePrice" className="form-label">
                                StitchType Price
                            </label>
                            <input
                                value={StitchTypePrice}
                                onChange={(e) => { setStitchTypePrice(e.target.value) }}
                                type="text"
                                className="form-control"
                                id="StitchTypePrice"
                                aria-describedby="emailHelp"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                StitchType Image
                            </label>
                            <input onChange={(e) => setStitchTypeImage(e.target.files[0])} className="form-control" type="file" id="formFile" />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </Modal.Body>
                
                
            </Modal>
        </>
    );
}
export default AddStitchTypeModal;