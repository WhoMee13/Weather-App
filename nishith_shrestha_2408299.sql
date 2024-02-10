-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2024 at 12:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nishith_shrestha_2408299`
--

-- --------------------------------------------------------

--
-- Table structure for table `weatherapp`
--

CREATE TABLE `weatherapp` (
  `city` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `main` text DEFAULT NULL,
  `temp` text DEFAULT NULL,
  `speed` text DEFAULT NULL,
  `humidity` text DEFAULT NULL,
  `pressure` text DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `datecreated` text DEFAULT NULL,
  `timecreated` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weatherapp`
--

INSERT INTO `weatherapp` (`city`, `description`, `main`, `temp`, `speed`, `humidity`, `pressure`, `icon`, `datecreated`, `timecreated`) VALUES
('london', 'overcast clouds', 'Clouds', '284.15', '7.2', '82', '1015', '04d', '01/25/2024', '14'),
('london', 'light rain', 'Rain', '285.35', '34.6', '76', '1018', '10d', '01/26/2024', '14'),
('london', 'overcast clouds', 'Clouds', '281.15', '13', '63', '1019', '04d', '01/27/2024', '15'),
('mumbai', 'smoke', 'Smoke', '307.14', '3.09', '22', '1015', '50d', '01/27/2024', '14'),
('sydney', 'broken clouds', 'Clouds', '296.09', '5.14', '72', '1006', '04n', '01/27/2024', '15'),
('kathmandu', 'few clouds', 'Clouds', '281.27', '1.03', '71', '1022', '02n', '01/27/2024', '22'),
('london', 'overcast clouds', 'Clouds', '283.12', '2.57', '77', '1021', '04d', '01/28/2024', '18'),
('mumbai', 'smoke', 'Smoke', '304.14', '4.12', '20', '1014', '50d', '01/28/2024', '18'),
('sydney', 'overcast clouds', 'Clouds', '295.6', '5.14', '79', '1014', '04n', '01/28/2024', '18'),
('kathmandu', 'few clouds', 'Clouds', '286.27', '3.09', '50', '1020', '02n', '01/28/2024', '18'),
('nagaon', 'broken clouds', 'Clouds', '299.86', '1.78', '48', '1015', '04n', '01/28/2024', '18'),
('london', 'broken clouds', 'Clouds', '282.77', '2.06', '91', '1021', '04n', '01/29/2024', '08'),
('sydney', 'few clouds', 'Clouds', '302.98', '9.26', '65', '1010', '02d', '01/29/2024', '08'),
('kathmandu', 'mist', 'Mist', '279.27', '1.03', '87', '1023', '50d', '01/29/2024', '08'),
('mumbai', 'smoke', 'Smoke', '297.14', '2.06', '38', '1016', '50d', '01/29/2024', '08'),
('tokyo', 'few clouds', 'Clouds', '282.64', '3.6', '38', '1026', '02d', '01/29/2024', '08'),
('london', 'overcast clouds', 'Clouds', '282.8', '6.17', '88', '1020', '04n', '01/30/2024', '10'),
('mumbai', 'smoke', 'Smoke', '299.14', '0', '44', '1016', '50d', '01/30/2024', '10'),
('sydney', 'broken clouds', 'Clouds', '298.52', '1.79', '78', '1013', '04d', '01/30/2024', '10'),
('pakistan', 'overcast clouds', 'Clouds', '281.79', '2.48', '42', '1018', '04d', '01/30/2024', '10'),
('kathmandu', 'mist', 'Mist', '283.27', '1.03', '71', '1022', '50d', '01/30/2024', '10'),
('london', 'overcast clouds', 'Clouds', '282.15', '19.1', '79', '1020', '04d', '01/31/2024', '14'),
('london', 'overcast clouds', 'Clouds', '281.29', '4.12', '79', '1028', '04n', '02/01/2024', '08'),
('kathmandu', 'mist', 'Mist', '282.27', '0', '81', '1022', '50d', '02/01/2024', '09');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
