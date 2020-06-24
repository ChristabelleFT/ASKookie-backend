const { 
    create,
    getUsers,
    getUserByName,
    getFeeds,
    getFaculties,
    getAccommodation,
    getStudentLife,
    getJobIntern,
    getExchangeNoc,
    getOthers,
    search,
    ask,
    answer
} = require("./service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);//generate token for password
        body.password = hashSync(body.password, salt);
        //create token for verification
        /*jwt.sign(
            {
                user: body.username,
            },
            body.email,
            {
                expiresIn: '1d',
            },
            (err, emailToken) => {
                const url = `http://localhost:3000/confirmation/${emailToken}`;

                transporter.sendMail({
                    to: args.email,
                    subject: 'ASKookie Email Confirmation',
                    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
                });
            },
        );*/
        create(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    /*confirmation: (req, res) => {
        try {
            const {user:{id}} = jwt.verify(req.params.token, )
        }
    },*/
    getUserByName: (req, res) => {
        const username = req.params.username;
        getUserByName(username, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    message: "Record not found"
                });
            }
            return res.json({
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    login: (req, res) => {
       const body = req.body;
       getUserByName(body.username, (err, results) => {
           if(err) {
               console.log(err);
           }
           if(!results) {
               return res.json({
                   success: 0,
                   data: "Invalid username or password"
               });
           }
           /*if(body.verified == 0) {
               return res.json({
                   success: 1,
                   data: "Email is not verified"
               });
           }*/
           const result = compareSync(body.password, results.password);
           console.log(body.password);
           if(result) {
               results.password = undefined;
               const jsontoken = sign({ result: results }, "qwe1234", {
                   expiresIn: "1h"
               });
               return res.json({
                   success: 2,
                   message: "login successfully",
                   token: jsontoken
               });
           } else {
             return res.json({
                success: 3,
                data: "Invalid username or password"
            });
           }
       });
    },
    getFeeds: (req, res) => {
        getFeeds((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.send({
                data: results
            });
        }); 
    },
    getFaculties: (req, res) => {
        getFaculties((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getAccommodation: (req, res) => {
        getAccommodation((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getStudentLife: (req, res) => {
        getStudentLife((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getJobIntern: (req, res) => {
        getJobIntern((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getExchangeNoc: (req, res) => {
        getExchangeNoc((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getOthers: (req, res) => {
        getOthers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    search: (req, res) => {
        const term = req.params.term;
        search(term, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    message: "Record not found"
                });
            }
            return res.json({
                data: results
            });
        });
    },
    ask: (req, res) => {
        const body = req.body;
        ask(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Post added"
            });
        });
    },
    answer: (req, res) => {
        const body = req.body;
        answer(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Answer added"
            });
        });
    }
};