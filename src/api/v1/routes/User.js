// -------------------- thirdparty libraries and models------
const express = require("express");

// -----------------------custom libraries---------------------
const {
    RegisterNewUser,
    LoginUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
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

//-------update user details---
router.put("/update/:UserId" , UpdateUser);

//-----delete user----
router.delete("/delete/:UserId", DeleteUser);

//export----
module.exports = router;