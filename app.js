require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./command/users/router");

app.use(express.json());

app.use("", userRouter);
app.listen(process.env.PORT || '0.0.0.0', () => {
    if(process.env.PORT){
        console.log("Server is running on port: ", process.env.PORT);
    } else {
        console.log("Server is running on port: 0 000");
    }
});