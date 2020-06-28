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
     getUserByPostId
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
router.delete("/delete", deletePost);
router.get("/user/:postId");

module.exports = router;