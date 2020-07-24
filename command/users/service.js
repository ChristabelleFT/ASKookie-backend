const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO user(username, password, email) values(?,?,?);
             CALL member(?);`,
            [
                data.username,
                data.password,
                data.email,
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
    confirmation:(username, callBack) => {
        pool.query(
            'UPDATE user SET verified = 1 WHERE username = ?',
            [username],
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
            'SELECT * FROM user WHERE BINARY username = BINARY ?',
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
    answer:(data, url, callBack) => {
        pool.query(
            `INSERT INTO answer (postID2, answer, image, answerer, time2, anonymous2) VALUES (?,?,?,?,?,?)`,
            [
                data.postID2,
                data.answer,
                url,
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
            `call delete_comment(?)`,
            [id],
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
            `INSERT INTO comment_table (postID, username, comment, time, anonymous) VALUES (?,?,?,?,?);
              UPDATE post_question SET comment_count = comment_count + 1 WHERE postID = ?`,
            [
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
            `INSERT INTO comment_table (postID, answerID, username, comment, time, anonymous) VALUES (?,?,?,?,?,?);
              UPDATE answer SET comment_count2 = comment_count2 + 1 WHERE answerID = ?`,
            [
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
            'INSERT INTO save (postID, username) VALUES (?,?) on duplicate key update postID = postID',
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
            'INSERT INTO follow_table (username, postID) VALUES (?,?) on duplicate key update postID = postID',
            [
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
    getFollow: (username, callBack) => {
        pool.query(
            `SELECT follow_table.postID, post_question.question, post_question.title, post_question.post_content
             FROM follow_table LEFT JOIN post_question ON follow_table.postID = post_question.postID where follow_table.username = ?`,
             [username],
             (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    unfollow:(data, callBack) => {
        pool.query(
            'DELETE FROM follow_table WHERE username = ? AND postID = ?',
            [
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
                return callBack(null, results[2]);
            }
        );
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
            'UPDATE comment_table SET comment = ? WHERE commentID = ?',
            [
                data.content,
                data.commentID
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
            `SELECT post_question.postID, post_content, title, question, username FROM save LEFT JOIN post_question ON save.postID = post_question.postID WHERE username = ?`,
            [name],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    hasLikedPost: (id,name, callBack) => {
        pool.query(
            `SELECT EXISTS (SELECT * FROM like_table WHERE postID = ? AND username = ? AND ISNULL(answerID)) AS hasLiked`,
            [id, name],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    hasSave: (id,name, callBack) => {
        pool.query(
            `SELECT EXISTS (SELECT * FROM save WHERE postID = ? AND username = ?) AS hasSave`,
            [id, name],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    hasFollow: (id,name, callBack) => {
        pool.query(
            `SELECT EXISTS (SELECT * FROM follow_table WHERE postID = ? AND username = ?) AS hasFollow`,
            [id, name],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    hasLikedAns: (id,name, callBack) => {
        pool.query(
            `SELECT EXISTS (SELECT * FROM like_table WHERE answerID = ? AND username = ?) AS hasLikedAns`,
            [id, name],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    uploadProfiles: (username, url, callBack) => {
        pool.query(
            `UPDATE user SET profile_picture = ? WHERE username = ?`,
            [url, username],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};

