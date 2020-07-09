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
     getAnswers
} = require("./controller");
const router = require("express").Router();

router.post("/register", createUser);
router.get("/users", getUsers);
router.get("/home", getFeeds);
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
router.delete("/delete/:id", deletePost);
router.get("/user/:postId", getUserByPostId);
router.post("/like/post/:postID", likePost);
router.post("/like/answer/:answerID", likeAnswer);
router.post("/like/comment/:commentID", likeComment);
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
router.get("/answers",getAnswers);

module.exports = router;