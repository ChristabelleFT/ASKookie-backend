require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./command/users/router");

app.use(express.json());

app.use("", userRouter);
app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port: ", process.env.APP_PORT);
});