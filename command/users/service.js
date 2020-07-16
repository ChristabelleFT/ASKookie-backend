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
            `DELIMITER ;;
             CALL temp_table();;
             CALL home();;
             DELIMITER ;`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                 pool.query(
                    "SELECT * FROM answered WHERE category = 1",
                    [],
                    (error, results, fields) => {
                        if(error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    getAccommodation: callBack => {
        pool.query(
            `DELIMITER ;;
             CALL temp_table();;
             CALL home();;
             DELIMITER ;`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                 pool.query(
                    "SELECT * FROM answered WHERE category = 2",
                    [],
                    (error, results, fields) => {
                        if(error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    getStudentLife: callBack => {
        pool.query(
            `DELIMITER ;;
             CALL temp_table();;
             CALL home();;
             DELIMITER ;`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                 pool.query(
                    "SELECT * FROM answered WHERE category = 3",
                    [],
                    (error, results, fields) => {
                        if(error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    getJobIntern: callBack => {
        pool.query(
            `DELIMITER ;;
             CALL temp_table();;
             CALL home();;
             DELIMITER ;`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                 pool.query(
                    "SELECT * FROM answered WHERE category = 4",
                    [],
                    (error, results, fields) => {
                        if(error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    getExchangeNoc: callBack => {
        pool.query(
            `DELIMITER ;;
             CALL temp_table();;
             CALL home();;
             DELIMITER ;`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                 pool.query(
                    "SELECT * FROM answered WHERE category = 5",
                    [],
                    (error, results, fields) => {
                        if(error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    getOthers: callBack => {
        pool.query(
            `DELIMITER ;;
             CALL temp_table();;
             CALL home();;
             DELIMITER ;`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                 pool.query(
                    "SELECT * FROM answered WHERE category = 6",
                    [],
                    (error, results, fields) => {
                        if(error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    search: (term, callBack) => {
        const query = `SELECT * FROM post_question WHERE post_content LIKE '%` + term + `%' UNION ALL SELECT * FROM post_question WHERE title LIKE '%` + term + `%' UNION ALL SELECT * FROM post_question WHERE question LIKE '%` + term + `%';`;
        pool.query(
      query, (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    ask:(data, callBack) => {
        pool.query(
            'INSERT INTO post_question(question, title, post_content, type_post, asker, time, category,anonymous) values(?,?,?,?,?,?,?,?)',
            [
                data.question,
                data.title,
                data.post_content,
                data.type_post,
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
            `INSERT INTO answer (postID2, answer, answerer, time2, anonymous2) VALUES (?,?,?,?,?)`,
            [
                data.postID2,
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
    deleteAns: (answerID, callBack) => {
        pool.query(
            'DELETE FROM answer WHERE answerID = ?',
            [answerID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteComment: (id, callBack) => {
        pool.query(
            'DELETE FROM comment_table WHERE commentID = ?',
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
    likePost: (data, callBack) => {
        pool.query(
            `set @bool := not exists(select * from like_table where username = ? and postID = ?);
            update post_question set like_count = like_count + 1 where postID = ? and @bool;
            insert into like_table(username, postID) values (?,?) on duplicate key update postID = postID`,
            [
                data.username,
                data.postID,
                data.postID,
                data.username,
                data.postID
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    likeAnswer: (data, callBack) => {
        pool.query(
            `set @bool := not exists(select * from like_table where username = ? and answerID = ?);
            update answer set like_count2 = like_count2 + 1 where answerID = ? and @bool;
            insert into like_table(username, postID, answerID) values (?,?,?) on duplicate key update answerID = answerID`,
            [
                data.username,
                data.answerID,
                data.answerID,
                data.username,
                data.postID,
                data.answerID
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    likeComment: (data, callBack) => {
        pool.query(
            `insert into like_table(username, postID, answerID, commentID) values (?,?,?,?) on duplicate key update answerID = answerID`,
            [
                data.username,
                data.postID,
                data.answerID,
                data.commentID,
            ],
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
              INSERT INTO comment_table (commentID, postID, username, comment, time, anonymous) VALUES (@next_id,?,?,?,?,?);
              UPDATE post_question SET comment_count = comment_count + 1 WHERE postID = ?`,
            [
                data.postID,
                data.postID,
                data.postID,
                data.username,
                data.comment,
                data.time,
                data.anonymous,
                data.postID
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
              INSERT INTO comment_table (commentID, postID, answerID, username, comment, time, anonymous) VALUES (@next_id,?,?,?,?,?,?);
              UPDATE answer SET comment_count2 = comment_count2 + 1 WHERE answerID = ?`,
            [
                data.answerID,
                data.answerID,
                data.postID,
                data.answerID,
                data.username,
                data.comment,
                data.time,
                data.anonymous,
                data.answerID
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
            'SELECT like_count2 FROM answer WHERE answerID = ?',
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
    dislikePost: (data, callBack) => {
        pool.query(
            `UPDATE post_question SET like_count = like_count - 1 WHERE postID = ?;
             DELETE FROM like_table WHERE postID = ? AND username = ?`,
            [
                data.postID,
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
    dislikeAnswer: (data, callBack) => {
        pool.query(
            `UPDATE answer SET like_count2 = like_count2 - 1 WHERE answerID = ?;
             DELETE FROM like_table WHERE answerID = ? AND username = ?`,
            [
                data.answerID,
                data.answerID,
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
    dislikeComment: (data, callBack) => {
        pool.query(
            `UPDATE comment_table SET like_count = like_count - 1 WHERE commentID = ?;
             DELETE FROM like_table WHERE commentID = ? AND username = ?`,
            [
                data.commentID,
                data.commentID,
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
    ansPerID: (postID, callBack) => {
        pool.query(
            "SELECT * FROM answer WHERE postID2 = ?",
            [postID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    threadPerID: (postID, callBack) => {
        pool.query(
            "SELECT * FROM post_question WHERE postID = ?",
            [postID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getAnswers: callBack => {
        pool.query(
            'SELECT * FROM answer',
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    unAnsQuest: callBack => {
        pool.query(
            "SELECT * FROM post_question LEFT OUTER JOIN answer ON post_question.postID = answer.postID2 WHERE answer.postID2 is null AND post_question.type_post = 1",
            [],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllComments: callBack => {
        pool.query(
            'SELECT * FROM comment_table',
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    commentPerPost: (postID, callBack) => {
        pool.query(
            "SELECT * FROM comment_table WHERE postID = ?",
            [postID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    commentPerAns: (answerID, callBack) => {
        pool.query(
            "SELECT * FROM comment_table WHERE answerID = ?",
            [answerID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    countPostComment: (name, id, callBack) => {
        pool.query( "call hasLiked(?,?)",
           // "SELECT COUNT(commentID) AS count FROM comment_table WHERE postID = ?",
           //`select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, username,
            //hasLiked from post_question left join like_table on post_question.postID = like_table.postID where post_question.postID = ?`,
           // username = ? and 
            [
                name,
                id
            ],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    countAnsComment: (id, name, callBack) => {
        pool.query("call hasLikedAns(?,?)",
            //"SELECT COUNT(commentID) AS count FROM comment_table WHERE answerID = ?",
            //`select answer.answerID, postID2, answer, answerer, time2, anonymous2, like_count2, comment_count2, username, hasLiked
             //from answer left join like_table on answer.answerID = like_table.answerID where postID2 = ?`,
             // username = ? and 
            [
                name,
                id
            ],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    answered_post: callBack => {
        pool.query(
            `CALL temp_table();
             CALL home();
             SELECT * from answered`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                //  pool.query(
                //     "SELECT * FROM answered",
                //     [],
                //     (error, results, fields) => {
                //         if(error) {
                //             callBack(error);
                //         }
                //         return callBack(null, results);
                //     }
                // );
                return callBack(null, results[2]);
            }
        );
        // pool.query(
        //     "SELECT * FROM answered",
        //     [],
        //     (error, results, fields) => {
        //         if(error) {
        //             callBack(error);
        //         }
        //         return callBack(null, results);
        //     }
        // );
    },
    editPost: (data, callBack) => {
        pool.query(
            `UPDATE post_question SET post_content = ? WHERE postID = ?`,
            [
                data.post_content,
                data.postID,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    editQuestion: (data, callBack) => {
        pool.query(
            `UPDATE post_question SET question = ? WHERE postID = ?`,
            [
                data.question,
                data.postID
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    editAns: (data, callBack) => {
        pool.query(
            'UPDATE answer SET answer = ? WHERE answerID = ?',
            [
                data.content,
                data.answerID
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    editComment: (data, callBack) => {
        pool.query(
            'UPDATE comment_table SET comment = ? WHERE postID = ?',
            [
                data.content,
                data.postID
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    hasSave: (id, name, callBack) => {
        pool.query(
            `SELECT hasSave FROM save WHERE postID = ? AND username = ?`,
            [
                id,
                name
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    unsave: (data, callBack) => {
        pool.query(
            `DELETE FROM save WHERE postID = ? AND username = ?`,
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
    getSave: (name, callBack) => {
        pool.query(
            `SELECT * FROM save WHERE username = ?`,
            [name],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};

