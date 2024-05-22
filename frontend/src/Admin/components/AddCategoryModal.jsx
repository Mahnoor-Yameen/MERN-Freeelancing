import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { AppRoute } from '../../App';

//                         FIREBASE
import { storage } from '../../Firebase/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function AddCategoryModal({recallData}) {

    // MODAL FUNCTIONS
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // USESTATES FOR CATEGORY NAME AND IMAGE
    const [CategoryName, setCategoryName] = useState("")
    const [CategoryImage, setCategoryImage] = useState(null)

    //                      FORM SUBMIT FUNCTION
    const AddCategory = (e) => {
        e.preventDefault();

        //                               FIREBASE
        //           FIREBASE PE PIC BHEJI,URL LIYA, AXIOS SE IMAGE AND NAME POSTED ON MONGODB
        // console.log(CategoryImage.name)     //categoryimage.name = actual name of image
        const storageRef = ref(storage, `images/CategoryImages/${CategoryImage.name}`);
        uploadBytes(storageRef, CategoryImage).then((snapshot) => {   //success output = snapshot = metadata

            getDownloadURL(snapshot.ref)  //snapshot ka refernce diya k us success output pe jao
                .then((url) => {          
                    console.log(url)  //posted image url in internet =url
                    const payload={
                        CategoryName,
                        CategoryImage: url   //jo image bheji uska firebase se aya hua url
                    }
                    console.log("jany wala payload", payload)    //image url,  name mil raha in object

                    axios.post(`${AppRoute}api/create-category`, payload)
                    .then((json)=>{ setShow(false); //after post modal band krdena
                    recallData(json.data.AllCategory);
                    }
                    
                    )          
                    .catch((error)=>alert(error.message))
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }

    // TASK : BRAND AND PRODUCT PE FIREBASE LAGANA
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Add Category
            </Button>
            {/* MOdal pe click pe form open hota to add a new category */}
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Yahan hum apna form laga rahy,*/}
                    <form onSubmit={AddCategory}>
                        <div className="mb-3">
                            <label htmlFor="CategoryName" className="form-label">
                                Categeory Name
                            </label>
                            <input
                                value={CategoryName}
                                onChange={(e) => { setCategoryName(e.target.value) }}
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                aria-describedby="emailHelp"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Category Image
                            </label>
                            <input onChange={(e) => setCategoryImage(e.target.files[0])} className="form-control" type="file" id="formFile" />
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
export default AddCategoryModal;