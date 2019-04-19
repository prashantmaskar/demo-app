-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 19, 2019 at 12:25 PM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intpms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
CREATE TABLE IF NOT EXISTS `activity_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `proj_id` int(11) DEFAULT NULL,
  `ticket_id` int(11) DEFAULT NULL,
  `activity_desc` text,
  `entry_time` datetime NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `user_id`, `proj_id`, `ticket_id`, `activity_desc`, `entry_time`, `ip_address`) VALUES
(1, 1, 3, 0, 'Added In Team', '2019-01-29 16:03:01', '::1'),
(2, 1, 3, 0, 'Added   In Team', '2019-01-29 16:06:56', '::1'),
(3, 1, 3, 0, 'Added   In Team', '2019-01-29 16:06:56', '::1'),
(4, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:09:30', '::1'),
(5, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:09:30', '::1'),
(6, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:43:59', '::1'),
(7, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:44:08', '::1'),
(8, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:44:09', '::1'),
(9, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:44:09', '::1'),
(10, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:44:09', '::1'),
(11, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:44:27', '::1'),
(12, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:46:31', '::1'),
(13, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:46:31', '::1'),
(14, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:46:46', '::1'),
(15, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:54:51', '::1'),
(16, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:55:08', '::1'),
(17, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:55:45', '::1'),
(18, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:56:08', '::1'),
(19, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:58:40', '::1'),
(20, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:58:55', '::1'),
(21, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:59:09', '::1'),
(22, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-29 16:59:10', '::1'),
(23, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:59:18', '::1'),
(24, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-29 16:59:18', '::1'),
(25, 1, 9, 0, 'Project Created', '2019-01-29 17:00:32', '::1'),
(26, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-30 12:27:07', '::1'),
(27, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-30 12:27:18', '::1'),
(28, 1, 4, 0, 'Deleted Project', '2019-01-30 12:44:50', '::1'),
(29, 1, 10, 0, 'Project Created', '2019-01-30 14:51:54', '::1'),
(30, 1, 11, 0, 'Project Created', '2019-01-30 14:53:00', '::1'),
(31, 1, 12, 0, 'Project Created', '2019-01-30 14:53:47', '::1'),
(32, 1, 12, 0, 'Deleted Project', '2019-01-30 15:03:51', '::1'),
(33, 1, 13, 0, 'Project Created', '2019-01-30 15:04:20', '::1'),
(34, 1, 13, 0, 'Added prashant dfbfdb1 In Team', '2019-01-31 10:15:52', '::1'),
(35, 1, 13, 0, 'Removed prashant dfbfdb1 From Team', '2019-01-31 10:15:54', '::1'),
(36, 1, 14, 0, 'Project Created', '2019-01-31 10:30:50', '::1'),
(37, 1, 15, 0, 'Project Created', '2019-01-31 10:31:27', '::1'),
(38, 1, 16, 0, 'Project Created', '2019-01-31 10:40:21', '::1'),
(39, 1, 17, 0, 'Project Created', '2019-01-31 10:41:20', '::1'),
(40, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-01-31 13:12:16', '::1'),
(41, 1, 3, 3, 'Task Created', '2019-02-04 08:28:19', '::1'),
(42, 1, 3, 4, 'Task Created', '2019-02-04 09:04:04', '::1'),
(43, 1, 3, 5, 'Task Created', '2019-02-04 09:32:03', '::1'),
(44, 1, 3, 6, 'Task Created', '2019-02-04 09:33:51', '::1'),
(45, 1, 3, 7, 'Task Created', '2019-02-04 09:36:25', '::1'),
(46, 1, 3, 8, 'Task Created', '2019-02-04 09:42:10', '::1'),
(47, 1, 3, 9, 'Task Created', '2019-02-04 09:43:17', '::1'),
(48, 1, 3, 10, 'Task Created', '2019-02-04 09:46:49', '::1'),
(49, 1, 3, 11, 'Task Created', '2019-02-04 09:54:03', '::1'),
(50, 1, 3, 12, 'Task Created', '2019-02-04 11:58:10', '::1'),
(51, 1, 3, 13, 'Task Created', '2019-02-04 11:58:29', '::1'),
(52, 1, 3, 14, 'Task Created', '2019-02-04 11:59:49', '::1'),
(53, 1, 3, 15, 'Task Created', '2019-02-04 12:00:30', '::1'),
(54, 1, 3, 16, 'Task Created', '2019-02-04 12:02:09', '::1'),
(55, 1, 3, 17, 'Task Created', '2019-02-04 12:02:57', '::1'),
(56, 1, 3, 18, 'Task Created', '2019-02-04 12:12:20', '::1'),
(57, 1, 3, 19, 'Task Created', '2019-02-04 14:15:18', '::1'),
(58, 1, 3, 19, 'Task Updated', '2019-02-04 14:17:52', '::1'),
(59, 1, 3, 19, 'Task Updated', '2019-02-04 14:27:37', '::1'),
(60, 1, 3, 19, 'Task Updated', '2019-02-04 14:54:51', '::1'),
(61, 1, 3, 19, 'Task Updated', '2019-02-04 14:55:56', '::1'),
(62, 1, 3, 19, 'Task Updated', '2019-02-04 14:56:04', '::1'),
(63, 1, 3, 19, 'Task Updated', '2019-02-04 16:16:43', '::1'),
(64, 1, 3, 19, 'Task Updated', '2019-02-04 16:17:12', '::1'),
(65, 1, 3, 19, 'Task Updated', '2019-02-04 16:19:49', '::1'),
(66, 1, 3, 19, 'Task Updated', '2019-02-04 16:35:24', '::1'),
(67, 1, 3, 19, 'Task Updated', '2019-02-04 16:35:55', '::1'),
(68, 1, 3, 19, 'Task Updated', '2019-02-04 16:36:09', '::1'),
(69, 1, 3, 19, 'Task Updated', '2019-02-04 16:39:00', '::1'),
(70, 1, 3, 19, 'Task Updated', '2019-02-04 16:39:06', '::1'),
(71, 1, 3, 20, 'Task Created', '2019-02-04 16:39:31', '::1'),
(72, 1, 3, 20, 'Task Updated', '2019-02-05 08:58:16', '::1'),
(73, 1, 3, 20, 'Task Updated', '2019-02-05 09:01:03', '::1'),
(74, 1, 3, 20, 'Added Comment', '2019-02-05 09:10:03', '::1'),
(75, 1, 18, 0, 'Project Created', '2019-02-05 09:42:56', '::1'),
(76, 1, 3, NULL, 'Added Attachment', '2019-02-05 11:51:08', '::1'),
(77, 1, 3, 20, 'Added Attachment', '2019-02-05 11:51:59', '::1'),
(78, 1, 3, 20, 'Added Attachment', '2019-02-05 11:52:50', '::1'),
(79, 1, 3, 20, 'Added Attachment', '2019-02-05 11:55:18', '::1'),
(80, 1, 3, 20, 'Added Attachment', '2019-02-05 11:56:46', '::1'),
(81, 1, 3, 20, 'Added Attachment', '2019-02-05 12:05:13', '::1'),
(82, 1, 3, NULL, 'Deleted Comment', '2019-02-05 12:46:40', '::1'),
(83, 1, 3, NULL, 'Deleted Comment', '2019-02-05 12:46:41', '::1'),
(84, 1, 3, NULL, 'Deleted Comment', '2019-02-05 12:46:44', '::1'),
(85, 1, 3, 20, 'Added Attachment', '2019-02-05 12:46:49', '::1'),
(86, 1, 3, 20, 'Added Comment', '2019-02-05 12:46:56', '::1'),
(87, 1, 3, 20, 'Added Comment', '2019-02-05 18:18:13', '::1'),
(88, 1, 3, 20, 'Added Comment', '2019-02-05 18:20:21', '::1'),
(89, 1, 3, 20, 'Added Attachment', '2019-02-05 18:29:46', '::1'),
(90, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-02-06 20:16:02', '::1'),
(91, 1, 3, 0, 'Added dssd sfd In Team', '2019-02-06 20:16:02', '::1'),
(92, 1, 3, 0, 'Removed dssd sfd From Team', '2019-02-06 20:16:12', '::1'),
(93, 1, 10, 0, 'Added xfvf vfvd In Team', '2019-02-06 20:18:52', '::1'),
(94, 1, 3, 0, 'Added xfvf vfvd In Team', '2019-02-06 20:36:31', '::1'),
(95, 1, 10, 21, 'Task Created', '2019-02-13 20:57:13', '::1'),
(96, 1, 10, 22, 'Task Created', '2019-02-13 20:57:57', '::1'),
(97, 1, 10, 22, 'Task Updated', '2019-02-13 20:58:58', '::1'),
(98, 1, 3, 0, 'Removed xfvf vfvd From Team', '2019-02-13 20:59:25', '::1'),
(99, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-02-13 20:59:49', '::1'),
(100, 1, 3, 0, 'Removed prashant dfbfdb1 From Team', '2019-02-13 21:03:27', '::1'),
(101, 1, 19, 0, 'Project Created', '2019-02-13 21:47:24', '::1'),
(102, 1, 19, 0, 'Added prashant dfbfdb1 In Team', '2019-02-13 21:48:08', '::1'),
(103, 1, 19, 0, 'Added dssd sfd In Team', '2019-02-13 21:48:08', '::1'),
(104, 1, 19, 0, 'Added xfvf vfvd In Team', '2019-02-13 21:48:08', '::1'),
(105, 1, 19, 0, 'Added ertyui ewrtyt In Team', '2019-02-13 21:48:08', '::1'),
(106, 1, 19, 23, 'Task Created', '2019-02-13 21:50:09', '::1'),
(107, 1, 19, 23, 'Added Comment', '2019-02-13 21:50:32', '::1'),
(108, 1, 19, 23, 'Comment Updated', '2019-02-13 21:50:51', '::1'),
(109, 1, 19, 23, 'Deleted Comment', '2019-02-13 21:50:55', '::1'),
(110, 1, 19, 23, 'Added Comment', '2019-02-13 21:51:09', '::1'),
(111, 1, 19, 23, 'Comment Updated', '2019-02-13 21:52:00', '::1'),
(112, 1, 19, 23, 'Task Moved To <b>To Do</b>', '2019-02-13 21:53:17', '::1'),
(113, 1, 19, 23, 'Task Updated', '2019-02-13 21:53:28', '::1'),
(114, 1, 19, 23, 'Task Moved To <b>To Do</b>', '2019-02-13 21:53:34', '::1'),
(115, 1, 3, 20, 'Task Moved To <b>To Do</b>', '2019-02-13 22:14:55', '::1'),
(116, 1, 3, 20, 'Task Moved To <b>To Do</b>', '2019-02-13 22:14:57', '::1'),
(117, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-13 22:14:58', '::1'),
(118, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-13 22:14:59', '::1'),
(119, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-13 22:27:52', '::1'),
(120, 1, 3, 20, 'Task Moved To <b>To Do</b>', '2019-02-13 22:27:56', '::1'),
(121, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-13 22:27:59', '::1'),
(122, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-13 22:28:00', '::1'),
(123, 1, 3, 20, 'Task Moved To <b>To Do</b>', '2019-02-13 22:28:10', '::1'),
(124, 1, 3, 20, 'Deleted Attachment', '2019-02-14 17:29:29', '::1'),
(125, 1, 3, 20, 'Deleted Attachment', '2019-02-14 17:29:30', '::1'),
(126, 1, 3, 20, 'Deleted Attachment', '2019-02-14 17:29:30', '::1'),
(127, 1, 3, 20, 'Deleted Attachment', '2019-02-14 17:29:31', '::1'),
(128, 1, 3, 20, 'Deleted Attachment', '2019-02-14 17:29:31', '::1'),
(129, 1, 3, 20, 'Deleted Attachment', '2019-02-14 17:29:32', '::1'),
(130, 1, 3, 20, 'Deleted Attachment', '2019-02-14 17:29:32', '::1'),
(131, 1, 3, 24, 'Task Created', '2019-02-14 17:45:51', '::1'),
(132, 1, 3, 19, 'Added Attachment', '2019-02-14 17:56:25', '::1'),
(133, 1, 3, 19, 'Deleted Attachment', '2019-02-14 17:56:42', '::1'),
(134, 1, 3, 0, 'Added prashant dfbfdb1 In Team', '2019-02-14 21:24:34', '::1'),
(135, 1, 3, 0, 'Added dssd sfd In Team', '2019-02-14 21:24:34', '::1'),
(136, 1, 3, 19, 'Task Updated', '2019-02-14 21:25:17', '::1'),
(137, 1, 3, 19, 'Task Updated', '2019-02-14 21:25:34', '::1'),
(138, 1, 3, 19, 'Task Updated', '2019-02-14 21:26:39', '::1'),
(139, 1, 3, 19, 'Task Updated', '2019-02-14 21:27:03', '::1'),
(140, 1, 3, 19, 'Task Updated', '2019-02-14 21:27:42', '::1'),
(141, 1, 3, 19, 'Task Updated', '2019-02-14 21:30:38', '::1'),
(142, 1, 3, 19, 'Task Updated', '2019-02-14 21:33:17', '::1'),
(143, 1, 3, 19, 'Task Updated', '2019-02-14 21:33:43', '::1'),
(144, 1, 3, 19, 'Added Comment', '2019-02-14 22:57:45', '::1'),
(145, 1, 3, 19, 'Added Comment', '2019-02-14 23:07:13', '::1'),
(146, 1, 3, 19, 'Added Comment', '2019-02-14 23:08:11', '::1'),
(147, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:23', '::1'),
(148, 1, 3, 24, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:24', '::1'),
(149, 1, 3, 24, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:26', '::1'),
(150, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:27', '::1'),
(151, 1, 3, 24, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:29', '::1'),
(152, 1, 3, 24, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:31', '::1'),
(153, 1, 3, 20, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:32', '::1'),
(154, 1, 3, 19, 'Task Moved To <b>To Do</b>', '2019-02-15 17:23:33', '::1'),
(155, 1, 3, 25, 'Task Created', '2019-02-15 20:58:04', '::1'),
(156, 1, 3, 26, 'Task Created', '2019-02-15 20:59:47', '::1'),
(157, 1, 3, 27, 'Task Created', '2019-02-15 21:01:53', '::1'),
(158, 1, 3, NULL, 'Task Updated', '2019-02-15 21:02:46', '::1'),
(159, 1, 3, 28, 'Task Created', '2019-02-15 21:05:03', '::1'),
(160, 1, 3, 28, 'Task Updated', '2019-02-15 21:06:19', '::1'),
(161, 1, 3, 29, 'Task Created', '2019-02-15 21:09:02', '::1'),
(162, 1, 3, 29, 'Task Updated', '2019-02-15 21:09:30', '::1'),
(163, 1, 3, 30, 'Task Created', '2019-02-15 21:12:47', '::1'),
(164, 1, 3, 31, 'Task Created', '2019-02-15 21:25:49', '::1'),
(165, 1, 3, 32, 'Task Created', '2019-02-15 21:26:36', '::1'),
(166, 1, 3, 33, 'Task Created', '2019-02-15 21:30:00', '::1'),
(167, 1, 3, 33, 'Added Comment', '2019-02-15 21:30:33', '::1'),
(168, 1, 3, 33, 'Added Attachment', '2019-02-15 21:30:44', '::1'),
(169, 1, 3, 33, 'Task Updated', '2019-02-15 21:34:53', '::1'),
(170, 1, 3, 34, 'Task Created', '2019-02-15 21:39:26', '::1'),
(171, 1, 3, 29, 'Task Updated', '2019-02-15 22:08:22', '::1'),
(172, 1, 3, 35, 'Task Created', '2019-02-15 22:09:33', '::1'),
(173, 1, 3, 36, 'Task Created', '2019-02-15 22:12:16', '::1'),
(174, 1, 3, 37, 'Task Created', '2019-02-15 22:12:23', '::1'),
(175, 1, 3, 38, 'Task Created', '2019-02-15 22:14:37', '::1'),
(176, 1, 3, 38, 'Task Updated', '2019-02-15 22:15:13', '::1'),
(177, 1, 3, 39, 'Task Created', '2019-02-18 15:09:02', '::1'),
(178, 1, 3, 40, 'Task Created', '2019-02-18 15:21:53', '::1'),
(179, 1, 3, 40, 'Task Updated', '2019-02-18 15:44:06', '::1'),
(180, 1, 3, 40, 'Task Updated', '2019-02-18 15:44:54', '::1'),
(181, 1, 3, 40, 'Task Updated', '2019-02-18 15:47:27', '::1'),
(182, 1, 3, 41, 'Task Created', '2019-02-18 20:46:31', '::1'),
(183, 1, 3, 42, 'Task Created', '2019-02-18 21:03:58', '::1'),
(184, 1, 3, 43, 'Task Created', '2019-02-18 22:08:21', '::1'),
(185, 1, 3, 43, 'Task Updated', '2019-02-18 22:10:32', '::1'),
(186, 1, 3, 41, 'Task Moved To <b>To Do</b>', '2019-02-18 22:20:22', '::1'),
(187, 1, 3, 41, 'Task Moved To <b>To Do</b>', '2019-02-18 22:20:29', '::1'),
(188, 1, 3, 42, 'Task Moved To <b>To Do</b>', '2019-02-18 22:20:32', '::1'),
(189, 1, 3, 43, 'Task Moved To <b>To Do</b>', '2019-02-18 22:20:49', '::1'),
(190, 1, 3, 43, 'Task Moved To <b>To Do</b>', '2019-02-18 22:20:52', '::1'),
(191, 1, 3, 39, 'Task Moved To <b>To Do</b>', '2019-02-18 22:36:35', '127.0.0.1'),
(192, 1, 3, 43, 'Task Moved To <b>To Do</b>', '2019-02-18 22:36:37', '127.0.0.1'),
(193, 1, 3, 39, 'Task Updated', '2019-02-18 22:36:51', '127.0.0.1');

-- --------------------------------------------------------

--
-- Table structure for table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
CREATE TABLE IF NOT EXISTS `attachment` (
  `attachment_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) DEFAULT NULL,
  `proj_id` int(11) NOT NULL,
  `file` varchar(250) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`attachment_id`),
  KEY `proj_id` (`proj_id`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attachment`
--

INSERT INTO `attachment` (`attachment_id`, `ticket_id`, `proj_id`, `file`, `display_name`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(2, NULL, 3, '1549367468testing_file_5.docx', '', 1, '2019-02-05 11:51:08', NULL, '::1'),
(11, NULL, 3, '1550246444No_validation_messages_get_display_on_profile_page.docx', 'No validation messages get display on profile page.docx', 1, '2019-02-15 21:30:44', NULL, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `c_name`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(1, 'follet', 1, '2019-01-21 00:00:00', '2019-01-22 00:00:00', '192.165.11'),
(2, 'Rise Interactive', 1, '2019-01-20 00:00:00', '2019-01-21 00:00:00', '192.165.11'),
(3, 'UBIKA', 1, '2019-01-30 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `comment_parent` int(11) NOT NULL DEFAULT '0' COMMENT '0: Main comment; #: Child comment of #',
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `global_settings`
--

DROP TABLE IF EXISTS `global_settings`;
CREATE TABLE IF NOT EXISTS `global_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meta_key` varchar(100) NOT NULL,
  `meta_value` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `global_settings`
--

INSERT INTO `global_settings` (`id`, `meta_key`, `meta_value`) VALUES
(1, 'project_slug_last_id', '17'),
(2, 'ticket_slug_last_id', '41'),
(3, 'from_email_id', 'noreply@integrative-systems.com'),
(4, 'from_email_title', 'Integrative Systems'),
(5, 'site_title', 'Project Management System');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `proj_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `client_id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`proj_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`proj_id`, `name`, `client_id`, `slug`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(3, 'test', 2, 'P1', 1, '2019-01-21 14:55:03', NULL, '::1'),
(5, 'hgfh', 1, 'P3', 1, '2019-01-21 15:29:12', NULL, '::1'),
(6, 'gfdgfdgdfgdfg', 2, 'P4', 1, '2019-01-21 15:29:28', NULL, '::1'),
(7, 'fghgfhg', 1, 'P5', 1, '2019-01-21 15:30:14', NULL, '::1'),
(8, 'follet APi', 2, 'P6', 1, '2019-01-22 08:35:59', NULL, '::1'),
(9, 'ffdf', 2, 'P7', 1, '2019-01-29 17:00:31', NULL, '::1'),
(10, 'testing slug', 2, 'P8', 1, '2019-01-30 14:51:53', NULL, '::1'),
(11, 'testing slug2', 1, 'P9', 1, '2019-01-30 14:53:00', NULL, '::1'),
(13, 'testing slug4', 1, 'P11', 1, '2019-01-30 15:04:20', NULL, '::1'),
(14, 'Test Project 1', 1, 'P12', 1, '2019-01-31 10:30:50', NULL, '::1'),
(15, 'Test Project 2', 2, 'P13', 1, '2019-01-31 10:31:27', NULL, '::1'),
(16, 'Test Project 1', 1, 'P14', 1, '2019-01-31 10:40:21', NULL, '::1'),
(17, 'Test Project 2', 1, 'P15', 1, '2019-01-31 10:41:20', NULL, '::1'),
(18, 'a', 3, 'P16', 1, '2019-02-05 09:42:56', NULL, '::1'),
(19, 'Test Project 10', 2, 'P17', 1, '2019-02-13 21:47:24', NULL, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` int(11) NOT NULL AUTO_INCREMENT,
  `proj_id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `slug` varchar(150) NOT NULL,
  `description` text,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `column_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `column_id` (`column_id`),
  KEY `proj_id` (`proj_id`),
  KEY `created_by` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `proj_id`, `name`, `slug`, `description`, `start_date`, `end_date`, `column_id`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(39, 3, 'r', 'T37', NULL, '2019-02-18 00:00:00', '2019-02-27 23:59:59', 2, 1, '2019-02-18 15:09:02', '2019-02-18 22:36:51', '127.0.0.1'),
(40, 3, 'New Task', 'T38', NULL, '2020-01-22 00:00:00', '2019-08-29 23:59:59', 1, 1, '2019-02-18 15:21:53', '2019-02-18 15:47:27', '::1'),
(41, 3, 'New Task', 'T39', NULL, '2019-02-18 00:00:00', '2019-03-04 23:59:59', 3, 1, '2019-02-18 20:46:31', '2019-02-18 22:20:29', '::1'),
(42, 3, 'New Task', 'T40', NULL, '2019-02-18 00:00:00', '2019-03-04 23:59:59', 2, 1, '2019-02-18 21:03:58', '2019-02-18 22:20:32', '::1'),
(43, 3, 'New Task', 'T41', NULL, '2019-02-21 00:00:00', '2019-02-21 23:59:59', 3, 1, '2019-02-18 22:08:21', '2019-02-18 22:36:37', '127.0.0.1');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_column`
--

DROP TABLE IF EXISTS `ticket_column`;
CREATE TABLE IF NOT EXISTS `ticket_column` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `column_name` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ticket_column`
--

INSERT INTO `ticket_column` (`id`, `column_name`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(1, 'To Do', 1, '2019-01-25 00:00:00', NULL, NULL),
(2, 'In Progress', 1, '2019-02-01 00:00:00', NULL, NULL),
(3, 'Done', 1, '2019-02-01 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `role` int(11) DEFAULT NULL,
  `designation` int(11) DEFAULT NULL,
  `acc_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: Not Active; 1: Active',
  `created_by` int(11) DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `designation` (`designation`),
  KEY `role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `email`, `username`, `first_name`, `last_name`, `password`, `role`, `designation`, `acc_status`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(1, 'admin@test.com', 'admin', 'Admin', 'User', '550191dffd25c29eb0ddedfbc8b24c6bb7c0cb811cbed6fe2b678eb6ed937b03e3317c5c47b137a5fd99824eb46ea9d0e9dd597b20fd1f0bc7fd839f53d2b9bdvukDaUinOzR/dZQ/jlFpI/RV42fZSy6KNj2jyDC3zPw=', 1, NULL, 1, 1, '2019-01-09 00:00:00', NULL, NULL),
(5, 'pmaskar@integrative-systems.com', 'pmaskar', 'prashant', 'dfbfdb1', '', 2, 18, 1, 1, '2019-01-23 12:38:18', NULL, '::1'),
(19, 'sfoujdar@integrative-systems.com', 'sfoujdar', 'dssd', 'sfd', '9c7889f19538291551d5d9993cbc42ea690980bafbc2ca4e894a54b2c4e2cd10f02183cad5decb974744c26f6054af2fe10ed4d103fe55a2ad1a91ffc76e0611cRT83K8DbwDW8lQkbPnosSGu08lyLqIuNA+2vXP+3o8=', 2, 18, 1, 1, '2019-01-31 13:10:42', NULL, '::1'),
(20, 'sdvsdvd@gsf.sfsf', 'sdvsdvd', 'xfvf', 'vfvd', '92d3a60540a13d204b1b1076b9ffd888789ad4c54e7629a81b02f5df0f0dd06ac4ff3ada641eb1e9cb37e7a1337819081a1d2ac3f5e55f994fe054397511d276UijQ3W64ZNvhkEu6sjwYYEfl7aYyR2NIQAs2zFWWzEE=', 2, 18, 1, 1, '2019-02-06 20:16:36', NULL, '::1'),
(21, 'ertrh@seg.regh', 'ertrh', 'ertyui', 'ewrtyt', '8c715a14c5f9f338545666ccae86083d96214ea078ffce4bce5aedb7442edb024ae0d2937d1f0407194ddbf664a5fda1e1f89efd993f7af5b5a07274703f1d70roWZovz20RDqnNEMX6/guE3uJyG/QRPjFmr34D994eA=', 2, 20, 1, 1, '2019-02-06 20:17:19', NULL, '::1'),
(22, 'test@test.com', 'test', 'test', 'test', 'c19133a3b387491b3845ba93547bbba2703d3028c5f06d229b9895baec8ba2d52e55328b4d3cf56045bf8f785c189101e639b65834d0fc321818f16b723245f6zw9SE5Js+6vqZ10EhHXpZ0fRc9NnGHmZNsn40s5t8Ac=', 2, 18, 1, 1, '2019-02-13 20:21:25', NULL, '::1'),
(23, 'test@test.come', 'test1', 'fd', 'dg', '9710e10e071535ecd4adefc1e4f450eea1b6985a132e47148f7782a25517c11109daa8b15fcd44f075006cc39084bf23dcd6955bf14112fc8fdeabc88b23730bq445a25HER9ktlDeWHXmbNf5lowSbxmMxPDHSVAh17Y=', 2, 18, 1, 1, '2019-02-13 20:22:15', NULL, '::1'),
(24, 'shreyas.foujdar@gmail.com', 'shreyas.foujdar', 'e', 'foujdar', '64a48488207abf5869b0b54136e3e70ed05f969b3f93fa20ff3f04fdf40fb5b1bfbf0c146d13d94de84b856c0808853335ed3fd507f081e0bc67ffab80a40b16l2GbAbwGaNUO7AprnNXng7+Xsp1ObLnVZ4a3ZsAN3Bw=', 2, 18, 1, 1, '2019-02-14 14:53:13', NULL, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `user_designation_cat`
--

DROP TABLE IF EXISTS `user_designation_cat`;
CREATE TABLE IF NOT EXISTS `user_designation_cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_designation_cat`
--

INSERT INTO `user_designation_cat` (`id`, `designation`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(18, 'Designer', 1, '2019-01-23 10:04:28', NULL, '::1'),
(20, 'ygyghg', 1, '2019-01-31 10:15:35', NULL, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_details`
--

DROP TABLE IF EXISTS `user_login_details`;
CREATE TABLE IF NOT EXISTS `user_login_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `login_time` datetime DEFAULT NULL,
  `last_active` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login_details`
--

INSERT INTO `user_login_details` (`id`, `token`, `login_time`, `last_active`, `ip_address`) VALUES
(1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xMCAxNjoxMDo0NiJ9.-1RhTS4F79tSd4MnV9Oj-0WKZcrZK_hMl02_ryXmp_c', '2019-01-10 16:10:46', '2019-01-10 16:10:46', '::1'),
(2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xMCAxNjoyNDoyMCJ9.UvG-9ER2B-AcXbUIGg5HcUcHvgK4PhPkAMFhLxJszN0', '2019-01-10 16:24:20', '2019-01-10 16:24:20', '::1'),
(3, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xMCAxNzo0MDoxNiJ9.20M0ro2Xz-Z1tRbH0mkDGUusBgtDgtiPr9QGmGp1DVo', '2019-01-10 17:40:16', '2019-01-10 17:40:16', '::1'),
(4, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAwOToxNjowNCJ9.HIlK7QT2Krg4pxNVzg5UVvRfAAPpG6BZJL2zVzQ3TWg', '2019-01-15 09:16:04', '2019-01-15 09:16:04', '::1'),
(5, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAwOToxNzozMCJ9.1j1iZmGHv8y673KgWy0A_6IFCxVqm9paLliOwgV3yG4', '2019-01-15 09:17:30', '2019-01-15 09:17:30', '::1'),
(6, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAwOTozNDozNSJ9.Q9dUvb3yx49HIfQ-Nwt6mpi0kAXG7o6DT-5KRND10XM', '2019-01-15 09:34:35', '2019-01-15 09:34:35', '::1'),
(7, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAwOTozNzozMSJ9.GCJrWm1GyaFCukoSuDRFsW_ReNnsEm7IeX5TtLd_APE', '2019-01-15 09:37:31', '2019-01-15 09:37:31', '::1'),
(8, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAwOTo0Mjo1MCJ9.rR7naeQUlAS7_giUS8qjMI6qjLtGTjWOFHKdt1DEKVA', '2019-01-15 09:42:50', '2019-01-15 09:42:50', '::1'),
(9, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAxNDoyMDoxNCJ9.3m3n0zqooWbrKqt-lvc6It6Ul0ACTaZmmoVnXgs6YOA', '2019-01-15 14:20:14', '2019-01-15 14:20:14', '::1'),
(10, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAxNDo0MTozMSJ9._ozSkeRKP-psVe6DjeK41jcNciXKszXoRlQfWh9dz9I', '2019-01-15 14:41:31', '2019-01-15 14:41:31', '::1'),
(11, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAxNDo0MTo0NCJ9.sMl3p338VQrWfKi0-yEQ02WtwAg8JTAo5BU0qG4_KTE', '2019-01-15 14:41:44', '2019-01-15 14:41:44', '::1'),
(12, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAxNDo0Njo1MSJ9.AnWiJonmZ9PpQ2J56qBuM9tw2irj1dtHJSD0gLd_iEM', '2019-01-15 14:46:51', '2019-01-15 14:46:51', '::1'),
(13, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAxNDo0ODo1NiJ9.69e4IqZktXlhiNQ-VX_9nX6TTAtKIK8xw_cGFGUT6I0', '2019-01-15 14:48:56', '2019-01-15 14:48:56', '::1'),
(14, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNSAxNDo1NDoxNiJ9.86y2jNgv1DNGw8Su6X8kDWKq-n-qR96sBCvBPNGnaIk', '2019-01-15 14:54:16', '2019-01-15 14:54:16', '::1'),
(15, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNiAwODo1NzoyMyJ9.ZKRN_jNYcpKp6nBDS2rkWyJ6fzNHKKJ_Os1yKffqQNc', '2019-01-16 08:57:23', '2019-01-16 08:57:23', '::1'),
(16, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNiAxMDowNDo1NyJ9.sIl2sSYwRh9StsUpaY-Uxs6U_pe33aQkmUgvQC3xa2c', '2019-01-16 10:04:57', '2019-01-16 10:04:57', '::1'),
(17, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNiAxMTo0Mjo0MyJ9.tzJED-mUauHtPLGyVUyHkTubV-UN3IrsVxU5f9wRksM', '2019-01-16 11:42:43', '2019-01-16 11:42:43', '::1'),
(18, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAwOTo0NTozMyJ9.GnKIyOUEvbiRfPzYVBcd9MN4_1xpYUXsBBElHUAP5MU', '2019-01-17 09:45:33', '2019-01-17 09:45:33', '::1'),
(19, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxMDoyNjoxNCJ9.RJEd1MvahpbvrG6ftrYrxgKeQ_JgLezp94mrpr-te94', '2019-01-17 10:26:14', '2019-01-17 10:50:50', '::1'),
(20, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxMTozOToxMiJ9.uzz-IGnW3zYGt2XLNvVsCoJxaUqHMM4Wn7NLp2PkmBg', '2019-01-17 10:39:12', '2019-01-17 11:50:04', '::1'),
(21, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxMjo1MDo1NiJ9.71ZVTJtPC52yHTfomSj81e8YpUMvWySEq3GTeMpzuv0', '2019-01-17 12:50:56', '2019-01-17 13:19:03', '::1'),
(22, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNDoyNjo0NyJ9.fzGM03O0azzA39Vi5RE2jL1gAdd5srH4jfK4bHZ5-5E', '2019-01-17 14:26:47', '2019-01-17 14:38:53', '::1'),
(23, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNDo1NjoyNiJ9.hb99nfOxKlHU1G3v-T5N-fZgu457IVGgYHJA_xZk57g', '2019-01-17 14:56:26', '2019-01-17 15:20:25', '::1'),
(24, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNToyMTowMiJ9.r9jjDimNlLAQdxY1fNpUjxljg6CeThTLAVCsA-ru8BI', '2019-01-17 15:21:02', '2019-01-17 15:21:02', '::1'),
(25, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNToyMjozMSJ9.BrGSXMVh46QxG_L7rEZ58pdHPa7xEwQbIMpvDlFZR7M', '2019-01-17 15:22:31', '2019-01-17 12:22:31', '::1'),
(26, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNToyMzowNSJ9.aoZdQA1WOeAEFj1WMt9uf3hiP4ooj2UDQJa8VKEMxdM', '2019-01-17 15:23:05', '2019-01-17 15:30:36', '::1'),
(27, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNTo1ODozMyJ9.gCxo1OZa71QY5Gb-hXC8TuUDJpAA3uHJGXjc5APWs0M', '2019-01-17 15:58:33', '2019-01-17 15:58:34', '::1'),
(28, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNzoxNDo0MSJ9.EDIgW-zoNm-Ed1Z_WsLm0bJabbwJasbxYm_FObQv-zw', '2019-01-17 17:14:41', '2019-01-17 17:14:41', '::1'),
(29, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xNyAxNzo0MjowMSJ9.FmBt2wEWYSP66iBXfGTAbe2Ed_380vNkHWKQD2frUWc', '2019-01-17 17:42:01', '2019-01-17 17:42:01', '::1'),
(30, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwODoxMzowMyJ9.ZDf-CKc7_K_GtmdJBwpzzkeeP9QDIazieYJHJi4B1zM', '2019-01-18 08:13:03', '2019-01-18 08:33:32', '::1'),
(31, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwODozMzo1MCJ9.Ganq_5cEXpevmNPda79KzWPPfQ20K_5bR4cUShjPJUc', '2019-01-18 08:33:50', '2019-01-18 02:36:14', '::1'),
(32, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwODozNzo1OSJ9.aUuD_kNKCZE82L_mvSQrlVCMZc6QvT3WJJX6EHOHO6Q', '2019-01-18 08:37:59', '2019-01-18 05:37:59', '::1'),
(33, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwODozODo0NyJ9.ea8AC2L8vyKh_iCgpP5wpVtZB2tYRB0JtIkXfcSrxCY', '2019-01-18 08:38:47', '2019-01-18 05:53:57', '::1'),
(34, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwODo1NDoyOSJ9.94yk86wNL17IpIvrq3aY3FMynlnPk6yBMInkazFlDI0', '2019-01-18 08:54:29', '2019-01-18 05:54:29', '::1'),
(35, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwODo1ODoxOCJ9.KR1pi64N-Q-tIbbhZAiDvi6uz9qXFc2LrJvaDwKgMj0', '2019-01-18 08:58:18', '2019-01-18 05:58:18', '::1'),
(36, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwOTowMDoxNyJ9.w22TylutkR3lJ8YPIfsGqGph4mLJGIwnbqUOr24rhj0', '2019-01-18 09:00:17', '2019-01-18 09:08:24', '::1'),
(37, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAwOTowODoyOCJ9.kW_3ssvYgCgOxwGiSQ9ijWNPvSMvy0QeMXUMwU3lWPE', '2019-01-18 09:08:28', '2019-01-18 10:02:36', '::1'),
(38, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAxMDoyODo0NCJ9.kzgubgR1lBBUkFfkMO8HJGumWLk394i8IWHmRPv-iD8', '2019-01-18 10:28:44', '2019-01-18 10:30:42', '::1'),
(39, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAxMDozMjoxNyJ9.QbUo44t4SGNjURfU4C9PQQ5rRvLp1GjD3qayGRElNxE', '2019-01-18 10:32:17', '2019-01-18 10:57:31', '::1'),
(40, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAxMTozOTo1OCJ9.WB4_eQs69N7YSLndvpHKHOhmIQWOCN-Uvmd-m03x0-o', '2019-01-18 11:39:58', '2019-01-18 13:26:47', '::1'),
(41, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAxMzoyNzoxMSJ9.USco-MseFFW4vwLDcCtHA_in8gbUOMQ4gizFXKad7Lk', '2019-01-18 13:27:11', '2019-01-18 13:27:23', '::1'),
(42, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0xOCAxMzo1ODowNyJ9.YXB49xjQ5az2Ok7u43wnGQXbEE-QDYuV8pi2PCoNSy0', '2019-01-18 13:58:07', '2019-01-18 14:40:38', '::1'),
(43, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAwODo0NzozNSJ9.19xd2-3ipcbsgwcfE6C_zsQ6jRDHZjeGZQVEzMFVqfs', '2019-01-21 08:47:35', '2019-01-21 08:56:39', '::1'),
(44, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAwOToxOTowNyJ9.BssjxNEvwLACTvloVrTJUnXUO1KW-utiF5Nn-SoTaw4', '2019-01-21 09:19:07', '2019-01-21 09:25:13', '::1'),
(45, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAwOTo0MjowMCJ9.r1Sqx30uHfNK8BbMivJO8-rH3kr7bntwwGjYEIUqypU', '2019-01-21 09:42:00', '2019-01-21 10:49:41', '::1'),
(46, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAxMTo0MToyMyJ9.UemhGoEdC2OwLFaWoDghpd63ci0d6wdOUYYPJjrS3uw', '2019-01-21 11:41:23', '2019-01-21 12:18:51', '::1'),
(47, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAxMjoxOToxNiJ9.fm0gZuRwFZb0fFeTls0FWbLbXV9azJJQhSAruNdFWHs', '2019-01-21 12:19:16', '2019-01-21 13:40:38', '::1'),
(48, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAxNDozNToyMSJ9.LI_cyhz5aywOuHytoJu0k6t2yXS3dXl5RYOZaPeoXPo', '2019-01-21 14:35:21', '2019-01-21 15:57:02', '::1'),
(49, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAxNjoyNjo1OCJ9.kxqFx6wMpF-tqRoSpqDov0aCGw-RB0k-HmgNMXK5xBM', '2019-01-21 16:26:58', '2019-01-21 16:27:15', '::1'),
(50, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMSAxNzoyMDowMSJ9.ekHxQ97TWPouEjnWSSyhcrA0JxWiKWl5LB6vKR2Pj-w', '2019-01-21 17:20:01', '2019-01-21 17:20:23', '::1'),
(51, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAwODozNDo1OSJ9.RskTBSFwGN3j4i5HZMvAH4kQH5Y04ZIH0GKi_dSTktA', '2019-01-22 08:34:59', '2019-01-22 08:36:19', '127.0.0.1'),
(52, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAwOTowNjowMiJ9.pA87NpbwzlmFsoxEMYOsWgWppPRrou3vBbIGJaCnxuc', '2019-01-22 09:06:02', '2019-01-22 09:18:44', '::1'),
(53, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAwOToxODo1OCJ9.9q5auadL983S_T0ckt7qTZQtl_brK_P4v4Wq0GVXt9Y', '2019-01-22 09:18:58', '2019-01-22 10:46:12', '::1'),
(54, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxMTo1NDo1NSJ9.Zey9aOSymXjgTfWqSf5oRpYU5eKIBfjF9T4qBhzsNy4', '2019-01-22 11:54:55', '2019-01-22 13:03:19', '::1'),
(55, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxMzowNTowOCJ9.GRnxsLXsF3dIWuYiDjFd5q9z6Fz4muPWh0OntlJhIKI', '2019-01-22 13:05:08', '2019-01-22 13:33:00', '::1'),
(56, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNDo1MTo0NiJ9.Z-YuDtYwIaE5xo9mhw5qR_JsXkeS24suNvOg4voL5Tc', '2019-01-22 14:51:46', '2019-01-22 14:55:42', '::1'),
(57, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNToxMjoxNSJ9.eLWNCI3VgTgP1RneIeUfp00awsK98DegMnvRLPJ09WQ', '2019-01-22 15:12:15', '2019-01-22 15:20:01', '::1'),
(58, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNToyMToyOSJ9.n9PI4QRUUarjrsrP4j_CsmondlF0jajgKJvGEEPDnho', '2019-01-22 15:21:29', '2019-01-22 15:21:29', '::1'),
(59, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNToyMjo1MCJ9.Mp3WHmSGNgj6Rh2qSWJb7i_SP0bwLZSH69AIFoal8ZU', '2019-01-22 15:22:50', '2019-01-22 15:24:01', '::1'),
(60, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNToyNDoxNSJ9.breaeaLmf4w-rGRbbz5FhA_xFFnB7Yz9POnAfY5iT10', '2019-01-22 15:24:15', '2019-01-22 15:27:19', '::1'),
(61, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNToyNzozNCJ9.zUPkdNRiF1n0mCqUq7Zr7Gs6fTWgY0gHRskzCFFyCxg', '2019-01-22 15:27:34', '2019-01-22 15:27:34', '::1'),
(62, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNToyODowMSJ9.WFqL0qfZYB9pJmbj4XWVPyoh5oliT2_XetAxihRS0M4', '2019-01-22 15:28:01', '2019-01-22 15:28:01', '::1'),
(63, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNTozMjoxNiJ9.qGtvvRXscjMkPH5khOWI7MISMvgpPVhnqYDBiZSmtGA', '2019-01-22 15:32:16', '2019-01-22 15:32:16', '::1'),
(64, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNTozMjo0NyJ9.aEy8c3LQSToLctxCpT94a7Q2Z9TA1p5T8CpR97995B0', '2019-01-22 15:32:47', '2019-01-22 15:32:59', '::1'),
(65, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNjoyMzowMCJ9.-AeANrBETrsfVSLHLlKcyw4eikVtCv-8ece_YGkFWX0', '2019-01-22 16:23:00', '2019-01-22 16:33:58', '::1'),
(66, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNjozNTo1NiJ9.4tG5-4_dCi8NHWlyZAIiMSOhWf2616jGmxoTCJDzl6I', '2019-01-22 16:35:56', '2019-01-22 16:37:59', '::1'),
(67, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNjozOTo1NyJ9.T0FUmzJQXoIzZsaxfG9H4R8RmI5E3XL8UbNP0KkCmlY', '2019-01-22 16:39:57', '2019-01-22 16:43:22', '::1'),
(68, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMiAxNjo0NTo1NyJ9.MyA70STSVIVqg7kiHXKkF2cpy0lofNTnIX5Id4EHpbg', '2019-01-22 16:45:57', '2019-01-22 16:54:46', '::1'),
(69, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMyAwOToxODo0NiJ9.FY3pROvpl-YvOvqemb_OP3ZNZJ9xFKs9oDIKzMRh4nM', '2019-01-23 09:18:46', '2019-01-23 10:15:05', '::1'),
(70, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMyAxMjozMjozMSJ9.TAvacIpvvR76AwLCo3mtip_TME4g0YZztMejrockt8s', '2019-01-23 12:32:31', '2019-01-23 12:34:07', '::1'),
(71, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMyAxMjozNTowNyJ9.D_sAJSmiSLf1-EDKypAsoH28Ont8kpatUaAhWT6HhBU', '2019-01-23 12:35:07', '2019-01-23 12:54:40', '::1'),
(72, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMyAxMjo1NzoxOCJ9.Cvt6HBAy0wpTf8A1lmH-213PDeOHCqU4N9zEzbAjokA', '2019-01-23 12:57:18', '2019-01-23 13:06:20', '::1'),
(73, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yMyAxNDozNTowOSJ9.Yo8L4HvbmpMMHw8pIdgiimttTf-9uSYxdhT-C2l5Iws', '2019-01-23 14:35:09', '2019-01-23 14:40:04', '::1'),
(74, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAwODozOTo1MyJ9.cP5971KBznBiThCHpBQoanX59TrV20gzI7vCDWxdDCY', '2019-01-24 08:39:53', '2019-01-24 09:02:28', '::1'),
(75, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAwOTowMzoxMyJ9.fFDFzIy3hD6ZYbPLI1jtcrk9JA9oq47-P_EM4NxpOZk', '2019-01-24 09:03:13', '2019-01-24 09:03:21', '::1'),
(76, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAwOTozMDozNyJ9.Cp2UFbXTPLPltE4NUydtzj5oIeqdD_x9ixfgxxQfHw4', '2019-01-24 09:30:37', '2019-01-24 09:38:38', '::1'),
(77, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAxMjoxMDoxMiJ9.hgNhivIaSD8G1LXYanfi8ZR_JIP-V2jcaojn8AQ7mCg', '2019-01-24 12:10:12', '2019-01-24 12:11:49', '::1'),
(78, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAxMjo1MDoxNyJ9.DQR8K0j4gDC8w-Oz1TimHCpRYyXcF9uYo2TtgnlUf_Y', '2019-01-24 12:50:17', '2019-01-24 12:54:13', '::1'),
(79, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAxNDo0Mzo0MyJ9.K-GgfrrtpWzmMo25BJfhqQVE2T8LiVXe3XC88pFGqnM', '2019-01-24 14:43:43', '2019-01-24 15:19:28', '::1'),
(80, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAxNTozODowNSJ9.eNhKjnYXUvd6wExCB9QKLjVcKN5IQwcPWOOXVUG6cQw', '2019-01-24 15:38:05', '2019-01-24 15:55:47', '::1'),
(81, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAxNTo1NjozOSJ9.yrEa8E020WO_B9-x4IWHWFMmkFJYvOYzpbJ4S9SCLP8', '2019-01-24 15:56:39', '2019-01-24 15:57:58', '::1'),
(82, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNCAxNjozMzo0NiJ9.gvQGuwx7NLcifQKVoSHEDZkSDg1LKo2BtRugYj_jDeQ', '2019-01-24 16:33:46', '2019-01-24 16:49:21', '::1'),
(83, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yNSAxNTo0MTozMSJ9.-z8BF3ZMklJc0jl_EvsODnxABI4xkBaYuqGw8CvEOFE', '2019-01-25 15:41:31', '2019-01-25 15:41:48', '::1'),
(84, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOCAwOToxNTo1MyJ9.88pDQWsaHzXDNDFCzE-oOnHueWd51ACm8-tvjaT9FIw', '2019-01-28 09:15:53', '2019-01-28 09:21:06', '::1'),
(85, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOCAxNToxNDo1MCJ9.WZNdgvz2XLPhnXKHcVNLMZIlztvbXFvYocIHE8tijho', '2019-01-28 15:14:50', '2019-01-28 15:16:21', '::1'),
(86, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAwOToyNjoyMCJ9.CzpE7SfAWNss8JJF9SW_z1WKEpVTUQsxoiBjls3eoj8', '2019-01-29 09:26:20', '2019-01-29 10:06:39', '::1'),
(87, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAxMDozMTowNCJ9.vSvzxVLkmyMJsQ9JNXSDCas7PxTGVyFdN1fJ7E55V9w', '2019-01-29 10:31:04', '2019-01-29 10:45:31', '::1'),
(88, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAxMzoxODo0MCJ9.yogBIft_purXFr9KNWwJ3yKET25hT41coOFRhhLdTgY', '2019-01-29 13:18:40', '2019-01-29 13:18:42', '::1'),
(89, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAxMzoyMDoyNSJ9.AgGdncK8Ebwg0hfF73GjK6A3SsO10YAf7OHu_cyb4Qg', '2019-01-29 13:20:25', '2019-01-29 13:21:25', '::1'),
(90, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAxNToxNDo0MiJ9.W6ZZ5eid38-0mb2NLPv8-KqBBT5IL1Ibj2PlBoFaMak', '2019-01-29 15:14:42', '2019-01-29 15:26:53', '::1'),
(91, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAxNTo0NTo1MyJ9.JN01g5TBFVwQrp11xKw4s-8ekh0qqZZihUZMoMvFLoM', '2019-01-29 15:45:53', '2019-01-29 16:09:18', '::1'),
(92, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAxNjo0MzowMSJ9.OvtTjryx-LTQy_leFUiPRgQO399Wqe7Bdsfb9X-faw8', '2019-01-29 16:43:01', '2019-01-29 16:48:52', '::1'),
(93, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0yOSAxNjo1NDo0MCJ9.OLwHVVZPaWGOyrUb35INigZipt_FGqu5duHwbEGqa2I', '2019-01-29 16:54:40', '2019-01-29 17:07:08', '::1'),
(94, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAwODo1NjozNCJ9.35Rq4XlQmcGMDK_rgXEoLdeEl0MBN9CltI1ChQhCoEw', '2019-01-30 08:56:34', '2019-01-30 08:58:00', '::1'),
(95, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAwOToyODozNSJ9.BYADIzR9qd0KOGEhqPwJrNdvmPIbCYTSavGbROkfbQY', '2019-01-30 09:28:35', '2019-01-30 09:32:32', '::1'),
(96, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAxMTo0MTowNyJ9.1juBGPlqdm6SIXNfsYFTx_ou_agIGY8lQ7WmwgvNqiQ', '2019-01-30 11:41:07', '2019-01-30 11:41:13', '::1'),
(97, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAxMjoyNjo1OSJ9.SHA5pvxuptMbXljM58HK9aBQDYFa9tyugr81S0egoZ8', '2019-01-30 12:26:59', '2019-01-30 13:02:29', '::1'),
(98, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAxMzowMjozOSJ9.Z6JZ0kB1vJl6jO5QEvOATojE-GflgzmFMGymJjY6hhs', '2019-01-30 13:02:39', '2019-01-30 13:03:03', '::1'),
(99, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAxNDo1MTozNiJ9.XSL64yBibwKpa2gileN-bYqBmNsD7cIjOv_uheUp6Hs', '2019-01-30 14:51:36', '2019-01-30 15:04:45', '::1'),
(100, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAxNTozMTowOSJ9.0J1Jzn40O14sNcU0-FO50iOyCoJhdLijvwKtv1ekE7I', '2019-01-30 15:31:09', '2019-01-30 16:26:48', '::1'),
(101, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMCAxNzoyNjowOCJ9.V0dVPy7iUVYoGI51LmJ_fmuQUr60DfScrE0avNRbsoY', '2019-01-30 17:26:08', '2019-01-30 17:26:11', '::1'),
(102, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxOCIsInRpbWVTdGFtcCI6IjIwMTktMDEtMzAgMTc6Mjg6NDAifQ.NFB_vaaeRPGr6a6xqJn4__ncMqpsDWIJyBxJyyBL8hM', '2019-01-30 17:28:40', '2019-01-30 17:37:29', '::1'),
(103, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAwOTowODoyNSJ9.unfezZ61bOhgdkb04S5UQ5Tp8Jx5fc2MA5QXlEv9f2s', '2019-01-31 09:08:25', '2019-01-31 09:08:26', '::1'),
(104, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAwOTozMjo0OSJ9.yemHjM04clyPBMFx3NqxqflkQaB_WsR6h8fzWKFdNwM', '2019-01-31 09:32:49', '2019-01-31 09:32:56', '::1'),
(105, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAwOTo0NDoyNyJ9.qWn_KRpAtz1_-NmVS6Vfdu3SfMPCKS8z2hEwVdREBdM', '2019-01-31 09:44:27', '2019-01-31 09:44:27', '::1'),
(106, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxMDowMzo1OSJ9.LMhdP_VXqmLx6K6qTgK-W4qMFX7J0iU33oFuAwkdom8', '2019-01-31 10:03:59', '2019-01-31 10:03:59', '::1'),
(107, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxMDowNDozNyJ9.13agi_iffr8OsZb0IPDk-S0HFzmD4WqTptWvuuVx1vQ', '2019-01-31 10:04:37', '2019-01-31 10:04:42', '::1'),
(108, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxMDoxNTowOSJ9.BIcgMJ6TsamVU9kg4JaQR8b728kj-ejNY5Vr80ymnNQ', '2019-01-31 10:15:09', '2019-01-31 10:15:57', '::1'),
(109, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxMDoxODoxMCJ9.ZiIvNrD9w0Hro91QMLaf5oJEzV5Yd86sH5O5cfos3Mw', '2019-01-31 10:18:10', '2019-01-31 10:18:42', '::1'),
(110, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxMDozMDozMiJ9.C4q9J7s1UHOVpqovJVbHXIQCPr3PEk_GteDNrr5qjp8', '2019-01-31 10:30:32', '2019-01-31 10:30:58', '::1'),
(111, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxMDo0MDowMiJ9.GPKybqqudk4RIY1HTzcjuN-X1ivolSIr_Jyll9njYrI', '2019-01-31 10:40:02', '2019-01-31 10:44:31', '::1'),
(112, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxMjozMDo1MCJ9.rOvy5cf2DnxELMwq3Qxt2IR_6L9avlpHpuWVfI6HtSE', '2019-01-31 12:30:50', '2019-01-31 13:12:08', '::1'),
(113, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMS0zMSAxNDoyMTo1NyJ9.pVd3ENFsomFPHN2-XmxxN4917Qmqnyw-xHrzYBppYqw', '2019-01-31 14:21:57', '2019-01-31 14:21:57', '::1'),
(114, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wMSAxMjoyNzoyMiJ9.OTJi7MDMbJAVyRq-rQw_aH_jSZAzR8AXzVIc9X5plwg', '2019-02-01 12:27:22', '2019-02-01 12:27:39', '::1'),
(115, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wMSAxNToyNToxOSJ9.XeeKRRI2vN9l7heW1_ntTor33X_YlzVMCuKvrc8tmEE', '2019-02-01 15:25:19', '2019-02-01 15:29:29', '::1'),
(116, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wMSAxNjo0OTo0OSJ9.yiTT3lG5h7SeaNbjqcT5xyEpoXrw59hbyGn36uzljE0', '2019-02-01 16:49:49', '2019-02-01 17:01:05', '::1'),
(117, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNCAwODoyNzo1MSJ9.xW15iuPa_2YX4XbQsLFD9OwI1OU5HYR22_qYlTE78sg', '2019-02-04 08:27:51', '2019-02-04 09:53:44', '::1'),
(118, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNCAxMDoxNTo1MCJ9.JGSBJq55ADaxk5AstJ_PgdXtth6aHXUKXbBPBva7UH4', '2019-02-04 10:15:50', '2019-02-04 10:31:03', '::1'),
(119, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNCAxMDo0NzozNyJ9.k8Omm5iupdndeoD864G25MMcbM---m0bTr1h1Chzz8M', '2019-02-04 10:47:37', '2019-02-04 11:01:28', '::1'),
(120, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNCAxMTo1NDo1MSJ9.w5uMlaPZ5TpAojXhj6wsXbSPPj_B23Sf2K512BsFX9g', '2019-02-04 11:54:51', '2019-02-04 12:35:33', '::1'),
(121, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNCAxNDoxMTo1OCJ9.lOteIxX4xooCo1SsrgH-6Vg30VuFO7Izmw_-Hfg5Xf8', '2019-02-04 14:11:58', '2019-02-04 15:32:40', '::1'),
(122, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNCAxNjowODoyNyJ9.CMQ_j9swv5m9FvogFBwvilwqpIVvnV0aEsWKC7VcidE', '2019-02-04 16:08:27', '2019-02-04 16:41:34', '::1'),
(123, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNCAxNzowMDowMCJ9.L9lOg0nWHnD11fxb1T4VPvldbsRitmlyJYfLS8x4Rh0', '2019-02-04 17:00:00', '2019-02-04 17:24:09', '::1'),
(124, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAwODo1NToxNCJ9.PhRJPKvdQ2O-EPEtRUjB96fB2pQuVRnGuioeI8U_gh8', '2019-02-05 08:55:14', '2019-02-05 09:16:47', '::1'),
(125, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAwOTo0Mjo0NCJ9.gdx0F2xsvxxKjw_UhmBf0_u8qLn22YEynViCJsoqxuo', '2019-02-05 09:42:44', '2019-02-05 09:56:19', '::1'),
(126, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAxMDoxODo0NSJ9.PXmU4dMqteJ01aQ9qKxGmf7tfrYb_GSRgehySZbJlBo', '2019-02-05 10:18:45', '2019-02-05 10:45:59', '::1'),
(127, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAxMTo1MDo1MCJ9.XiTXQk9XPfdllAAqdnUuPVjp6te1IJBh69ES35mKvwk', '2019-02-05 11:50:50', '2019-02-05 12:05:23', '::1'),
(128, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAxMjo0NjoyOSJ9.-9RRo7wIKvvlXdM1OOVHpA-2auWWt2QdAXPhy3KvpZM', '2019-02-05 12:46:29', '2019-02-05 12:46:33', '::1'),
(129, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAxODoxODowNSJ9.XHhRQcf11Xc4CzLdYfEc2TzVY7zuUmkekTf-I6WV2gU', '2019-02-05 18:18:05', '2019-02-05 18:39:52', '::1'),
(130, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAxOTo1OTo0NyJ9.uVHNwGhf58tdG44JZDy8RAk-mutdRQBWzeNXLYeK3-Q', '2019-02-05 19:59:47', '2019-02-05 20:00:10', '::1'),
(131, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNSAyMTowMTozNCJ9.h16PGNF60XGcWWaEoX2uCDqcWoEN_Y474TM2GGx45Wc', '2019-02-05 21:01:34', '2019-02-05 21:06:59', '::1'),
(132, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0wNiAyMDoxNTo0NCJ9.hMed_uOME-FyTWhQsLPnQYmO3rz32AqQI_t5GGfGtnM', '2019-02-06 20:15:44', '2019-02-06 20:40:44', '::1'),
(133, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMiAxNToyNDo0MSJ9.N8OylslqX_CGe-Ndx0owwqLTcsnylmxkX-MSlUQhQSg', '2019-02-12 15:24:41', '2019-02-12 15:24:52', '::1'),
(134, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMiAxNTo1NToyOSJ9.-fji2k2FSBngba9gFfAq31c1sd5oMTivT-nrmk12TpU', '2019-02-12 15:55:29', '2019-02-12 15:55:36', '::1'),
(135, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMiAxNzozMDozMiJ9.ybtZmDocUBEAl_ki3N9BPMMdNNxjLGwbdboyzsnm4YI', '2019-02-12 17:30:32', '2019-02-12 17:37:39', '::1'),
(136, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMiAxODowNzoxMSJ9.fAKPOaDNqFmDV_TdW4jDHjgfAlAh8JDTLmR_xBVjdKc', '2019-02-12 18:07:11', '2019-02-12 18:16:35', '::1'),
(137, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMiAxODo0MDozMSJ9.Y5RSt7s4uYZs92PV_iV7LlEJUnYcXSQuTLo8nRZtL0I', '2019-02-12 18:40:31', '2019-02-12 18:40:31', '::1'),
(138, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMiAyMTozMjoxMyJ9.5d1lsPVflH2BPuS1v3YXWunpUhqn0460FVZwHMjvuEc', '2019-02-12 21:32:13', '2019-02-12 21:32:38', '::1'),
(139, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMyAxNzo0ODozMiJ9.gdMs8BWkm2-GqJ-HKkfIB2zFCBIXjXE_sBwEQWbz39Q', '2019-02-13 17:48:32', '2019-02-13 17:48:32', '::1'),
(140, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMyAxODo1NTo0OCJ9.Sz8KX6M6g8GyxVC4zbLvHJMYh6_agPgF_FFbgsmdMh4', '2019-02-13 18:55:48', '2019-02-13 18:55:48', '::1'),
(141, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMyAyMDowMTowMiJ9.ViZDfGoNdMIqACICVc_9h12BJXtakypfvZRtaFy1H0E', '2019-02-13 20:01:02', '2019-02-13 20:01:07', '::1'),
(142, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMyAyMDoyMDo1OSJ9.-ZidJqLP6Evg_fHFalWE43HUQpWuJLkd0LtkBvsRSCM', '2019-02-13 20:20:59', '2019-02-13 20:23:37', '::1'),
(143, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMyAyMDo1NjozMiJ9.dFXXv8zj9e0ch2vHsvTp1zKILYp2OscsIC4E6dP2Wdg', '2019-02-13 20:56:32', '2019-02-13 21:06:33', '::1'),
(144, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMyAyMToyNjoxNCJ9.ET75tXMU5UC2DMBl0pT4PP3JpjYhg3D4ylFJQVzQ148', '2019-02-13 21:26:14', '2019-02-13 21:31:13', '::1'),
(145, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xMyAyMTo0NjoyNSJ9.XnHElUHRTwRh0TwaGNKQ4kpLUPzjg6u6gppH_Q3Le_4', '2019-02-13 21:46:25', '2019-02-13 22:28:15', '::1'),
(146, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNCAxNDoyMzo1MSJ9.ftOXAnwl88ynmLW0q_L8F2t1oawCyn5iTIb3I8UPzDQ', '2019-02-14 14:23:51', '2019-02-14 14:31:03', '::1'),
(147, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNCAxNDo1MjoyNSJ9.L0jmVOB9B-CPcOPtcOuAjbncFw9LXEWS0u-_gXQOvdQ', '2019-02-14 14:52:25', '2019-02-14 14:58:37', '::1'),
(148, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNCAxNTo1MzoyMSJ9.EHGCYcTQkYkngx_CRuoiQ7eHw7wSemism3rs_kEMq2s', '2019-02-14 15:53:21', '2019-02-14 15:53:26', '::1'),
(149, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNCAxNzoyNTozMiJ9._L_1phjeZWeY1LpltwBsdm0_GwdaRpAvzT4UxPC3yms', '2019-02-14 17:25:32', '2019-02-14 17:46:10', '::1'),
(150, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNCAxNzo1NjoxOCJ9.3REw5gdelbrskY55PoVXserQf-sFhJdK97oi7RJLiys', '2019-02-14 17:56:18', '2019-02-14 17:56:46', '::1'),
(151, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNCAyMToyMToxMCJ9.cF_AyQCCDPCGTweNR__wtZ8BM_yqVKcpCEDZI_xvPyU', '2019-02-14 21:21:10', '2019-02-14 21:33:05', '::1'),
(152, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNCAyMjozNToxNyJ9.Ju_HGNgk7B-uDV-G24ic0s69oac77VV2O8WwmNxgUQM', '2019-02-14 22:35:17', '2019-02-14 23:06:54', '::1'),
(153, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNSAxNjo1Njo1OSJ9.CP97NHtwCD3xXpP8kOlbV74aApmyd2ENRmOpbpEY18g', '2019-02-15 16:56:59', '2019-02-15 17:27:45', '::1'),
(154, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNSAxNjo1Njo1OSJ9.CP97NHtwCD3xXpP8kOlbV74aApmyd2ENRmOpbpEY18g', '2019-02-15 16:56:59', '2019-02-15 16:56:59', '::1'),
(155, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNSAxODowNzo1MiJ9.p3zwcaRG_NiYRW_QqvjldRUCV8m-W8LoqP8VN6CtQwc', '2019-02-15 18:07:52', '2019-02-15 18:15:38', '::1'),
(156, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNSAyMDoyOTo1OCJ9.yAcWFJtoFmsFvoeNWkdI-2yhZuvWo-omDov826plIsw', '2019-02-15 20:29:58', '2019-02-15 21:35:13', '::1'),
(157, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNSAyMjowNzo0NSJ9.wZF4OFggnJ9saLrtcAdLOdLiSnJ6kHn_uicV2CPQWdM', '2019-02-15 22:07:45', '2019-02-15 22:14:28', '::1'),
(158, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xNSAyMjo0MDo0OCJ9.MFsqZk2yU1JKRHctyiACPsOPUoNBEfZv1Fh9zu9XdGI', '2019-02-15 22:40:48', '2019-02-15 22:48:57', '::1'),
(159, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOCAxNDozNTo0NSJ9.HAjn-Ht8AK8lV03xStuvKEs-DAxNZ-YUdO3EE4cBK9s', '2019-02-18 14:35:45', '2019-02-18 14:35:54', '::1'),
(160, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOCAxNTowODo1MyJ9.fJXLYWanSsFpd1Y7fSqt8Tw6Gc6Y8Eogf9HgssPavhQ', '2019-02-18 15:08:53', '2019-02-18 16:03:25', '::1'),
(161, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOCAxNzozOTowOSJ9.977wqJGw-m3Ms2gGfFs2goJFDJp4HBizsYdTJ0x0pS4', '2019-02-18 17:39:09', '2019-02-18 18:52:54', '::1'),
(162, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOCAyMDowMzo1NCJ9.uIsNuVEKyEUbEZrsnt-ddVCBpmWrzg-iK8Xe_5cf2A0', '2019-02-18 20:03:54', '2019-02-18 20:03:55', '::1'),
(163, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOCAyMDoyNTozMCJ9.spJNZnyfBiwkVqbC2WYNtZJO5ErTLc_Y2wdLBKgZFmA', '2019-02-18 20:25:30', '2019-02-18 21:09:29', '::1'),
(164, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOCAyMjowMzoxNiJ9.7bQTIWuLL2ChRkZ7SqC0qiRFOdFN9XdfU9-hEbsWm88', '2019-02-18 22:03:16', '2019-02-18 22:20:27', '::1'),
(165, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOCAyMjozNjoyOSJ9.8nbNAKiK1jV3XWA6dnQhAedDd3ikqSTW-xrUEH6qJtg', '2019-02-18 22:36:29', '2019-02-18 22:37:02', '127.0.0.1'),
(166, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOSAxNDowMDo1OSJ9.1sOXjhYkr1X8d0j6pHbZAYH5WmE5N-3g__sADq11KLE', '2019-02-19 14:00:59', '2019-02-19 14:07:20', '::1'),
(167, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOSAxNToxMzoyOSJ9.N5uD3GyvnOhw5QQqN2k6SvZYen_F8IAX_oON0s12c-M', '2019-02-19 15:13:29', '2019-02-19 15:20:47', '::1'),
(168, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOSAxNToyMDo1NiJ9.r_FOq33Xx0JMITHI5BuuOiIMXPBJzzTKEHMMvNnmAJM', '2019-02-19 15:20:56', '2019-02-19 15:46:17', '::1'),
(169, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidGltZVN0YW1wIjoiMjAxOS0wMi0xOSAxNjowNjozMSJ9.5TtHAjP3iNrK7MygT5gB9yLNmK1ke7MagjD9eCJjXU8', '2019-02-19 16:06:31', '2019-02-19 16:28:58', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `user_project_rel`
--

DROP TABLE IF EXISTS `user_project_rel`;
CREATE TABLE IF NOT EXISTS `user_project_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `proj_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `proj_id` (`proj_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_project_rel`
--

INSERT INTO `user_project_rel` (`id`, `user_id`, `proj_id`) VALUES
(6, 1, 3),
(25, 1, 10),
(26, 1, 11),
(28, 1, 13),
(30, 1, 14),
(31, 1, 15),
(32, 1, 16),
(33, 1, 17),
(35, 1, 18),
(38, 20, 10),
(40, 1, 19),
(42, 19, 19),
(43, 20, 19),
(44, 21, 19),
(45, 5, 3),
(46, 19, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_role_cat`
--

DROP TABLE IF EXISTS `user_role_cat`;
CREATE TABLE IF NOT EXISTS `user_role_cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_role_cat`
--

INSERT INTO `user_role_cat` (`id`, `role`, `created_by`, `entry_time`, `update_time`, `ip_address`) VALUES
(1, 'Admin', 1, '2019-01-30 00:00:00', NULL, NULL),
(2, 'User', 1, '2019-01-30 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_ticket_rel`
--

DROP TABLE IF EXISTS `user_ticket_rel`;
CREATE TABLE IF NOT EXISTS `user_ticket_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachment`
--
ALTER TABLE `attachment`
  ADD CONSTRAINT `attachment_ibfk_1` FOREIGN KEY (`proj_id`) REFERENCES `project` (`proj_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attachment_ibfk_2` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`column_id`) REFERENCES `ticket_column` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`proj_id`) REFERENCES `project` (`proj_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`designation`) REFERENCES `user_designation_cat` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`role`) REFERENCES `user_role_cat` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `user_project_rel`
--
ALTER TABLE `user_project_rel`
  ADD CONSTRAINT `user_project_rel_ibfk_1` FOREIGN KEY (`proj_id`) REFERENCES `project` (`proj_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_project_rel_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_ticket_rel`
--
ALTER TABLE `user_ticket_rel`
  ADD CONSTRAINT `user_ticket_rel_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ticket_rel_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
