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
    answer,
    deletePost,
    getUserbyPostId,
    likePost,
    likeAnswer,
    likeComment,
    commentPost,
    commentAnswer,
    save,
    report,
    follow,
    likeCountPost,
    likeCountAnswer,
    likeCountComment,
    dislikePost,
    dislikeAnswer,
    dislikeComment,
    ansPerID,
    threadPerID,
    getAnswers,
    unAnsQuest
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
        const postID = req.params.postID;
        likePost(postID, (err, results) =>{
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
        const answerID = req.params.answerID;
        likeAnswer(answerID, (err, results) =>{
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
        const commentID = req.params.commentID;
        likeComment(commentID, (err, results) =>{
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
                message: "Category followed"
            });
        });
    },
    likeCountPost: (req, res) => {
        const postID = req.params.postID;
        likeCountPost(postID, (err, results) => {
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
        const answerID = req.params.answerID;
        likeCountAnswer(answerID, (err, results) => {
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
        const commentID = req.params.comentID;
        likeCountComment(commentID, (err, results) => {
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
        const postID = req.params.postID;
        dislikePost(postID, (err, results) =>{
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
        const answerID = req.params.answerID;
        dislikeAnswer(answerID, (err, results) =>{
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
        const commentID = req.params.commentID;
        dislikeComment(commentID, (err, results) =>{
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
    }
};