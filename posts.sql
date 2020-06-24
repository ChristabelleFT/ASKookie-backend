-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2020 at 03:58 PM
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
-- Database: `posts`
--

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `postID` int(11) NOT NULL,
  `category` varchar(15) NOT NULL,
  `asker` varchar(15) NOT NULL,
  `post` text NOT NULL,
  `answerer` varchar(15) DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`postID`, `category`, `asker`, `post`, `answerer`, `answer`, `type`, `title`) VALUES
(1, 'accomodation', 'user1', 'What is the difference between each Residential Colleges?', 'user0', 'The art and cultures are different', '', NULL),
(2, 'modules', 'user1', 'How is life in NUS?', 'user2', 'Life is good', '', NULL),
(3, 'faculties', 'user0', 'Why choose SOC?', 'user1', 'Because it is good', '', NULL),
(4, 'faculties', 'user0', 'Why choose SDE?', 'user0', 'Because it is nice', '', NULL),
(5, 'Exchange/NOC', 'user0', 'What should I prepare for Exchange?', NULL, NULL, '', NULL),
(6, 'modules', 'user2', 'What module should I take?', NULL, NULL, '', NULL),
(7, 'Exchange/NOC', 'user2', 'Should I go for NOC?', 'test3', 'Absolutely!', '', NULL),
(8, 'job_intern', 'user0', 'What are the opportunities out there?', NULL, NULL, '', NULL),
(10, 'accommodation', 'user0', 'How is living in NUS?', 'test3', 'It\'s the best', '', NULL),
(11, 'accommodation', 'user7', 'Is it expensive to live on-campus?', 'user7', 'Yes', '', NULL),
(12, 'job_intern', 'user7', 'Is it hard to get internships?', NULL, NULL, '', NULL),
(15, 'faculties', 'test4', 'How many faculties are there is NUS?', NULL, NULL, '', NULL),
(19, 'student_life', 'test4', 'Is it hard to get into CCA in NUS?', NULL, NULL, '', NULL),
(20, 'exchange_noc', 'test4', 'Is NOC beter than exchange?', NULL, NULL, '', NULL),
(23, 'faculties', 'test4', 'What is the most popular major in NUS', NULL, NULL, '', NULL),
(29, 'accommodation', 'test4', 'Why choose hall over RC?', NULL, NULL, '', NULL),
(30, 'job_intern', 'test4', 'Do we find our own internships?', NULL, NULL, '', NULL),
(31, 'others', 'test4', 'What is the best foodcourt in NUS?', NULL, NULL, '', NULL),
(32, 'faculties', 'test4', 'Why choose Computer science?', NULL, NULL, '', NULL),
(34, 'student_life', 'test3', 'Do NUS CCAs have a lot of commitments?', NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(12) NOT NULL,
  `password` text DEFAULT NULL,
  `email` varchar(25) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `email`, `verified`) VALUES
('', '$2b$10$qC.hZ', '', 0),
('test', '$2b$10$OgNh9', 'test@test.com', 0),
('test2', '$2b$10$Ml/kO', 'test2@test2.com', 0),
('test3', '$2b$10$fAla6AseoTy/lwa4shyDT.UfydcDDoaCeshS6jpad.s.d57lwgV8i', 'test3@gmail.com', 0),
('test4', '$2b$10$7MjFLDiCUuuHB/oTeL9fB.09XQ.ybypdVZBTCIbF4I1YD6SxNnKWC', 'test4@test.com', 0),
('user0', '00', '', 0),
('user1', '01', '', 0),
('user2', '02', '', 0),
('user3', '03', '', 0),
('user4', '04', '', 0),
('user6', '$2b$10$bbfD1', 'user6@user6.com', 0),
('user7', '$2b$10$HTDXdfMd852dT3NmS1xLo.o8b9abkmWwpwitMElI6cxUsdzpVrnqe', 'user7@user.com', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `asker` (`asker`),
  ADD KEY `answerer` (`answerer`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feeds`
--
ALTER TABLE `feeds`
  ADD CONSTRAINT `feeds_ibfk_1` FOREIGN KEY (`asker`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `feeds_ibfk_2` FOREIGN KEY (`answerer`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
