// -------------------- thirdparty libraries and models------
const express = require("express");

// -----------------------custom libraries---------------------
const {
    RegisterNewUser,
} = require("../controllers");

//------------------------------------Initialize the routers
const router = express.Router();

//---------------Routers-----------------
//---------Register New File-------------
router.post("/register", RegisterNewUser);

//export----
module.exports = router;