// -------------------- thirdparty libraries and models------
const express = require("express");

// -----------------------custom libraries---------------------
const {
    RegisterNewUser,
    LoginUser,
    GetAllUsers,
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

//export----
module.exports = router;