//-----------------------------Thirdparty Libraries and modules-------------
const bcrypt = require("bcrypt");

//--------------------------Custom Libraries and Modules ----------------------
const {UserModel} = require("../models");
const {GenerateTokens} = require("../libraries");

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
        res.status(500).json({
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

        //------Accesstoken-------------------
        const {accessToken} = GenerateTokens(User);
    

        return res.status(200).json({
            status:true,
            accessToken,
            user:User,
            Success:{
                message:"Login Successfully!"
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:false,
            error:{
                message:"Login Fail due to server error!"
            }
        });
        
    }


}
// ---- get all users-----
const GetAllUsers = async(req, res) => {
    try {
        const AllUsers = await UserModel.find().exec();

        return res.status(200).json({
            status:true,
            user:AllUsers,
            Success:{
                message:"Data Fetch Success!"
            }
        });


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:false,
            error:{
                message:"Cant get user details due to server error!"
            }
        });
    }
}

// ---------------- function to get user by id -----------

const GetUserById = async(req, res) => {
    //----------Request Param-----------
    const {UserId} = req.params;
    console.log(UserId);
    try {
        //--------check user id available----
        const User = await UserModel.findOne({_id:UserId}).exec();
        if(!User){
            return res.status(404).json({
                status:false,
                error:{
                    message:"No user available for provided ID"
                }
            });
        }
        return res.status(200).json({
            status:true,
            user:User,
            Success:{
                message:"Data Fetch Success!"
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:false,
            error:{
                message:"Cant get user details due to server error!"
            }
        });
    }   

}
// -------------- function to update user details----
const UpdateUser = async(req, res) => {
    const {UserId} = req.params;
    
    // -------------------request body----
const {
    newpassword,
    currentpassword,
    dateUpdated,
    timeUpdated
 } = req.body;

 //..............Global Variable----------------------
 let UpdatedUser , EncryptedPassword;

 try {
    //--------check user id available----
    const User = await UserModel.findOne({_id:UserId}).exec();
    if(!User){
        return res.status(404).json({
            status:false,
            error:{
                message:"No user available for provided ID"
            }
        });
    }
    //-------- properties validation----------
    if(!dateUpdated || !timeUpdated){
        return res.status(400).json({
            status:false,
            error:{
                message:"Not provided date or time"
            }
        });

    }; 

    if(currentpassword && newpassword){
        //-----------check properties count------
        const PropertiesCount = Object.keys(req.body).length;
        if(PropertiesCount != 4){
            return res.status(400).json({
                status:false,
                error:{
                    message:"Invalid Numbers abd Properties for password update"
                }
            });
        }
        // ----------check if current pw match r nt wih old pw----
    const passwordmatch = await bcrypt.compare(currentpassword , User.password);
    
    if(!passwordmatch){
        return res.status(400).json({
            status:false,
            error:{
                message:"wrong current pw"
            }
        });
    }
//--------Encrypt password---------------
    EncryptedPassword = await bcrypt.hash(newpassword , 8);

    } else if(!currentpassword && newpassword){
        return res.status(400).json({
            status:false,
            error:{
                message:"current pw not provided!"
            }
        });
    
    } else if(currentpassword && !newpassword){
        return res.status(400).json({
            status:false,
            error:{
                message:"new pw not provided!"
            }
        });
    
    }
//------------ update user-----------
UpdatedUser = await UserModel.findOneAndUpdate(
    {_id:UserId},
    {
        $set:
        currentpassword && newpassword ? {
            pasword:EncryptedPassword,
            dateUpdated,
            timeUpdated
        } : req.body
    },

    {
        new:true
    }
);
return res.status(200).json({
    status:true,
    uder:UpdatedUser,
    success:{
        message: currentpassword && newpassword
        ? "succesdfully updated the user's pw"
        : "User details update successfully!"
    }
});
 } catch (error) {
    console.log(error);
        res.status(500).json({
            status:false,
            error:{
                message:"Cant get user details due to server error!"
            }
        });
 }
}

// -----------function to delete user------

const DeleteUser = async(req, res) =>{
        //----------Request Param-----------
        const {UserId} = req.params;

        try {
            //--------check user id available----
        const User = await UserModel.findOne({_id:UserId}).exec();
        if(!User){
            return res.status(404).json({
                status:false,
                error:{
                    message:"No user available for provided ID"
                }
            });
        };
        //---- delete user----

        const DeleteUser = await User.deleteOne();
        if(DeleteUser){
            return res.status(200).json({
                status:true,
                success:{
                    message:"user deleted successully"
                }
            });
        }
            
        } catch (error) {
            console.log(error);
        res.status(500).json({
            status:false,
            error:{
                message:"failed user delete!"
            }
        });
        }
}
//----------export -----------

module.exports = {
    RegisterNewUser,
    LoginUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
}