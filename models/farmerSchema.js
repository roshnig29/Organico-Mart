//const { text } = require('body-parser');
const mongoose=require('mongoose');
const schema= mongoose.Schema;
const userSchema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
//sign-in

})
module.exports=mongoose.model('farmer',userSchema)
