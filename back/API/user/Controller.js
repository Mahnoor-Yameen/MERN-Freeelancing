const {connect} = require("mongoose")
const {ModelOfUser} = require("./Model")
const {hash, compare} = require("bcryptjs")
const {sign} = require("jsonwebtoken")
const  { MONGO_URL } = require ("./../../index")
const  { JWT_SECRET } = require ("./../../index")



const RegisterUser = async (req,res) =>{
    const {UserName, Email, Password} = req.body
    if (!UserName || !Email || !Password) {
        res.json({
            message:"Some fields are missing in register"
        })
    } else {
      try {
        await connect(MONGO_URL)

        // checking existance
        const CheckExistance = await ModelOfUser.exists({Email})
        if(CheckExistance){
            res.json({
                message:"User already exists in register"
            })
        }
        else{
            await ModelOfUser.create({UserName: UserName, Email: Email, Password: await hash(Password, 12)})

            // now getting that user


            // const User = await ModelOfUser.findOne({})
            res.json({
                message:"User Successfully Created"
            })
            
        }

        
    } catch (error) {
        res.json({
            message:"Register: error came in catch block before db connection",
            Reason: error.message
        })
    }    
    }

  
}

const LoginUser = async (req,res) =>{
   const {Email, Password} = req.body
   if ( !Email || !Password) {
    res.json({
        message:"Some fields are missing in login"  //res.status(403).json
    })
    
} 
   else{
    try {
        await connect(MONGO_URL)

        const UserFinding = await ModelOfUser.findOne({ Email })
        if(!UserFinding){
            res.json({
                message:"User don't exists in login"
            })
        }
        else{
            // jo uper se password aya tha wo compare hoga hashed password se, hashed password ko compare function apni key se decrypt kr k abhi j ouser ne password diya us se compare krega and then if matches to hasing is true otherwise false
            const hashing = await compare(Password,  UserFinding.Password) 
            if(hashing){
                const User = {
                    Email: UserFinding.Email,
                    _id:UserFinding._id,
                    Role: UserFinding.Role,
                    Joining: UserFinding.Joining,
                    ProfilePic: UserFinding.ProfilePic,
                    UserName: UserFinding.UserName,
                }

                // jo user ka variable tha usko token main badal diya
                const tokenVar = sign(User, JWT_SECRET)
                res.json({
                    message:"user logged in successfully",
                    token: tokenVar
                })
            }
        }
    } catch (error) {
        res.json({
            message:"Login: Error came in catch block before db connection"
            , Reason:error.message
        })
    }
   }
}
const DeleteUser = async (req,res) =>{}
const UpdateProfile = async (req,res) =>{}
const GetAllUsers = async (req,res) =>{}




module.exports =  {RegisterUser, UpdateProfile, GetAllUsers, LoginUser, DeleteUser}
