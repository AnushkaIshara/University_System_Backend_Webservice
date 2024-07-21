//--------------Custom Librarries and Modules---------------------
const { verify } = require("jsonwebtoken");
const {VerifyTokens} = require("../libraries");

// -------------- function to authenticate the user ------------------
const AuthenticateUser = (req, res, next) => {
//--------------------token header---------------
    const TokenHeader = req.headers.token;

    try {
        //------------------validate token header-----------------
        if(TokenHeader){
            const AccessToken = TokenHeader.split("Barer ")[1];
            if(AccessToken){
                const VerifiedToken = VerifyTokens(AccessToken);

                if(VerifiedToken){
                    return res.status(401).json({
                        status:false,
                        error:{
                            message:"Invalid Access Token, Login Again!"
                        }
                    }

                    );
                }
                //-------------------Add user to the request-----------
                req.user = VerifiedToken.tokenDetails;
                return next();
            }

            return res.status(401).json({
                status:false,
                error:{
                    message:"Access token must be properly provide"
                }
            });
        }

        return res.status(401).json({
            status:false,
            error:{
                message:"Token header must be provided"
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:false,
            error:{
                message: "failed to authenticate user due to server error!"
            }
                
        })
    }
}

module.exports = {
    AuthenticateUser,
}