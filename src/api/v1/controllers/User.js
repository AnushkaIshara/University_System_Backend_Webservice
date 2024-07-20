//-----------------------------Thirdparty Libraries and modules-------------
const bcrypt = require("bcrypt");

//--------------------------Custom Libraries and Modules ----------------------
const {UserModel} = require("../models");
const { status } = require("express/lib/response");


//--------------------------Function to register new user------------------
const RegisterNewUser = async(req , res) => {
    // ----------- Request Body ------------------------
    const {
        firstName,
        lastName,
        email,
        nic,
        address,
        gender,
        birthday,
        imageurl,
        password,
        userType,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated
    } = req.body;

    try {
        // ----- Check if email already exist or not------
        const User = await UserModel.findOne({email});

        if(User){
            return res.status(400).json({
                status:false,
                error:{
                    message:"Email Address already exists!"
                }
            });
        }

        //--------Encrypt password---------------
        const EncryptedPassword = await bcrypt.hash(password , 8);

        //-------------New User-----------------
        const NewUser = new UserModel({
            firstName,
            lastName,
            email,
            nic,
            address,
            gender,
            birthday,
            imageurl,
            password: EncryptedPassword,
            userType,
            dateCreated,
            timeCreated,
            dateUpdated,
            timeUpdated
        });

        // ---------------Save New User------------------
        const SaveUser = await NewUser.save();

        res.status(201).json({
            status:true,
            success:{
                message:"Successfully Registered!"
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).jason({
            status:false,
            error:{
                message:"Can't Register the user due to server error!"
            }
        });
    }

}

//------------------ Function to login user ----------------
const LoginUser = async(req, res) =>{
    // ----------------Request Body -------------
    const {
        email,
        password
    } = req.body;
    try {
         // ----- Check if email already exist or not------
         const User = await UserModel.findOne({email}).exec();

         if(!User){
            return res.status(400).json({
                status:false,
                error:{
                    message:"Wrong email!"
                }
            });
        }
        // ----- check password match or not -----
        const PasswordMatch = await bcrypt.compare(password , User.password);

        if(!PasswordMatch){
            return res.status(401).json({
                status:false,
                error:{
                    message:"Wrong password!"
                }
            });          
        }
    
        return res.status(200).json({
            status:true,
            user:User,
            Success:{
                message:"Login Successfully!"
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).jason({
            status:false,
            error:{
                message:"Login Fail due to server error!"
            }
        });
        
    }


}


//----------export -----------

module.exports = {
    RegisterNewUser,
    LoginUser,
}