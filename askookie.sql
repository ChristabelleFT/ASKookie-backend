-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2020 at 09:19 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `askookie`
--

DELIMITER $$
--
-- Procedures
--
CREATE PROCEDURE `delete_comment` (IN `id` INT(12))  begin
select @postid := postID from comment_table where commentID = id;
select @answerid := answerID from comment_table where commentID = id;
if isnull(@answerid) then update post_question set comment_count = comment_count - 1 where postID = @postid;
else update answer set comment_count2 = comment_count2 - 1 where answerID = @answerid;
end if;
delete from comment_table where commentID = id;
end$$

CREATE PROCEDURE `hasLiked` (IN `name` VARCHAR(25), IN `id` INT(10))  begin
if exists (select * from like_table where like_table.username = name and like_table.postID = id) then
    if exists (select * from save where save.username = name and save.postID = id) then
            if exists (select * from follow_table where follow_table.username = name and follow_table.postID = id) then
                select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, like_table.hasLiked, 
                save.hasSave, follow_table.hasFollow, save.username, like_table.answerID, like_table.commentID from post_question left join like_table 
                on post_question.postID = like_table.postID left join save on post_question.postID = save.postID left join follow_table on post_question.postID = follow_table.postID
                where post_question.postID = id;
            else
                select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, like_table.hasLiked, 
                save.hasSave, post_question.hasFollow, save.username, like_table.answerID, like_table.commentID from post_question left join like_table 
                on post_question.postID = like_table.postID left join save on post_question.postID = save.postID where post_question.postID = id;
            end if;
    elseif exists (select * from follow_table where follow_table.username = name and follow_table.postID = id) then
        select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, like_table.hasLiked, 
        post_question.hasSave, follow_table.hasFollow, follow_table.username, like_table.answerID, like_table.commentID from post_question left join like_table 
        on post_question.postID = like_table.postID left join follow_table on post_question.postID = follow_table.postID where post_question.postID = id;
    else 
        select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, like_table.hasLiked, 
        post_question.hasSave, post_question.hasFollow, like_table.username, like_table.answerID, like_table.commentID from post_question left join like_table 
        on post_question.postID = like_table.postID where post_question.postID = id;
    end if;
elseif exists (select * from save where save.username = name and save.postID = id) then 
    if exists (select * from follow_table where follow_table.username = name and follow_table.postID = id) then
        select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, post_question.hasLiked,
        save.hasSave, follow_table.hasFollow, save.username from post_question left join save on post_question.postID = save.postID left join follow_table on
        post_question.postID = follow_table.postID where post_question.postID = id;
    else
        select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, post_question.hasLiked, 
        save.hasSave, post_question.hasFollow, save.username from post_question left join save on post_question.postID = save.postID where post_question.postID = id;
    end if;
elseif exists (select * from follow_table where follow_table.username = name and follow_table.postID = id) then
    select post_question.postID, question, title, post_content, type_post, asker, time, category, anonymous, like_count, comment_count, post_question.hasLiked, 
    post_question.hasSave, follow_table.hasFollow, follow_table.username from post_question left join follow_table on post_question.postID = follow_table.postID 
    where post_question.postID = id;
else
    select * from post_question where postID = id;
end if;
end$$

CREATE PROCEDURE `hasLikedAns` (IN `name` VARCHAR(25), IN `id` INT(10))  begin
if exists (select * from like_table where like_table.username = name and like_table.postID = id) then select * from answer left join like_table on answer.answerID = like_table.answerID where postID2 = id;
else
select * from answer where postID2 = id;
end if;
end$$

CREATE PROCEDURE `home` ()  begin
             declare n int default 0;
             declare i int default 0;
             set i = 0;
             set n = @length;
             while i < n do
             select * into @getID from id order by postID limit i,1;
             insert into answered select * from feeds where postID = @getID order by like_count2 desc limit 1;
             set i = i+1;
             end while;
             end$$

CREATE PROCEDURE `member` (IN `email` VARCHAR(50))  begin
if email like '%u.nus.edu' then update user set member_type = 2 where user.email = email;
elseif email like 'christabelle.ft@gmail.com' or email like 'michela.vieri.hp@gmail.com' then update user set member_type = 1 where user.email = email;
else update user set member_type = 3 where user.email = email;
end if;
end$$

CREATE PROCEDURE `notif` (IN `id` INT(10), IN `type` INT(1))  begin
declare x int;
set x = 0;
while exists(select username from follow_table where postID = id limit x,1) do
select @name:=username from follow_table where postID = id limit x,1;
select @asker:=asker from post_question where postID = id;
insert into notification (username, postID, asker, type) values (@name, id, @asker,type);
set x = x+1;
end while;
end$$

CREATE PROCEDURE `temp_table` ()  BEGIN
DROP TABLE IF EXISTS feeds;
             DROP TABLE IF EXISTS id;
             DROP TABLE IF EXISTS answered;
             CREATE TABLE answered (postID int, type_post int(1), category varchar(20), question text, title text, post_content text, 
             asker varchar(25), time varchar(10), anonymous boolean, like_count int, comment_count int,answerID int(11), answer text, image text, publicID text, answerer varchar(25), 
             time2 varchar(10), anonymous2 boolean, like_count2 int, comment_count2 int, hasLiked boolean, hasSave boolean, hasFollow boolean);
             CREATE TABLE feeds SELECT * FROM answered LIMIT 0;
             INSERT INTO feeds SELECT DISTINCT postID, type_post, category, question, title, post_content, asker, time, anonymous, like_count, comment_count, answerID,
             answer, image, publicID, answerer, time2, anonymous2, like_count2,comment_count2, hasLiked, hasSave, hasFollow FROM post_question LEFT JOIN answer ON post_question.postID = answer.postID2 
             WHERE type_post = 2 OR answer IS NOT NULL;
             CREATE TABLE id (postID int);
             INSERT INTO id SELECT DISTINCT postID from post_question LEFT JOIN answer ON post_question.postID = answer.postID2 
             WHERE type_post = 2 OR answer IS NOT NULL;
             SET @length = (SELECT COUNT(*) FROM id);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `answerID` int(11) NOT NULL,
  `postID2` int(10) DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `publicID` text DEFAULT NULL,
  `answerer` varchar(25) DEFAULT NULL,
  `time2` varchar(10) DEFAULT NULL,
  `anonymous2` tinyint(1) DEFAULT NULL,
  `like_count2` int(10) DEFAULT 0,
  `comment_count2` int(10) DEFAULT 0,
  `hasLiked2` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`answerID`, `postID2`, `answer`, `image`, `publicID`, `answerer`, `time2`, `anonymous2`, `like_count2`, `comment_count2`, `hasLiked2`) VALUES
(0, 15, 'hello', 'http://res.cloudinary.com/askookie/image/upload/v1595740274/askookie/dmurtnskbr4vi4asdg8v.jpg', 'askookie/dmurtnskbr4vi4asdg8v', 'christabelle', '7/26/2020', 1, 0, 0, NULL),
(1, 2, 'testinggg', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL),
(2, 3, 'test answer', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL),
(4, 7, 'everytime', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL),
(5, 8, 'raffles hall', NULL, NULL, 'chrisya', '7/14/2020', 1, 2, 1, NULL),
(6, 2, 'another test answer', NULL, NULL, 'chrisya', '7/19/2020', 1, 0, 0, NULL),
(8, 4, 'in image', 'http://res.cloudinary.com/askookie/image/upload/v1595612651/askookie/ucwv8yr0kvu7ozyymrh2.jpg', NULL, 'thevandi', '7/25/2020', 1, 0, 0, NULL),
(10, 8, 'sheares', NULL, NULL, 'thevandi', '7/25/2020', 1, 0, 0, NULL),
(18, 7, 'today', 'http://res.cloudinary.com/askookie/image/upload/v1595670893/askookie/cpz1gcfbiytlodq38spr.jpg', 'askookie/cpz1gcfbiytlodq38spr', 'christabelle', '7/25/2020', 1, 1, 0, NULL),
(19, 8, 'eusoff', NULL, NULL, 'thevandi', '7/25/2020', 1, 0, 0, NULL),
(20, 8, 'ds', NULL, NULL, 'miki', '7/25/2020', 1, 1, 1, NULL),
(21, 15, 'hi', NULL, NULL, 'miki', '7/26/2020', 1, 2, 4, NULL),
(22, 15, 's', NULL, NULL, 'miki', '7/26/2020', 1, 1, 1, NULL),
(23, 15, 'hey', NULL, NULL, 'miki', '7/26/2020', 1, 1, 1, NULL),
(24, 15, 'the', NULL, NULL, 'miki', '7/26/2020', 1, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `answered`
--

CREATE TABLE `answered` (
  `postID` int(11) DEFAULT NULL,
  `type_post` int(1) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `post_content` text DEFAULT NULL,
  `asker` varchar(25) DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `like_count` int(11) DEFAULT NULL,
  `comment_count` int(11) DEFAULT NULL,
  `answerID` int(11) DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `publicID` text DEFAULT NULL,
  `answerer` varchar(25) DEFAULT NULL,
  `time2` varchar(10) DEFAULT NULL,
  `anonymous2` tinyint(1) DEFAULT NULL,
  `like_count2` int(11) DEFAULT NULL,
  `comment_count2` int(11) DEFAULT NULL,
  `hasLiked` tinyint(1) DEFAULT NULL,
  `hasSave` tinyint(1) DEFAULT NULL,
  `hasFollow` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answered`
--

INSERT INTO `answered` (`postID`, `type_post`, `category`, `question`, `title`, `post_content`, `asker`, `time`, `anonymous`, `like_count`, `comment_count`, `answerID`, `answer`, `image`, `publicID`, `answerer`, `time2`, `anonymous2`, `like_count2`, `comment_count2`, `hasLiked`, `hasSave`, `hasFollow`) VALUES
(2, 1, '1', 'testing', NULL, NULL, NULL, '0000-00-00', NULL, 0, 0, 1, 'testinggg', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL, NULL, NULL),
(3, 1, '6', 'what', '', '', 'chrisya', '0000-00-00', 1, 0, 0, 2, 'test answer', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL, NULL, NULL),
(4, 1, '2', 'how', '', '', 'chrisya', '0000-00-00', 1, 0, 0, 8, 'in image', 'http://res.cloudinary.com/askookie/image/upload/v1595612651/askookie/ucwv8yr0kvu7ozyymrh2.jpg', NULL, 'thevandi', '7/25/2020', 1, 0, 0, NULL, NULL, NULL),
(5, 2, '3', NULL, NULL, 'test edit', 'chrisya', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 2, '1', NULL, 'testtt', 'testtt', 'chrisya', '7/10/2020', 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, '3', 'when', '', '', 'chrisya', '7/13/2020', 1, 0, 0, 18, 'today', 'http://res.cloudinary.com/askookie/image/upload/v1595670893/askookie/cpz1gcfbiytlodq38spr.jpg', 'askookie/cpz1gcfbiytlodq38spr', 'christabelle', '7/25/2020', 1, 1, 0, NULL, NULL, NULL),
(8, 1, '2', 'what it the best hall?', '', '', 'chrisya', '7/14/2020', 1, 2, -2, 5, 'raffles hall', NULL, NULL, 'chrisya', '7/14/2020', 1, 2, 1, NULL, NULL, NULL),
(14, 2, '6', NULL, 'post type', 'integer plz', 'chrisya', '7/17/2020', 0, 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, '2', 'hy?', '', '', 'miki', '7/25/2020', 1, 1, 0, 21, 'hi', NULL, NULL, 'miki', '7/26/2020', 1, 2, 4, NULL, NULL, NULL),
(16, 2, '2', NULL, 'sd', 'df', 'miki', '7/25/2020', 0, 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 2, '1', NULL, 'attention', 'new information', 'christabelle', '7/26/2020', 0, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryID` int(1) NOT NULL,
  `name` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryID`, `name`) VALUES
(1, 'faculties'),
(2, 'accommodation'),
(3, 'student_life'),
(4, 'job_intern'),
(5, 'exchange_noc'),
(6, 'others');

-- --------------------------------------------------------

--
-- Table structure for table `comment_table`
--

CREATE TABLE `comment_table` (
  `commentID` int(10) NOT NULL,
  `postID` int(10) DEFAULT NULL,
  `answerID` int(11) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `like_count` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment_table`
--

INSERT INTO `comment_table` (`commentID`, `postID`, `answerID`, `username`, `comment`, `time`, `anonymous`, `like_count`) VALUES
(7, 14, NULL, 'chrisya', 'yeay', '7/25/2020', 0, 0),
(9, 14, NULL, 'christabelle', 'hello', '7/25/2020', 0, 0),
(14, 8, 5, 'thevandi', 'yup', '7/25/2020', 0, 0),
(15, 6, NULL, 'thevandi', 'test also', '7/25/2020', 0, 0),
(16, 14, NULL, 'miki', 'd', '7/25/2020', 0, 0),
(17, 16, NULL, 'miki', 'hey', '7/26/2020', 0, 0),
(18, 15, 21, 'miki', 'd', '7/26/2020', 0, 0),
(19, 15, 21, 'miki', 'd', '7/26/2020', 0, 0),
(20, 15, 21, 'miki', 'd', '7/26/2020', 0, 0),
(21, 15, 22, 'miki', 'd', '7/26/2020', 0, 0),
(22, 16, NULL, 'miki', 'd', '7/26/2020', 0, 0),
(23, 16, NULL, 'miki', 'sdfsdf', '7/26/2020', 0, 0),
(24, 15, 21, 'miki', 'ddddd', '7/26/2020', 0, 0),
(25, 8, 20, 'miki', 'sdsf', '7/26/2020', 0, 0),
(26, 15, 23, 'miki', 'sdf', '7/26/2020', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `postID` int(11) DEFAULT NULL,
  `type_post` int(1) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `post_content` text DEFAULT NULL,
  `asker` varchar(25) DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `like_count` int(11) DEFAULT NULL,
  `comment_count` int(11) DEFAULT NULL,
  `answerID` int(11) DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `publicID` text DEFAULT NULL,
  `answerer` varchar(25) DEFAULT NULL,
  `time2` varchar(10) DEFAULT NULL,
  `anonymous2` tinyint(1) DEFAULT NULL,
  `like_count2` int(11) DEFAULT NULL,
  `comment_count2` int(11) DEFAULT NULL,
  `hasLiked` tinyint(1) DEFAULT NULL,
  `hasSave` tinyint(1) DEFAULT NULL,
  `hasFollow` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`postID`, `type_post`, `category`, `question`, `title`, `post_content`, `asker`, `time`, `anonymous`, `like_count`, `comment_count`, `answerID`, `answer`, `image`, `publicID`, `answerer`, `time2`, `anonymous2`, `like_count2`, `comment_count2`, `hasLiked`, `hasSave`, `hasFollow`) VALUES
(2, 1, '1', 'testing', NULL, NULL, NULL, '0000-00-00', NULL, 0, 0, 1, 'testinggg', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL, NULL, NULL),
(2, 1, '1', 'testing', NULL, NULL, NULL, '0000-00-00', NULL, 0, 0, 6, 'another test answer', NULL, NULL, 'chrisya', '7/19/2020', 1, 0, 0, NULL, NULL, NULL),
(3, 1, '6', 'what', '', '', 'chrisya', '0000-00-00', 1, 0, 0, 2, 'test answer', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL, NULL, NULL),
(4, 1, '2', 'how', '', '', 'chrisya', '0000-00-00', 1, 0, 0, 8, 'in image', 'http://res.cloudinary.com/askookie/image/upload/v1595612651/askookie/ucwv8yr0kvu7ozyymrh2.jpg', NULL, 'thevandi', '7/25/2020', 1, 0, 0, NULL, NULL, NULL),
(5, 2, '3', NULL, NULL, 'test edit', 'chrisya', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 2, '1', NULL, 'testtt', 'testtt', 'chrisya', '7/10/2020', 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, '3', 'when', '', '', 'chrisya', '7/13/2020', 1, 0, 0, 4, 'everytime', NULL, NULL, 'chrisya', '7/13/2020', 1, 0, 0, NULL, NULL, NULL),
(7, 1, '3', 'when', '', '', 'chrisya', '7/13/2020', 1, 0, 0, 18, 'today', 'http://res.cloudinary.com/askookie/image/upload/v1595670893/askookie/cpz1gcfbiytlodq38spr.jpg', 'askookie/cpz1gcfbiytlodq38spr', 'christabelle', '7/25/2020', 1, 1, 0, NULL, NULL, NULL),
(8, 1, '2', 'what it the best hall?', '', '', 'chrisya', '7/14/2020', 1, 2, -2, 5, 'raffles hall', NULL, NULL, 'chrisya', '7/14/2020', 1, 2, 1, NULL, NULL, NULL),
(8, 1, '2', 'what it the best hall?', '', '', 'chrisya', '7/14/2020', 1, 2, -2, 10, 'sheares', NULL, NULL, 'thevandi', '7/25/2020', 1, 0, 0, NULL, NULL, NULL),
(8, 1, '2', 'what it the best hall?', '', '', 'chrisya', '7/14/2020', 1, 2, -2, 19, 'eusoff', NULL, NULL, 'thevandi', '7/25/2020', 1, 0, 0, NULL, NULL, NULL),
(8, 1, '2', 'what it the best hall?', '', '', 'chrisya', '7/14/2020', 1, 2, -2, 20, 'ds', NULL, NULL, 'miki', '7/25/2020', 1, 1, 1, NULL, NULL, NULL),
(14, 2, '6', NULL, 'post type', 'integer plz', 'chrisya', '7/17/2020', 0, 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, '2', 'hy?', '', '', 'miki', '7/25/2020', 1, 1, 0, 0, 'hello', 'http://res.cloudinary.com/askookie/image/upload/v1595740274/askookie/dmurtnskbr4vi4asdg8v.jpg', 'askookie/dmurtnskbr4vi4asdg8v', 'christabelle', '7/26/2020', 1, 0, 0, NULL, NULL, NULL),
(15, 1, '2', 'hy?', '', '', 'miki', '7/25/2020', 1, 1, 0, 21, 'hi', NULL, NULL, 'miki', '7/26/2020', 1, 2, 4, NULL, NULL, NULL),
(15, 1, '2', 'hy?', '', '', 'miki', '7/25/2020', 1, 1, 0, 22, 's', NULL, NULL, 'miki', '7/26/2020', 1, 1, 1, NULL, NULL, NULL),
(15, 1, '2', 'hy?', '', '', 'miki', '7/25/2020', 1, 1, 0, 23, 'hey', NULL, NULL, 'miki', '7/26/2020', 1, 1, 1, NULL, NULL, NULL),
(15, 1, '2', 'hy?', '', '', 'miki', '7/25/2020', 1, 1, 0, 24, 'the', NULL, NULL, 'miki', '7/26/2020', 1, 0, 0, NULL, NULL, NULL),
(16, 2, '2', NULL, 'sd', 'df', 'miki', '7/25/2020', 0, 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 2, '1', NULL, 'attention', 'new information', 'christabelle', '7/26/2020', 0, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `follow_table`
--

CREATE TABLE `follow_table` (
  `username` varchar(25) DEFAULT NULL,
  `postID` int(10) DEFAULT NULL,
  `hasFollow` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow_table`
--

INSERT INTO `follow_table` (`username`, `postID`, `hasFollow`) VALUES
('chrisya', 14, 1),
('christabelle', 8, 1),
('miki', 14, 1),
('miki', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `id`
--

CREATE TABLE `id` (
  `postID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `id`
--

INSERT INTO `id` (`postID`) VALUES
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(14),
(15),
(16),
(17);

-- --------------------------------------------------------

--
-- Table structure for table `like_table`
--

CREATE TABLE `like_table` (
  `username` varchar(25) DEFAULT NULL,
  `postID` int(10) DEFAULT NULL,
  `answerID` int(11) DEFAULT NULL,
  `commentID` int(12) DEFAULT NULL,
  `hasLiked` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `like_table`
--

INSERT INTO `like_table` (`username`, `postID`, `answerID`, `commentID`, `hasLiked`) VALUES
('chrisya', 2, 6, NULL, 1),
('chrisya', 14, NULL, NULL, 1),
('christabelle', 8, 5, NULL, 1),
('thevandi', 8, 5, NULL, 1),
('miki', 16, NULL, NULL, 1),
('miki', 15, NULL, NULL, 1),
('miki', 15, 21, NULL, 1),
('miki', 15, 22, NULL, 1),
('miki', 8, NULL, NULL, 1),
('miki', 8, 20, NULL, 1),
('miki', 15, 23, NULL, 1),
('christabelle', 15, NULL, NULL, 1),
('christabelle', 0, NULL, NULL, 1),
('christabelle', 17, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `member_type`
--

CREATE TABLE `member_type` (
  `id` int(1) NOT NULL,
  `type` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member_type`
--

INSERT INTO `member_type` (`id`, `type`) VALUES
(1, 'admin'),
(2, 'nus_member'),
(3, 'non-nus_member');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notificationID` int(15) NOT NULL,
  `username` varchar(25) NOT NULL,
  `postID` int(10) NOT NULL DEFAULT 0,
  `asker` varchar(25) DEFAULT NULL,
  `type` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notificationID`, `username`, `postID`, `asker`, `type`) VALUES
(1, 'chrisya', 14, NULL, NULL),
(5, 'christabelle', 8, NULL, 2),
(6, 'chrisya', 14, 'chrisya', 2),
(9, 'christabelle', 8, 'chrisya', 1),
(16, '', 16, 'miki', 7),
(22, '', 8, 'chrisya', 4),
(25, 'christabelle', 8, 'chrisya', 2),
(28, '', 15, 'miki', 5),
(29, '', 15, 'miki', 8),
(30, '', 15, 'miki', 3),
(0, '', 15, 'miki', 4),
(0, '', 15, 'miki', 4),
(0, '', 15, 'miki', 4),
(0, '', 0, 'christabelle', 4),
(0, '', 17, 'christabelle', 4),
(0, '', 15, 'miki', 3),
(0, '', 15, 'miki', 3);

-- --------------------------------------------------------

--
-- Table structure for table `notif_type`
--

CREATE TABLE `notif_type` (
  `typeID` int(2) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notif_type`
--

INSERT INTO `notif_type` (`typeID`, `type`) VALUES
(1, 'answer'),
(2, 'comment'),
(3, 'self_answer'),
(4, 'self_likePost'),
(5, 'self_likeAnswer'),
(6, 'self_likeComment'),
(7, 'self_commentPost'),
(8, 'self_commentAns');

-- --------------------------------------------------------

--
-- Table structure for table `post_question`
--

CREATE TABLE `post_question` (
  `postID` int(10) NOT NULL,
  `question` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `post_content` text DEFAULT NULL,
  `type_post` int(1) DEFAULT NULL,
  `asker` varchar(25) DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `category` int(1) DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `like_count` int(10) DEFAULT 0,
  `comment_count` int(10) DEFAULT 0,
  `hasLiked` tinyint(4) DEFAULT NULL,
  `hasSave` tinyint(4) DEFAULT NULL,
  `hasFollow` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_question`
--

INSERT INTO `post_question` (`postID`, `question`, `title`, `post_content`, `type_post`, `asker`, `time`, `category`, `anonymous`, `like_count`, `comment_count`, `hasLiked`, `hasSave`, `hasFollow`) VALUES
(2, 'testing', NULL, NULL, 1, NULL, '0000-00-00', 1, NULL, 0, 0, NULL, NULL, NULL),
(3, 'what', '', '', 1, 'chrisya', '0000-00-00', 6, 1, 0, 0, NULL, NULL, NULL),
(4, 'how', '', '', 1, 'chrisya', '0000-00-00', 2, 1, 0, 0, NULL, NULL, NULL),
(5, NULL, NULL, 'test edit', 2, 'chrisya', NULL, 3, NULL, 0, 0, NULL, NULL, NULL),
(6, NULL, 'testtt', 'testtt', 2, 'chrisya', '7/10/2020', 1, 0, 0, 1, NULL, NULL, NULL),
(7, 'when', '', '', 1, 'chrisya', '7/13/2020', 3, 1, 0, 0, NULL, NULL, NULL),
(8, 'what it the best hall?', '', '', 1, 'chrisya', '7/14/2020', 2, 1, 2, -2, NULL, NULL, NULL),
(9, 'what is the best rc', '', '', 1, 'chrisya', '7/16/2020', 2, 1, 0, 0, NULL, NULL, NULL),
(14, NULL, 'post type', 'integer plz', 2, 'chrisya', '7/17/2020', 6, 0, 1, 3, NULL, NULL, NULL),
(15, 'hy?', '', '', 1, 'miki', '7/25/2020', 2, 1, 1, 0, NULL, NULL, NULL),
(16, NULL, 'sd', 'df', 2, 'miki', '7/25/2020', 2, 0, 1, 3, NULL, NULL, NULL),
(17, NULL, 'attention', 'new information', 2, 'christabelle', '7/26/2020', 1, 0, 1, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_type`
--

CREATE TABLE `post_type` (
  `id` int(1) NOT NULL,
  `type` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_type`
--

INSERT INTO `post_type` (`id`, `type`) VALUES
(1, 'question'),
(2, 'post');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `postID` int(10) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `type` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `save`
--

CREATE TABLE `save` (
  `username` varchar(25) NOT NULL,
  `postID` int(10) NOT NULL,
  `hasSave` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `save`
--

INSERT INTO `save` (`username`, `postID`, `hasSave`) VALUES
('chrisya', 2, 1),
('chrisya', 3, 1),
('chrisya', 14, 1),
('fredda', 5, 1),
('miki', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `member_type` varchar(10) DEFAULT NULL,
  `profile_picture` text DEFAULT NULL,
  `publicID` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `username`, `member_type`, `profile_picture`, `publicID`, `password`, `verified`) VALUES
('christabelle.ft@gmail.com', 'thevandi', '1', 'http://res.cloudinary.com/askookie/image/upload/v1595586762/askookie/ikjrzxdbyt29tiubcz3r.jpg', 'askookie/dmurtnskbr4vi4asdg8v', '$2b$10$Ts2UeLCtoD0WVJUFEbeQ.OdU1FfUXZscEtSAMLA3S/4D6sKU5WDp2', 1),
('christabelle_ft@yahoo.com', 'chrisyaaa', '3', NULL, 'askookie/dmurtnskbr4vi4asdg8v', '$2b$10$0MZSy29.Vrhlp4bX/CkNv.hfMKpzr/HQzheWZIyAj70zhJBgliOWK', 1),
('christopherrobinong@gmail.com', 'christrobinong', '3', NULL, 'askookie/dmurtnskbr4vi4asdg8v', '$2b$10$jTgrx.KutYzMP5jggj5NE.luLW2ucAxr8Sz.NIjS1j01w8AilVuMy', NULL),
('chrisya@gmail.com', 'chrisya', '3', NULL, 'askookie/dmurtnskbr4vi4asdg8v', '$2b$10$yqzy/tZdzLo8RD0.N/fYJe2cKuLvlFf5.J5kbk1T7Ln2nBHNHreom', 1),
('e0407768@u.nus.edu', 'christabelle', '2', 'http://res.cloudinary.com/askookie/image/upload/v1595746025/askookie/d4ui2y67sunax65960gx.jpg', 'askookie/d4ui2y67sunax65960gx', '$2b$10$9ct1Ys8DO2iyjoS0F.l5ye0chuircOlYFRnRyEcQyvhnHxWgrd1lm', 1),
('fredda2@gmail.com', 'fredda2', '3', NULL, 'askookie/dmurtnskbr4vi4asdg8v', '$2b$10$2ncoq./TF1r9ejlcdCct5OkZbB9IEyirIuQ.7H7fOk34Z67GGUOWu', NULL),
('fredda@gmail.com', 'fredda', '3', NULL, 'askookie/dmurtnskbr4vi4asdg8v', '$2b$10$fW9p4Bskikx3LQMmrEfOue/ouKM.lfQnmdM4ZqjBAet1CvOkW.m7G', NULL),
('michela.vieri.hp@gmail.com', 'miki', '1', 'https://res.cloudinary.com/askookie/image/upload/v1595604061/askookie/WhatsApp_Image_2020-07-24_at_22.38.55_qciuxc.jpg', 'askookie/dmurtnskbr4vi4asdg8v', '$2b$10$Ag5k9CVOorW/TH/xXzBNZ.V9P.oNGMgmTcrzVPzhFBilmHDypzVdm', 1),
('test@gmail.com', 'test', '3', NULL, 'askookie/dmurtnskbr4vi4asdg8v', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answerID`),
  ADD KEY `idx1` (`postID2`),
  ADD KEY `answer_ibfk_1` (`answerer`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `comment_table_ibfk_3` (`postID`),
  ADD KEY `comment_table_ibfk_4` (`answerID`),
  ADD KEY `comment_table_ibfk_2` (`username`);

--
-- Indexes for table `follow_table`
--
ALTER TABLE `follow_table`
  ADD UNIQUE KEY `follow` (`username`,`postID`),
  ADD KEY `postID` (`postID`);

--
-- Indexes for table `like_table`
--
ALTER TABLE `like_table`
  ADD UNIQUE KEY `index` (`username`,`postID`,`answerID`,`commentID`),
  ADD KEY `like_table_ibfk_2` (`postID`),
  ADD KEY `like_table_ibfk_5` (`answerID`),
  ADD KEY `like_table_ibfk_4` (`commentID`);

--
-- Indexes for table `post_question`
--
ALTER TABLE `post_question`
  ADD PRIMARY KEY (`postID`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD KEY `postID` (`postID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post_question`
--
ALTER TABLE `post_question`
  MODIFY `postID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `postID` FOREIGN KEY (`postID`) REFERENCES `post_question` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
