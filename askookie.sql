-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2020 at 12:08 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `answerID` int(11) NOT NULL,
  `postID` int(10) DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `answerer` varchar(25) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `like_count` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`answerID`, `postID`, `answer`, `answerer`, `time`, `anonymous`, `like_count`) VALUES
(20, 2, 'test', 'test', '0000-00-00', 1, 1),
(21, 2, 'test', 'test', '0000-00-00', 1, 0),
(22, 2, 'test', 'test', '2012-11-12', 0, 0),
(23, 2, 'test', 'test', '2012-11-12', 0, 0);

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
  `commentID` int(12) NOT NULL,
  `postID` int(10) DEFAULT NULL,
  `answerID` int(11) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `time` date DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `like_count` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment_table`
--

INSERT INTO `comment_table` (`commentID`, `postID`, `answerID`, `username`, `comment`, `time`, `anonymous`, `like_count`) VALUES
(210, NULL, 21, 'test', 'testing123', '2012-11-12', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `username` varchar(25) DEFAULT NULL,
  `categoryID` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`username`, `categoryID`) VALUES
('test', 3);

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
-- Table structure for table `post_question`
--

CREATE TABLE `post_question` (
  `postID` int(10) NOT NULL,
  `question` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `post_content` text DEFAULT NULL,
  `type` int(1) DEFAULT NULL,
  `asker` varchar(25) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `category` int(1) DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `like_count` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_question`
--

INSERT INTO `post_question` (`postID`, `question`, `title`, `post_content`, `type`, `asker`, `time`, `category`, `anonymous`, `like_count`) VALUES
(2, 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

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
-- Table structure for table `report_table`
--

CREATE TABLE `report_table` (
  `postID` int(10) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report_table`
--

INSERT INTO `report_table` (`postID`, `username`, `type`) VALUES
(2, 'test', 'inappropriate');

-- --------------------------------------------------------

--
-- Table structure for table `save`
--

CREATE TABLE `save` (
  `postID` int(10) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `save`
--

INSERT INTO `save` (`postID`, `username`) VALUES
(2, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `member_type` varchar(10) DEFAULT NULL,
  `profile_picture` longblob DEFAULT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `username`, `member_type`, `profile_picture`, `password`) VALUES
('test@gmail.com', 'test', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answerID`),
  ADD KEY `postID` (`postID`),
  ADD KEY `answerer` (`answerer`);

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
  ADD KEY `username` (`username`),
  ADD KEY `comment_table_ibfk_1` (`answerID`),
  ADD KEY `postID` (`postID`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD UNIQUE KEY `follow_idx` (`username`,`categoryID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `member_type`
--
ALTER TABLE `member_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_question`
--
ALTER TABLE `post_question`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `category` (`category`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `post_type`
--
ALTER TABLE `post_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_table`
--
ALTER TABLE `report_table`
  ADD UNIQUE KEY `report_idx` (`postID`,`username`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `save`
--
ALTER TABLE `save`
  ADD UNIQUE KEY `save_idx` (`postID`,`username`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post_question`
--
ALTER TABLE `post_question`
  MODIFY `postID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `post_question` (`postID`),
  ADD CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`answerer`) REFERENCES `user` (`username`);

--
-- Constraints for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD CONSTRAINT `comment_table_ibfk_1` FOREIGN KEY (`answerID`) REFERENCES `answer` (`answerID`),
  ADD CONSTRAINT `comment_table_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `comment_table_ibfk_3` FOREIGN KEY (`postID`) REFERENCES `post_question` (`postID`);

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Constraints for table `post_question`
--
ALTER TABLE `post_question`
  ADD CONSTRAINT `post_question_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`categoryID`),
  ADD CONSTRAINT `post_question_ibfk_2` FOREIGN KEY (`type`) REFERENCES `post_type` (`id`);

--
-- Constraints for table `report_table`
--
ALTER TABLE `report_table`
  ADD CONSTRAINT `report_table_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `post_question` (`postID`),
  ADD CONSTRAINT `report_table_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Constraints for table `save`
--
ALTER TABLE `save`
  ADD CONSTRAINT `save_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `post_question` (`postID`),
  ADD CONSTRAINT `save_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
