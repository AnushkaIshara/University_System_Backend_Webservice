//-----------------Thirdparty Libraries and Modules----------------
const mongoose = require("mongoose");

//----------------Custom Libraries and modules -------------
const config = require("../../../configurations");

//---------------------------Functionto initialize the mongodb connection -----------
const ConnectDatabase = async() => {
    return await mongoose.connect(config.MONGO_DB_URL);
};


module.exports = {ConnectDatabase};