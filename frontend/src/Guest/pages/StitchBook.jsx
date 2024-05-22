import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CartContextVariable } from '../../GlobalContext/CartContext';   //likhna baki
import { AccountContextVariable } from './../../GlobalContext/AccountContext';   //likhna baki
import { decodeToken } from 'react-jwt'
import { AppRoute } from '../../App'
import StitchType from './StitchType'
import Form from 'react-bootstrap/Form';




export default function StitchBook() {
    const { StitchTypeName } = useParams();
    const { cart_state, cart_dispatch } = useContext(CartContextVariable)
    const { account_state, account_dispatch } = useContext(AccountContextVariable)

    // -------------------------------------------------------------------------------------------------
    const [Gender, setGender] = useState("")
    const [Length, setLength] = useState("")
    const [ArmHole, setArmHole] = useState("")
    const [ChestSize, setChestSize] = useState("")
    const [SleeveLength, setSleeveLength] = useState("")
    const [HipSize, setHipSize] = useState("")
    const [WaistSize, setWaistSize] = useState("")
    const [Shoulder, setShoulder] = useState("")
    const [FootHole, setFootHole] = useState("")
    const [ExtraDetail, setExtraDetail] = useState("")
    // const [DesignImageArray, setDesignImageArray] = useState([])
    // const [StitchTypePrice, setStitchTypePrice] = useState('')
    const type = 'booking'


    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };


    // ---------------------------------------------------------------------------------------


    const decodeUser = (token) => {
        if (!token) {
            return undefined;
        } else {
            const res = decodeToken(token);
            return res?.Username ?? "Guest";
        }
    };
    const user = decodeUser(account_state.token)
    // ---------------------------------------------------------------------------------------------
    const [StitchType, setStitchType] = useState({})
    useEffect(() => {
        axios.get(`${AppRoute}api/get-StitchType-by-name?StitchTypeName=${StitchTypeName}`)
            .then(json => setStitchType(json.data.StitchTypeByName))
            .catch(err => console.log(err))
    }, [StitchTypeName])
    // --------------------------------------------------------------------------------------------



    //                     CART


    const addtocart = () => {

        const payload = {
            ...StitchType,
            Gender,
            Length,
            ArmHole,
            ChestSize,
            SleeveLength,
            HipSize,
            WaistSize,
            Shoulder,
            FootHole,
            ExtraDetail,
            // DesignImageArray,
            type
        }



        cart_dispatch({ type: "ADD_TO_CART", payload }).then(
             Swal.fire({
            title: 'ADDED TO CART',
            text: 'check your cart for checkout',
            icon: 'success',
            confirmButtonText: 'Continue Shopping'
        })

        )
       

    }

    return (
        <>
            <div style={{ backgroundColor: "#ffecf1" }} >
                <div className="row py-5">
                    <div className="col-md-6 ">
                        <div className="container w-75">
                            <h3 className=' pt-4 pb-4'>{StitchTypeName} Stitching:</h3>
                            <img src={StitchType?.StitchTypeImage} alt="" className="img-fluid mb-2 border rounded border-dark img-fluid object-fit-contain" style={{ height: "400px" }} />

                              <div className="text-danger mt-2 ">
                            <h4 className='text-left'>Service Charges: RS. {StitchType?.StitchTypePrice}</h4>
                        </div>
                        </div>


                      

                    </div>

                    <div className="col-md-6">




                        {/* Booking Form */}
                        <div>
                            <h3 className='pt-4 mb-5'>Booking Form:</h3>
                            <Form onSubmit={addtocart}>


                                {/* male female */}
                                <div>
                                    <h5 className='text-danger'>Gender:</h5>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Male"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-1`}
                                                value="Male"
                                                checked={Gender === 'Male'}
                                                onChange={handleGenderChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="Female"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                                value="Female"
                                                checked={Gender === 'Female'}
                                                onChange={handleGenderChange}
                                            />
                                        </div>
                                    ))}

                                </div>
                                {/* measrurements */}
                                <div>
                                    <h5 className='text-danger'>Measurements:</h5>
                                    <p>Please Provide Details in Inches.</p>

                                    {/* ------------------------------------------------------------------------------------------------------------ */}

                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="one" className='col-2'>Length:</label>
                                        <div className='col-10'>
                                            <input
                                                type="text"
                                                id="one"
                                                aria-describedby="one"
                                                placeholder='Ignore if not necessary'
                                                value={Length}
                                                onChange={(e) => setLength(e.target.value)}
                                            />
                                            {/* {errors.Length && <small className="text-danger">{errors.Length}</small>} */}
                                        </div>

                                    </div>

                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="two" className='col-2'>Arm Hole:</label>
                                        <div className='col-10'>

                                            <input
                                                type="text"
                                                id="two"
                                                aria-describedby="two"
                                                placeholder='Ignore if not necessary'

                                                value={ArmHole}
                                                onChange={(e) => setArmHole(e.target.value)}
                                            />
                                            {/* {errors.ArmHole && <small className="text-danger">{errors.ArmHole}</small>} */}
                                        </div>

                                    </div>

                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="three" className='col-2'>Chest Size:</label>
                                        <div className='col-10'>

                                            <input
                                                type="text"
                                                id="three"
                                                aria-describedby="three"
                                                placeholder='Ignore if not necessary'

                                                value={ChestSize}
                                                onChange={(e) => setChestSize(e.target.value)}
                                            />
                                            {/* {errors.ChestSize && <small className="text-danger">{errors.ChestSize}</small>} */}
                                        </div>
                                    </div>


                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="four" className='col-2'>Sleeve Length:</label>
                                        <div className='col-10'>
                                            <input
                                                type="text"
                                                id="four"
                                                aria-describedby="four"
                                                placeholder='Ignore if not necessary'
                                                value={SleeveLength}
                                                onChange={(e) => setSleeveLength(e.target.value)}
                                            />
                                            {/* {errors.SleeveLength && <small className="text-danger">{errors.SleeveLength}</small>} */}
                                        </div>
                                    </div>


                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="five" className='col-2'>Hip size:</label>
                                        <div className='col-10'>

                                            <input
                                                type="text"
                                                id="five"
                                                aria-describedby="five"
                                                placeholder='Ignore if not necessary'

                                                value={HipSize}
                                                onChange={(e) => setHipSize(e.target.value)}
                                            />
                                            {/* {errors.HipSize && <small className="text-danger">{errors.HipSize}</small>} */}
                                        </div>
                                    </div>


                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="six" className='col-2'>Waist Size:</label>
                                        <div className='col-10'>

                                            <input
                                                type="text"
                                                id="six"
                                                aria-describedby="six"
                                                placeholder='Ignore if not necessary'
                                                value={WaistSize}
                                                onChange={(e) => setWaistSize(e.target.value)}
                                            />
                                            {/* {errors.WaistSize && <small className="text-danger">{errors.WaistSize}</small>} */}
                                        </div>
                                    </div>

                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="seven" className='col-2'>Shoulder :</label>
                                        <div className='col-10'>
                                            <input
                                                type="text"
                                                id="seven"
                                                aria-describedby="seven"
                                                placeholder='Ignore if not necessary'
                                                value={Shoulder}
                                                onChange={(e) => setShoulder(e.target.value)}
                                            />
                                            {/* {errors.Shoulder && <small className="text-danger">{errors.Shoulder}</small>} */}
                                        </div>
                                    </div>


                                    <div className="form-group d-flex mt-3 row">
                                        <label htmlFor="eight" className='col-2'>foot Hole:</label>
                                        <div className='col-10'>
                                            <input
                                                type="text"
                                                id="eight"
                                                aria-describedby="eight"
                                                placeholder='Ignore if not necessary'
                                                value={FootHole}
                                                onChange={(e) => setFootHole(e.target.value)}
                                            />
                                            {/* {errors.FootHole && <small className="text-danger">{errors.FootHole}</small>} */}
                                        </div>
                                    </div>

                                    {/* Take their design  */}

                                    {/* <div className="my-3">
                                        <p className='mb-0 fw-semibold text-danger'>If You have Any Designs Please Upload:</p>
                                        <small className="text-secondary">Double Click to Delete Images</small>
                                        <div className="mt-2 d-flex gap-2 align-items-center">
                                            {
                                                DesignImageArray.map((val, key) =>
                                                    <div key={key} className="bg-light border rounded col-md-1"
                                                        //double click se image hatwa dengy
                                                        onDoubleClick={() => setDesignImageArray(DesignImageArray.filter((img) => img != val))}>
                                                        <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}

                                                            className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                                    </div>)
                                            }
                                            <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">+</label>
                                        </div>


                                        <input className="form-control d-none" onChange={(e) => setDesignImageArray([...DesignImageArray, e.target.files[0]])} type="file" id="formFile" />
                                    </div> */}


                                    {/* Special requirements */}

                                    <div>
                                        <h5 className='text-danger'>Extra Details:</h5>
                                        <p>Please Provide any extra Details if you have.</p>


                                        <textarea type="text" value={ExtraDetail} onChange={(e) => setExtraDetail(e.target.value)} style={{ width: "50%", height: "100px" }} />
                                    </div>
                                    {/* --------------------------------------------------------------------------------------------------------------- */}

                                </div>

                                {/* SUBMIT */}

                                <button type="submit" className='bg-dark text-white w-50 p-4 my-5'>Add To Booking</button>

                            </Form>

                        </div>

                    </div>

                </div>


            </div>






        </>
    )
}
