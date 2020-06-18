const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');

app.use(router);
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({//mysql.createPool
    //connectionLimit: ...,
    //properties
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'posts'
});

connection.connect(function(error) {
    //callback
    if(!!error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }
});

//account
let account = null;

//home page
router.get('/', function(req, res) {
    //about mysql
    /*connection.getConnection(function(error, tempCont) {
        if(!!error) {
            tempCont.release();
            console.log('Error in the query');
        } else {
            console.log('Connected');
            tempCont.query("SELECT * FROM feeds", function(error, rows, field) {
                tempCont.release();
                if(!!error) {
                     console.log('Error in the query');
                } else {
                    resp.json(rows);
                }
            })
        }
    });*/
    connection.query("SELECT * FROM feeds", function(error, rows, field) {
        //callback
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            var rows = rows;
            res.send(rows);
            //parse with your rows/fields
        }
    });
});

//register
router.post('/register', async(req, res) => {
    try {
        res.render('./frontend/src/components/Sign_in.js');
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        connection.query("INSERT INTO users VALUES (req.body.username, hashedPassword)", (errors, rows, field) => {
            if(!!error) {
                console.log('Error in the query');
            } else {
                console.log('Successful query');
                console.log(rows);
            }
        });
        res.render('/login');
    } catch {
        res.redirect('/register');
    }
});

//login
//router.post('/login')


//faculties category
router.get('/category/modules', (req, res) => {
    connection.query("SELECT * FROM feeds WHERE category LIKE 'modules'", (error, rows, field) => {//change to faculties
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            res.send(rows);
            //res.render('Orbital/frontend/src/components/Sign_in.js');
            //parse with your rows/fields
        }
    });
});

//accomodation category
router.get('/category/accomodation', (req, res) => {
    connection.query("SELECT * FROM feeds WHERE category LIKE 'accomodation'", (error, rows, field) => {
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            res.send(rows);
            //parse with your rows/fields
        }
    });
});

//student_life category
router.get('/category/student_life', (req, res) => {
    connection.query("SELECT * FROM feeds WHERE category LIKE 'student_life'", (error, rows, field) => {
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            res.send(rows);
            //parse with your rows/fields
        }
    });
});

//job/internship category
router.get('/category/career', (req, res) => {
    connection.query("SELECT * FROM feeds WHERE category LIKE 'career'", (error, rows, field) => {//change to job_internship
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            res.send(rows);
            //parse with your rows/fields
        }
    });
});

//exchange/NOC category
router.get('/category/exchange', (req, res) => {
    connection.query("SELECT * FROM feeds WHERE category LIKE 'exchange'", (error, rows, field) => {//change to exchange_noc
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            res.send(rows);
            //parse with your rows/fields
        }
    });
});

//others category
router.get('/category/others', (req, res) => {
    connection.query("SELECT * FROM feeds WHERE category LIKE 'others'", (error, rows, field) => {//change to exchange_noc
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            res.send(rows);
            //parse with your rows/fields
        }
    });
});

//add question
router.post('/ask', (req, res) => {
    let  { category, askerID, post } = req.body;
    let errors = [];
    
    //validate input
    if(!category) {
        errors.push({ text: 'Please choose a category'});
    }
    if(!post) {
        errors.push({ text: 'Please write a post'});
    }

    //insert into table
    if(error.length > 0) {
        res.render('/ask', {
            errors
        });
    } else {
    connection.query("INSERT INTO feeds (category, asker, post) VALUES (category, asker, post)");
    res.send('Post added');
    }
});

//add answer
router.post('/answer', (req, res) => {
    let  { postID, answererId, ans } = req.body;
    let errors = [];
    
    //validate input
    if(!answer) {
        errors.push({ text: 'Please write an answer'});
    }
   
    //insert into table
    if(error.length > 0) {
        res.render('/answer', {
            errors
        });
    } else {
    connection.query("UPDATE feeds SET answerer = answererId, answer = ans WHERE postId = postID");
    res.send('Answer added');
   // res.render('/home');
    }
});

//search bar
router.get('/search/:term', (req, res) => {
    const { term } = req.query;
    connection.query("SELECT * FROM feeds WHERE post LIKE '%' + term + '%'", (error, rows, field) => {
        if(!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(rows);
            res.send(rows);
        }
    });
});

//port connection
const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Listening on port ${port}...'));