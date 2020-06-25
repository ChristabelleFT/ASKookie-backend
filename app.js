require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./command/users/router");
const path = require("path");
const {cors, corsConfig} = require("./cors");

app.use(express.json());
app.use(cors(corsConfig));

app.use('', userRouter);

/*
//Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('ASKookie_frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'ASKookie_frontend', 'build', 'index.html'));
    });
}*/

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));