// -------------------- thirdparty libraries and models------
const express = require("express");

// -----------------------custom libraries---------------------
const {
    RegisterNewUser,
    LoginUser,
} = require("../controllers");

//------------------------------------Initialize the routers
const router = express.Router();

//---------------Routers-----------------
//---------Register New File-------------
router.post("/register", RegisterNewUser);


// ----- login Route -----
router.post("/login" , LoginUser)
//export----
module.exports = router;