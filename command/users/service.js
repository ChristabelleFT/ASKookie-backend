const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO users(username, password, email) values(?,?,?)',
            [
                data.username,
                data.password,
                data.email
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            'SELECT username FROM users',
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByName: (username, callBack) => {
        pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getFeeds: callBack => {
        pool.query(
            'SELECT * FROM feeds',
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getFaculties: callBack => {
        pool.query(
            "SELECT * FROM feeds WHERE category = 'faculties'",
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAccommodation: callBack => {
        pool.query(
            "SELECT * FROM feeds WHERE category = 'accommodation'",
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getStudentLife: callBack => {
        pool.query(
            "SELECT * FROM feeds WHERE category = 'student_life'",
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getJobIntern: callBack => {
        pool.query(
            "SELECT * FROM feeds WHERE category = 'job_intern'",
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getExchangeNoc: callBack => {
        pool.query(
            "SELECT * FROM feeds WHERE category = 'exchange_noc'",
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOthers: callBack => {
        pool.query(
            "SELECT * FROM feeds WHERE category = 'others'",
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    search: (term, callBack) => {
        pool.query(
            "SELECT * FROM feeds WHERE post LIKE ?",
            [term],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    ask:(data, callBack) => {
        pool.query(
            'INSERT INTO feeds(category, asker, post) values(?,?,?)',
            [
                data.category,
                data.asker,
                data.post
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    answer:(data, callBack) => {
        pool.query(
            'UPDATE feeds SET answerer = ?, answer = ? WHERE postId = ?',
            [
                data.answerer,
                data.answer,
                data.postId
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
