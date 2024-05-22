const {Schema, model}=require('mongoose')

const StitchTypeSchema=new Schema({
    StitchTypeName:{
        type:String,
        unique:true,
        required:true
    },
    StitchTypeImage:{
        type:String,
        required:true
    },
    StitchTypePrice:{
        type:String,
        required:true
    },

})

const StitchTypeFromModel=model('StitchType',StitchTypeSchema)
module.exports={StitchTypeFromModel}