-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
<<<<<<< HEAD
-- Generation Time: Jun 21, 2020 at 10:00 AM
=======
-- Generation Time: Jun 21, 2020 at 09:47 AM
>>>>>>> 25777c95c0cb322146d3b2d3c8258cd6e98adb6d
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
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`postID`, `category`, `asker`, `post`, `answerer`, `answer`, `type`) VALUES
(1, 'accommodation', 'user1', 'What is the difference between each Residential Colleges?', 'user0', 'The seven Halls of Residence place major emphasis on student development through active involvement in community work, sports and the arts. Residents get to immerse themselves in the tradition of communal hall life and participate in co-curricular activities ranging from Hall Productions to Inter-Block Games to Youth Expedition Projects.\r\n\r\nFor Student Residences (e.g Prince George’s Park Residence), a minimal framework of community engagement and programmes gives students the flexibility to experience independent living while still having opportunities to interact with fellow residents if they so wish.\r\n\r\nThe Residential Colleges offer students an integrated living and learning experience where the line between formal and informal learning is blurred. Residents not only read modules which are multidisciplinary, innovative and taught in small classes, but are also exposed to a host of different settings through Master’s Teas, forums, and talks where they actively engage with distinguished visitors and interesting speakers. We also provide opportunities for students to participate in College life through interest groups etc.', ''),
(2, 'student_life', 'user1', 'How is life in NUS?', 'user2', 'The great diversity of our campus community creates a unique and energizing learning environment. Our modern self-contained campus offers a vibrant, invigorating and inspiring lifestyle which transcends the lecture hall. No matter what you interests are – sports, theatre, music and chilling out – we have something to please you.', ''),
(3, 'faculties', 'user0', 'Why choose SOC?', 'user1', 'As Asia’s leading computing school, NUS School of Computing (SoC) is recognised for its world-class education and cutting edge research. Its international curriculum equips students with the right balance of scholarly excellence, professionalism, and soft skills needed in today’s workplace. Many of the school’s graduates are empowered with the capabilities to become leaders in their respective fields, revolutionising the way the world functions.\r\n\r\nSince its evolution from the Department of Information Systems and Computer Science, SoC has transformed into a haven of research and development in Computing.\r\n\r\nYour contribution will help SoC continue its legacy in producing a trail of distinguished alumni who are at the forefront of technological advancements.', ''),
(4, 'faculties', 'user0', 'Why choose SDE?', NULL, NULL, ''),
(5, 'exchange_noc', 'user0', 'What should I prepare for Exchange?', NULL, NULL, ''),
(6, 'job_intern', 'user1', 'How are your experiences in Internship?', 'user5', 'I worked in Business Development with the focus on attaining partnerships. These partnerships mainly included the creation of synergies with student societies to educate their members about the many opportunities the art market holds for university students.', ''),
(7, 'exchange_noc', 'user3', 'Can we go for an exchange/noc during this covid period?', 'user2', 'The COVID-19 pandemic continues to significantly impact the health and economies of communities around the world. This has also resulted in restrictions to travel and interaction between people in terms of physical proximity. It may be some time before the world can recover from COVID-19. After much deliberation and out of consideration for the health and safety of the NUS community, NUS President has made the difficult decision of suspending the Student Exchange Programme (SEP) for AY2020/21 Semester 1. Additional information is available at this webpage.', ''),
(8, 'others', 'user2', 'What should freshmen do to prepare for going to NUS?', 'user1', 'There will be a notification email sent to your school email when the password is about to expire. I did not change the password and I could not access my materials and almost could not bid for my module. I had to make a trip to the Computer Centre opposite Central library to fix my password. To change your password, you can press the reset password via Mobile if you have forgotten your password. The reset password would be your partial password + last 4 digits of your matriculation number. ', ''),
(9, 'accommodation', 'user4', 'Can anyone tell me more about tembusu\'s I&E modules?', 'user5', 'The Tembusu College curriculum includes two modules on Ideas and Exposition. These modules are taught by professional writing instructors with advanced degrees attached to the Centre for English Language Communication (CELC). The modules are designed to enable students to produce expository writing, and increase general understanding of a given interdisciplinary topic.\r\n\r\nThe I&E I modules help students to produce expository writing that readers will recognise as increasing their understanding of a given topic while the I&E II modules will help students learn and apply five core strategies that underlie successful scholarly research and writing. For further details please take a look at the CELC page for Ideas & Exposition modules.\r\n\r\nIdeas and Exposition modules can meet the NUS Breadth requirement. The modules are graded but students may choose to exercise the pass / fail option. Completing QET requirements is a pre-requisite for reading I&E modules.', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(12) NOT NULL,
  `password` varchar(12) NOT NULL,
  `email` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

<<<<<<< HEAD
INSERT INTO `users` (`username`, `password`, `email`) VALUES
('', '$2b$10$qC.hZ', ''),
('test', '$2b$10$OgNh9', 'test@test.com'),
('user0', '00', ''),
('user1', '01', ''),
('user2', '02', ''),
('user3', '03', ''),
('user4', '04', '');
=======
INSERT INTO `users` (`username`, `password`) VALUES
('user0', '00'),
('user1', '01'),
('user2', '02'),
('user3', '03'),
('user4', '04'),
('user5', '05');
>>>>>>> 25777c95c0cb322146d3b2d3c8258cd6e98adb6d

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
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
