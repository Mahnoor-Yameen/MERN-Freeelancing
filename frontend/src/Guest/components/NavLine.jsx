import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AccountContextVariable } from './../../GlobalContext/AccountContext'

import { Link } from 'react-router-dom';
import axios from 'axios'
import { AppRoute } from '../../App'

const NavLine = () => {

    const { account_state, account_dispatch } = useContext(AccountContextVariable)
    // ----------------------------------------------------------------------
    const [hoveredName1, setHoveredName1] = useState(null);
    const [hoveredName2, setHoveredName2] = useState(null);
    const [hoveredName3, setHoveredName3] = useState(null);
    const [hoveredName4, setHoveredName4] = useState(null);
    const [hoveredName5, setHoveredName5] = useState(null);
    const [hoveredName6, setHoveredName6] = useState(null);


    // --------------------------------------------------

    const [Category, setCategory] = useState([])

    useEffect(() => {
        axios.get(`${AppRoute}api/get-all-Categories`)
            .then((res) => setCategory(res.data.Categories))
            .catch((error) => { console.log(error.message) })
    }, [])

    // ------------------------------------------------

    const [StitchType, setStitchTypes] = useState([])

    useEffect(() => {
        axios.get(`${AppRoute}api/get-all-StitchTypes`)
            .then((res) => setStitchTypes(res.data.StitchTypes))
            .catch((error) => { console.log(error.message) })
    }, [])

    //   ------------------------------

    const Account = [
        {
            name: 'Login',
            to: '/login'
        },
        {
            name: 'Register',
            to: '/register'
        }
    ]







    return (
        <>
            <Navbar expand="md" className="" style={{ backgroundColor: "#eebac7", width: "100%", marginBottom: "0", paddingBottom: "0", marginTop: "0", paddingTop: "0" }}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='mx-auto' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className=" d-flex justify-content-center align-items-center" style={{ backgroundColor: "#eebac7", width: "100%" }}>

{/* 1st */}
                            <div className="aname-item diva"
                                onMouseEnter={() => setHoveredName1('1')}
                                onMouseLeave={() => setHoveredName1(null)}>
                                <Link className='nav-link fonta mx-2' style={{ fontSize: "18px" }} to='/products'>Products</Link>
                                {
                                    hoveredName1 === '1' && (
                                        <div className="adropdown" style={{ width: "250px" }}>
                                            {Category.map((value, index) => (
                                                <div key={index}>
                                                    <Link to={`/category/${value.CategoryName}`} className="adropdown-link">{value.CategoryName}</Link>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>


{/* 2nd */}
                            <div className="aname-item diva"
                                onMouseEnter={() => setHoveredName2('2')}
                                onMouseLeave={() => setHoveredName2(null)}>
                                <Link className='nav-link fonta mx-2' style={{ fontSize: "18px" }} to='/categories'>Categories</Link>
                                {
                                    hoveredName2 === '2' && (
                                        <div className="adropdown" style={{ width: "250px" }}>
                                            {Category.map((value, index) => (
                                                <div key={index}>
                                                    <Link to={`/category/${value.CategoryName}`} className="adropdown-link">{value.CategoryName}</Link>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }

                            </div>


{/* 3rd */}
                            <div className="aname-item diva"
                                onMouseEnter={() => setHoveredName3('3')}
                                onMouseLeave={() => setHoveredName3(null)}>
                                <Link className='nav-link fonta mx-2' style={{ fontSize: "18px" }} to='/StitchTypes'>Stiching</Link>

                                {
                                    hoveredName3 === '3' && (
                                        <div className="adropdown" style={{ width: "250px" }}>
                                            {StitchType.map((value, index) => (
                                                <div key={index}>
                                                    <Link to={`/StitchTypes/${value.StitchTypeName}`} className="adropdown-link">{value.StitchTypeName}</Link>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
{/* 4th */}
                            <div className="aname-item diva"
                                onMouseEnter={() => setHoveredName4('4')}
                                onMouseLeave={() => setHoveredName4(null)}>
                                <Link className='nav-link fonta mx-2' style={{ fontSize: "18px" }} to='/Checkout'>Checkout</Link>


                            </div>

                            {/* 6th */}

                            <div className="aname-item diva"
                                onMouseEnter={() => setHoveredName6('6')}
                                onMouseLeave={() => setHoveredName6(null)}>
                                <Link className='nav-link fonta mx-2' style={{ fontSize: "18px" }} to='/userorders'>Orders</Link>
                            </div>


                            {/* 5th with choice of being guest or user */}
                            {account_state?.people == 'guest' && (
                                <div className="aname-item diva"
                                    onMouseEnter={() => setHoveredName5('5')}
                                    onMouseLeave={() => setHoveredName5(null)}>
                                    <Link className='nav-link fonta mx-2' style={{ fontSize: "18px" }} to='/'>Account</Link>

                                    {
                                        hoveredName5 === '5' && (
                                            <div className="adropdown">
                                                {Account.map((value, index) => (
                                                    <div key={index}>
                                                        <Link to={value.to} className="adropdown-link">{value.name}</Link>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                            {account_state?.people == 'user' && (
                                <div className="aname-item diva"
                                    onMouseEnter={() => setHoveredName5('5')}
                                    onMouseLeave={() => setHoveredName5(null)}>
                                    <button className='btn text-dark fonta ' style={{ fontSize: "18px" }} onClick={() => {
                                        account_dispatch({
                                            type: "LOGOUT"
                                        })
                                    }}>Logout</button>
                                </div>
                            )}



                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
};

export default NavLine;
