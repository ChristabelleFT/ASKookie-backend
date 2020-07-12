const {
     createUser,
     getUserByName,
     getUsers,
     login,
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
     deleteAns,
     deleteComment,
     getUserByPostId,
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
     unAnsQuest,
     getAllComments,
     commentPerPost,
     commentPerAns,
     countPostComment,
     countAnsComment,
     answered_post
} = require("./controller");
const router = require("express").Router();

router.post("/register", createUser);
router.get("/users", getUsers);
router.get("/home", getFeeds);
router.get("/answers", getAnswers);
router.get("/unanswered", unAnsQuest);
router.get("/answered", answered_post);
router.get("/comments", getAllComments);
router.get("/comments/post/:postID", commentPerPost);
router.get("/comments/answer/:answerID", commentPerAns);
router.get("/:username", getUserByName);
router.post("/login", login);
router.get("/feeds/faculties", getFaculties);
router.get("/feeds/accommodation", getAccommodation);
router.get("/feeds/student_life", getStudentLife);
router.get("/feeds/job_intern", getJobIntern);
router.get("/feeds/exchange_noc", getExchangeNoc);
router.get("/feeds/others", getOthers);
router.get("/search/:term", search);
router.post("/ask", ask);
router.post("/answer", answer);
router.delete("/delete/post/:id", deletePost);
router.delete("/delete/answer/:id", deleteAns);
router.delete("/delete/comment/:id", deleteComment);
router.get("/user/:postId", getUserByPostId);
router.post("/like/post", likePost);
router.post("/like/answer", likeAnswer);
router.post("/like/comment", likeComment);
router.post("/dislike/post/:postID", dislikePost);
router.post("/dislike/answer/:answerID", dislikeAnswer);
router.post("/dislike/comment/:commentID", dislikeComment);
router.post("/comment/post", commentPost);
router.post("/comment/answer", commentAnswer);
router.post("/save", save);
router.post("/report", report);
router.post("/follow", follow);
router.get("/like/post/:postID", likeCountPost);
router.get("/like/answer/:answerID", likeCountAnswer);
router.get("/like/comment/:commentID", likeCountComment);
router.get("/answer/:postID",ansPerID);
router.get("/thread/:postID",threadPerID);
router.get("/comments/count/post/:postID", countPostComment);
router.get("/comments/count/answer/:postID", countAnsComment);

module.exports = router;