import React, { useContext, useEffect, useState } from 'react'
import { AppRoute } from '../../App'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaSearch } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap'

import CartOffCanvas from "./CartOffCanvas"

export default function Navigationbar() {



    const [Search, setSearch] = useState("")



    const [showA, setShowA] = useState(false);
    const handleCloseA = () => setShowA(false);
    const handleShowA = () => setShowA(true);



    

 


    return (
        <>
          <Navbar className="" style={{backgroundColor:"#ffecf1", marginBottom:"0", paddingBottom:"0"}} sticky='top'>
      <Container className='' style={{backgroundColor:"#ffecf1", marginBottom:"0", paddingBottom:"0"}}>
                            <div className='col-5 col-sm-5 col-md-5 col-lg-5 d-flex  align-items-center'>
                                    <button id="search-button-A" type="button" className="btn btn-dark ms-2" onClick={handleShowA}>
                                    <FaSearch />
                                </button>
                            </div>
                            <div className='col-2 col-sm-2 col-md-2 col-lg-2'>
                                    <Link to="/" className='text-decoration-none d-flex justify-content-center'>
                                    <span className=" text-dark nfontsize" style={{ fontFamily: "fantasy" }} >AV</span>
                                    <span className="mx-2 text-dark nfontsize" > Boutique</span>
                                </Link>
                                <hr />
                            </div>
                            <div className='col-5 col-sm-5 col-md-5 col-lg-5 d-flex justify-content-end align-items-center'>  <CartOffCanvas /></div>
        
      </Container>


         {/* searchbar */}
         <Modal show={showA} onHide={handleCloseA} size='lg'>

<Modal.Body >
    <div className='d-flex justify-content-center'>

        {/* yeh form ha  */}
        <form >
            <div className="input-group my-2">
                <div className="form-outline" data-mdb-input-init="">
                    <input id="search-input-B" placeholder='Search any Product' type="search" value={Search} onChange={(e) => setSearch(e.target.value)} className="form-control" />
                </div>
                    <Link to={`/${Search}`}>
                <button id="search-button-B" type="button" onClick={handleCloseA} className="btn btn-dark">
                    <FaSearch />

                </button>
                    </Link>
            </div>
        </form>
    </div>
</Modal.Body>

</Modal>


    </Navbar>
        </>
    )
}




