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
            `UPDATE post_question SET like_count = like_count + 1 WHERE postID = ?;
            INSERT INTO like_table (postID, username) VALUES (?,?)`,
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
    likeAnswer: (data, callBack) => {
        pool.query(
            `UPDATE answer SET like_count2 = like_count2 + 1 WHERE answerID = ?;
            INSERT INTO like_table (postID,answerID, username) VALUES (?,?,?)`,
            [
                data.answerID,
                data.postID,
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
    likeComment: (data, callBack) => {
        pool.query(
            `UPDATE comment_table SET like_count = like_count + 1 WHERE commentID = ?;
            INSERT INTO like_table (postID,answerID,commentID, username) VALUES (?,?,?,?)`,
            [
                data.commentID,
                data.postID,
                data.answerID,
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
            'UPDATE answer SET like_count2 = like_count2 - 1 WHERE answerID = ?',
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
            "SELECT * FROM post_question LEFT OUTER JOIN answer ON post_question.postID = answer.postID2 WHERE answer.postID2 is null AND post_question.type = 1",
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
    countPostComment: (postID, callBack) => {
        pool.query(
           // "SELECT COUNT(commentID) AS count FROM comment_table WHERE postID = ?",
           "SELECT * FROM post_question WHERE postID = ?",
            [postID],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    countAnsComment: (postID, callBack) => {
        pool.query(
            //"SELECT COUNT(commentID) AS count FROM comment_table WHERE answerID = ?",
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
    answered_post: callBack => {
        pool.query(
            `DROP TABLE IF EXISTS feeds;
             DROP TABLE IF EXISTS id;
             DROP TABLE IF EXISTS answered;
             CREATE TEMPORARY TABLE answered (postID int, type int(1), question text, title text, post_content text, 
             asker varchar(25), time date, anonymous boolean, like_count int, comment_count int, answer text, answerer varchar(25), 
             time2 date, anonymous2 boolean, like_count2 int, comment_count2 int);
             CREATE TEMPORARY TABLE feeds SELECT * FROM answered LIMIT 0;
             INSERT INTO feeds SELECT DISTINCT postID, type, question, title, post_content, asker, time, anonymous, like_count, comment_count,
             answer, answerer, time2, anonymous2, like_count2,comment_count2 FROM post_question LEFT JOIN answer ON post_question.postID = answer.postID2 
             WHERE type = 2 OR answer IS NOT NULL;
             CREATE TEMPORARY TABLE id (postID int);
             INSERT INTO id SELECT DISTINCT postID from post_question LEFT JOIN answer ON post_question.postID = answer.postID2 
             WHERE type = 2 OR answer IS NOT NULL;
             SET @length = (SELECT COUNT(*) FROM id);
             DROP PROCEDURE IF EXISTS home;
             DELIMITER ;;
             create procedure home()
             begin
             declare n int default 0;
             declare i int default 0;
             set i = 0;
             set n = @length;
             while i < n do
             select * into @getID from id order by postID limit i,1;
             insert into answered select * from feeds where postID = @getID order by like_count2 desc limit 1;
             set i = i+1;
             end while;
             end;
             ;;
             DELIMITER ;
             CALL home();
             SELECT * FROM answered`,
             [],
             (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    editPost: (data, callBack) => {
        pool.query(
            `UPDATE post_question SET question = IF(category = 1, ?, null) WHERE postID = ?;
             UPDATE post_question SET post_content = IF(category = 2, ?, null) where postID = ?`,
            [
                data.content,
                data.postID,
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
    editAns: (data, callBack) => {
        pool.query(
            'UPDATE answer SET answer = ? WHERE postID = ?',
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
    }
};

