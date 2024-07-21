//--------Third party Libraries and Modules----------
const jwt = require("jsonwebtoken");

//---------------------Custom libraries and Modules ---------------
const Config = require("../../../configurations");
const { config } = require("dotenv");

//-------------------Function to generate Tokens----------------------
const GenerateTokens = (user) => {
try {
    //---------------create Playload--------------
    const Playload = {id:user._id , userType: user.userType};

    //----------------Generate Access Token--------------
    const AccessToken = jwt.sign(Playload, Config.JWT_ACCESS_KEY ,{ expiresIn:"1h"});

    return {
        status:true,
        accessToken:AccessToken
    }

} catch (error) {
    console.log(error);
    return {
        status:false,
        accessToken:null
    }
}
}

//----------------function to verify tokens-----
const VerifyTokens = (token) => {
    try {
        //-----------------verify token-------------
        const User = jwt.verify(token, Config.JWT_ACCESS_KEY);
        return {
            status:true,
            tokenDetails:User
        };
    } catch (error) {
        console.log(error);
        return {
            status:false,
            tokenDetails:null
        }
    }
}

module.exports = {
    GenerateTokens,
    VerifyTokens,
}