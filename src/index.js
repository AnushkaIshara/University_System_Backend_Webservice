//-----------------Thirdparty Libraries and Modules----------------
const express = require("express");
require("dotenv/config");

//-----------------Custom Libraries and Modules--------
const config = require("./configurations");
const {ConnectDatabase} = require("./api/v1/libraries");
const {
    UserRoutes,
} = require("./api/v1/routes");

//-----------------Global Instance --------------
const app = express();
const PORT = config.PORT || 3308;

//-----------------Base Routes--------------------
app.get("/", (request, response) => {
    response.status(200).json({
        status: true,
        message: "Welcome to the server!"
    });
});

// -------------------User Route-----------------
app.use("/api/users" , UserRoutes);
 

//-----------------Error Route----------------
app.use((Request , Response) => {
    response.status(404).json({
        status:false,
        message:"Not Found!"
    });
});

//-----------------Initialize Connections-------
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port`);
    ConnectDatabase()
        .then(() => console.log("Connected to Database"))
        .catch((err) => console.log(err));
}); 

