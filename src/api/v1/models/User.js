//---------------------Third party Libraries and Modules-------
const mongoose = require("mongoose");

// -----------------user model-------
const UserModel = new mongoose.Schema({
    firstName: {
        type:String,
        require:true
    },
    lastName: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    nic:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    birthday:{
        type:String,
    },
    imageurl:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    userType:{
        type:String,
        require:true
    },
    dateCreated:{
        type:String,
        require:true
    },
    timeCreated:{
        type:String,
        require:True
    },
    dateUpdated: {
        type:String,
        require:true
    },
    timeUpdated: {
        type:String,
        require:True
    }


}, (timestamps:true));

module.exports = mongoose.model("Users" ,UserModel);