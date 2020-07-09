const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO user(username, password, email) values(?,?,?)',
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
            'SELECT username FROM user',
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
            'SELECT * FROM user WHERE username = ?',
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
            'SELECT * FROM post_question',
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
            "SELECT * FROM post_question WHERE category = 1",
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
            "SELECT * FROM post_question WHERE category = 2",
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
            "SELECT * FROM post_question WHERE category = 3",
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
            "SELECT * FROM post_question WHERE category = 4",
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
            "SELECT * FROM post_question WHERE category = 5",
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
            "SELECT * FROM post_question WHERE category = 6",
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
            "SELECT * FROM post_question WHERE post_content LIKE ?",
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
            'INSERT INTO post_question(question, title, post_content, type, asker, time, category,anonymous) values(?,?,?,?,?,?,?,?)',
            [
                data.question,
                data.title,
                data.post_content,
                data.type,
                data.asker,
                data.time,
                data.category,
                data.anonymous
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
            `SELECT @last_id := answerID from answer where postID = ? order by answerID desc limit 1;
             SELECT @next_id := IFNULL(@last_id + 1, concat(?,0));
              INSERT INTO answer (answerID, postID, answer, answerer, time, anonymous) VALUES (@next_id,?,?,?,?,?)`,
            [
                data.postID,
                data.postID,
                data.postID,
                data.answer,
                data.answerer,
                data.time,
                data.anonymous
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deletePost: (id, callBack) => {
        pool.query(
            'DELETE FROM post_question WHERE postID = ?',
            [ id ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserbyPostId: (postId, callBack) => {
        pool.query(
            'SELECT asker FROM post_question WHERE postID = ?',
            [postId],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    likePost: (postID, callBack) => {
        pool.query(
            'UPDATE post_question SET like_count = like_count + 1 WHERE postID = ?',
            [postID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    likeAnswer: (answerID, callBack) => {
        pool.query(
            'UPDATE answer SET like_count = like_count + 1 WHERE answerID = ?',
            [answerID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    likeComment: (commentID, callBack) => {
        pool.query(
            'UPDATE comment_table SET like_count = like_count + 1 WHERE commentID = ?',
            [commentID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    commentPost:(data, callBack) => {
        pool.query(
            `SELECT @last_id := commentID from comment_table where postID = ? order by commentID desc limit 1;
             SELECT @next_id := IFNULL(@last_id + 1, concat(?,0));
              INSERT INTO comment_table (commentID, postID, username, comment, time, anonymous) VALUES (@next_id,?,?,?,?,?)`,
            [
                data.postID,
                data.postID,
                data.postID,
                data.username,
                data.comment,
                data.time,
                data.anonymous
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    commentAnswer:(data, callBack) => {
        pool.query(
            `SELECT @last_id := commentID from comment_table where answerID = ? order by commentID desc limit 1;
             SELECT @next_id := IFNULL(@last_id + 1, concat(?,0));
              INSERT INTO comment_table (commentID, answerID, username, comment, time, anonymous) VALUES (@next_id,?,?,?,?,?)`,
            [
                data.answerID,
                data.answerID,
                data.answerID,
                data.username,
                data.comment,
                data.time,
                data.anonymous
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    save:(data, callBack) => {
        pool.query(
            'INSERT INTO save (postID, username) VALUES (?,?)',
            [
                data.postID,
                data.username
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    report:(data, callBack) => {
        pool.query(
            'INSERT INTO report_table (postID, username, type) VALUES (?,?,?)',
            [
                data.postID,
                data.username,
                data.type
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    follow:(data, callBack) => {
        pool.query(
            'INSERT INTO follow (username, categoryID) VALUES (?,?)',
            [
                data.username,
                data.categoryID
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    likeCountPost:(postID, callBack) => {
        pool.query(
            'SELECT like_count FROM post_question WHERE postID = ?',
            [postID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    likeCountAnswer:(answerID, callBack) => {
        pool.query(
            'SELECT like_count FROM answer WHERE answerID = ?',
            [answerID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    likeCountComment:(commentID, callBack) => {
        pool.query(
            'SELECT like_count FROM post_question WHERE commentID = ?',
            [commentID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    dislikePost: (postID, callBack) => {
        pool.query(
            'UPDATE post_question SET like_count = like_count - 1 WHERE postID = ?',
            [postID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    dislikeAnswer: (answerID, callBack) => {
        pool.query(
            'UPDATE answer SET like_count = like_count - 1 WHERE answerID = ?',
            [answerID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    dislikeComment: (commentID, callBack) => {
        pool.query(
            'UPDATE comment_table SET like_count = like_count - 1 WHERE commentID = ?',
            [commentID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    ansPerID: (postID, callBack) => {
        pool.query(
            "SELECT * FROM answer WHERE postID = ?",
            [postID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
