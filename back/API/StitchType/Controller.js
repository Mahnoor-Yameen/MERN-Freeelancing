const {StitchTypeFromModel}=require('./Model')  //schema k acording data leny wala variable template
const {connect} = require('mongoose')
const  { MONGO_URL } = require ("../../index")



const CreateStitchType= async (req,res)=>{
    const {StitchTypeName,StitchTypeImage, StitchTypePrice}=req.body;


    // agar koi field missing hogi to woh mongo ki taraf jayega hi nahi
    if (!StitchTypeName || !StitchTypeImage || !StitchTypePrice){
        res.status(403).json({
            message:"Some Fields are Missing"
        })
    }else{
        try {
            await connect(MONGO_URL)
            // res.json({
            //     message:"database connected"
            // })

            // agar DB main jo user StitchType name likh kr bhej raha wo  StitchType already moujood hai toh error dedo 400 
            const checkExistance= await StitchTypeFromModel.exists({ StitchTypeName })
            if(checkExistance){
                res.status(400).json({
                    message:"StitchType already exists"
                })
            }
            else{
                await StitchTypeFromModel.create({StitchTypeName,StitchTypeImage,StitchTypePrice })
                const AllStitchTypes=await StitchTypeFromModel.find()
                res.json({
                    message:"new StitchType Created",
                    AllStitchType:AllStitchTypes

                })
            }
        
        }    catch (error) {
            res.status(400).json({
                message:"Some error came:",
                errorMessage:error.message
            })
            
        }
    }
}
const StitchTypeByName=async(req,res)=>{
    const {StitchTypeName}=req.query

    try {
     await connect(MONGO_URL)
     const StitchTypeByName=await StitchTypeFromModel.findOne({StitchTypeName})
     res.json({StitchTypeByName})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
}

const StitchTypeByID=async (req,res)=>{
    const {_id}=req.query

    try {
     await connect(MONGO_URL)
     const StitchTypeById=await StitchTypeFromModel.findOne({_id})
     res.json({StitchTypeById})
        
    } catch (error) {
        req.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
}

const UpdateStitchType=async(req,res)=>{
     // user se teeno cheezain main se jo bhi de kr krna chahy

     const {_id,StitchTypeName,StitchTypeImage, StitchTypePrice}=req.body
     
    
     const filter = { _id };
     const update = { StitchTypeName,StitchTypeImage, StitchTypePrice };
 
     try {
         //db connection
         await connect(MONGO_URL)  //connect hoga db idher
         await StitchTypeFromModel.findOneAndUpdate(filter, update, {
             new: true
           });
 
         //   sara lany k liye
         const StitchTypeUpdate= await StitchTypeFromModel.find()
 
         res.json({
             message:"Updation Done Succesfully",
             StitchTypeUpdate
         })
 
         
     } catch (error) {
         req.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
         })
         
     }
}

const DeleteStitchType=async(req,res)=>{
    const {_id}=req.body

    try {
     await connect(MONGO_URL)   //mongo connection
     //pehly find to karo k wo chez db mai hai bhi ya nahi
     if (_id){
            await StitchTypeFromModel.deleteOne({_id})      //api call hony pe delete hojayegi
            const AllStitchTypes=await StitchTypeFromModel.find()      //ek variable main baki ki mungwali
            res.status(200).json({
                message:"Deleted succesfully",
                AllStitchTypes
            })
        } else{
            res.json({
                message:"The id you are trying to delete do not exists"
            })
        }
    }catch (error) {
        req.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
}
const AllStitchTypes=async (req, res) => {

    try {
        await connect(MONGO_URL)  //connect hoga db idher

        const AllStitchTypes=await StitchTypeFromModel.find()
                res.json({
                    
                    StitchTypes:AllStitchTypes

                })
    
        
    } catch (error) {
        res.status(400).json({
            message:"Error:",
            messagedusra:error.message
        })
        
    }
  }


module.exports={CreateStitchType,AllStitchTypes, StitchTypeByName, StitchTypeByID, UpdateStitchType, DeleteStitchType}
