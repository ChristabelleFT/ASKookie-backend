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
    deletePost,
    deleteAns,
    deleteComment,
    getUserbyPostId,
    likePost,
    likeAnswer,
    likeComment,
    commentPost,
    commentAnswer,
    save,
    report,
    follow,
    unfollow,
    likeCountPost,
    likeCountAnswer,
    likeCountComment,
    dislikePost,
    dislikeAnswer,
    dislikeComment,
    ansPerID,
    threadPerID,
    getAnswers,
    unAnsQuest,
    getAllComments,
    commentPerPost,
    commentPerAns,
    countPostComment,
    countAnsComment,
    answered_post,
    editPost,
    editQuestion,
    editAns,
    editComment,
    unsave,
    getSave,
    hasLikedPost,
    hasSave,
    hasFollow,
    hasLikedAns,
    getFollow,
    confirmation,
    getNotification,
    getMyPost,
    readNotif
} = require("./service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
require("dotenv").config();
const log = console.log;
const emailTemplate = __dirname;

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const user = body.username;
        const salt = genSaltSync(10);//generate token for password
        body.password = hashSync(body.password, salt);
       // let nodemail = require("./emailer");
        
        const file = fs.readFileSync(
            emailTemplate + '//confirmEmail.ejs', 'ascii'
        );

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const payload = {
            user: body.username,
            email: body.email,
        }
        const token = sign(
                        payload,
                        "askookie",
                        {
                            expiresIn: '1d',
                        },
                    );
        const verifURL = `https://whispering-hamlet-08619.herokuapp.com/confirmation/` + token;
        const emailOption = {
            from: 'askookieforum@gmail.com',
            to: body.email,
            subject: 'ASKookie Email Confirmation',
            text: 'Thankyou for registering to ASKookie!',
            html: ejs.render(file, {user, verifURL}),
        };
    
        transporter.sendMail(emailOption, (err, data) => {
            if(err) {
                return log('error in sending email', err);
            }
            console.log(user);
            console.log(token);
            return log('email sent');
        });

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
    confirmation: (req, res) => {
        const token = req.params.token;
        const decoded = verify(token, "askookie");
        const username = decoded.user;
        confirmation(username, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.redirect('https://askookie.netlify.app/signinform');
        });
    },
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
                   data: "Invalid username"
               });
           }
           const result = compareSync(body.password, results.password);
           if(result) {
                if(results.verified != 1) {
                    return res.json({
                        success: 1,
                        data: "Email is not verified"
                    });
                }
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
                data: "Invalid password"
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
    deletePost: (req, res) => {
        const id = req.params.id;
        deletePost(id, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Post deleted"
            });
        });
    },
    deleteAns: (req, res) => {
        const answerID = req.params.answerID;
        deleteAns(answerID, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Answer deleted"
            });
        });
    },
    deleteComment: (req, res) => {
        const id = req.params.id;
        deleteComment(id, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Comment deleted"
            });
        });
    },
    getUserByPostId: (req, res) => {
        const postId = req.params.postId;
        getUserbyPostId(postId, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    likePost: (req, res) => {
        const body = req.body;
        likePost(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Post liked"
            });
        });
    },
    likeAnswer: (req, res) => {
        const body = req.body;
        likeAnswer(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Answer liked"
            });
        });
    },
    likeComment: (req, res) => {
        const body = req.body;
        likeComment(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Comment liked"
            });
        });
    },
    commentPost: (req, res) => {
        const body = req.body;
        commentPost(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Comment added"
            });
        });
    },
    commentAnswer: (req, res) => {
        const body = req.body;
        commentAnswer(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Comment added"
            });
        });
    },
    save: (req, res) => {
        const body = req.body;
        save(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Thread saved"
            });
        });
    },
    report: (req, res) => {
        const body = req.body;
        report(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Thread reported"
            });
        });
    },
    follow: (req, res) => {
        const body = req.body;
        follow(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Thread followed"
            });
        });
    },
    unfollow: (req, res) => {
        const body = req.body;
        unfollow(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Thread unfollowed"
            });
        });
    },
    getFollow: (req, res) => {
        const username = req.params.username;
        getFollow(username, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
            });
        });
    },
    likeCountPost: (req, res) => {
        const body = req.body;
        likeCountPost(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    likeCountAnswer: (req, res) => {
        const body = req.body;
        likeCountAnswer(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    likeCountComment: (req, res) => {
        const body = req.body;
        likeCountComment(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    dislikePost: (req, res) => {
        const body = req.body;
        dislikePost(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Post disliked"
            });
        });
    },
    dislikeAnswer: (req, res) => {
        const body = req.body;
        dislikeAnswer(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Answer disliked"
            });
        });
    },
    dislikeComment: (req, res) => {
        const body = req.body;
        dislikeComment(body, (err, results) =>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results,
                message: "Comment disliked"
            });
        });
    },
    ansPerID: (req, res) => {
        const postID = req.params.postID;
        ansPerID(postID, (err, results) => {
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
    threadPerID: (req, res) => {
        const postID = req.params.postID;
        threadPerID(postID, (err, results) => {
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
    getAnswers: (req, res) => {
        getAnswers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.send({
                data: results
            });
        }); 
    },
    unAnsQuest: (req, res) => {
        unAnsQuest((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.send({
                data: results
            });
        }); 
    },
    getAllComments: (req, res) => {
        getAllComments((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.send({
                data: results
            });
        }); 
    },
    commentPerPost: (req, res) => {
        const postID = req.params.postID;
        commentPerPost(postID, (err, results) => {
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
    commentPerAns: (req, res) => {
        const answerID = req.params.answerID;
        commentPerAns(answerID, (err, results) => {
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
    countPostComment: (req, res) => {
        const id = req.params.id;
        const name = req.params.name;
        countPostComment(name, id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    message: "Record not found"
                });
            }
            //console.log(results[0].hasSave);
             return res.json({
                 data: results,
             });
        });
    },
    countAnsComment: (req, res) => {
        const id = req.params.id;
        const name = req.params.name;
        countAnsComment(id, name, (err, results) => {
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
    answered_post: (req, res) => {
        answered_post((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.send({
                data: results
            });
        }); 
    },
    editPost: (req, res) => {
        const body = req.body;
        editPost(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    editQuestion: (req, res) => {
        const body = req.body;
        editQuestion(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    editAns: (req, res) => {
        const body = req.body;
        editAns(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    editComment: (req, res) => {
        const body = req.body;
        editComment(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    unsave: (req, res) => {
        const body = req.body;
        unsave(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getSave: (req, res) => {
        const name = req.params.name;
        getSave(name, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    hasLikedPost: (req, res) => {
        const id = req.params.id;
        const name = req.params.name;
        hasLikedPost(id, name,(err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    hasSave: (req, res) => {
        const id = req.params.id;
        const name = req.params.name;
        hasSave(id, name,(err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    hasFollow: (req, res) => {
        const id = req.params.id;
        const name = req.params.name;
        hasFollow(id, name,(err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    hasLikedAns: (req, res) => {
        const id = req.params.id;
        const name = req.params.name;
        hasLikedAns(id, name,(err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getNotification: (req, res) => {
        const username = req.params.username;
        getNotification(username, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    getMyPost: (req, res) => {
        const username = req.params.username;
        getMyPost(username, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    readNotif: (req, res) => {
        const notificationID = req.params.notifID;
        readNotif(notificationID, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    }
};