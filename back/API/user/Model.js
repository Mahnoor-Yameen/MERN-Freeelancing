const {Schema, model} =require("mongoose")


const UserSchema = new Schema ({
UserName:{
    type: String,
    Required: true
},
Email:{
type:String,
required :true,
Unique: true
},
Password : {
    type: String,
    Required: true
},
ProfilePic:{
    type: String,
    default: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
},
Role:{
    type:String,
    required: true,
    default:"user"
},
Joining:{
    type:Date,
    default: Date.now
}

})

const ModelOfUser = model('user', UserSchema)

// exporting must be done with curly brackets
module.exports = {ModelOfUser}
