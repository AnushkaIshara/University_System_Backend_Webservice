// -------------------- thirdparty libraries and models------
const express = require("express");

// -----------------------custom libraries---------------------
const {
    RegisterNewUser,
    LoginUser,
    GetAllUsers,
    GetUserById,
} = require("../controllers");

//------------------------------------Initialize the routers
const router = express.Router();

//---------------Routers-----------------
//---------Register New File-------------
router.post("/register", RegisterNewUser);


// ----- login Route -----
router.post("/login" , LoginUser)

// -------Get All users Route----
router.get("/all", GetAllUsers);

//------Get user by ID----
router.get("/one/:UserId", GetUserById);

//export----
module.exports = router;