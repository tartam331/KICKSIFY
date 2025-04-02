-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 02. 08:38
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kicksify`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `arvaltozas`
--

CREATE TABLE `arvaltozas` (
  `arvaltozas_id` int(11) NOT NULL,
  `cipo_id` int(11) DEFAULT NULL,
  `datum` datetime NOT NULL,
  `ar` decimal(10,2) NOT NULL,
  `exkluziv_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `arvaltozas`
--

INSERT INTO `arvaltozas` (`arvaltozas_id`, `cipo_id`, `datum`, `ar`, `exkluziv_id`) VALUES
(1, 1, '2025-01-01 10:00:00', 54990.00, NULL),
(2, 1, '2025-01-15 10:00:00', 53990.00, NULL),
(3, 1, '2025-02-01 10:00:00', 52990.00, NULL),
(4, 2, '2025-01-05 10:00:00', 89990.00, NULL),
(5, 2, '2025-01-20 10:00:00', 87990.00, NULL),
(6, 2, '2025-02-10 10:00:00', 85990.00, NULL),
(7, 3, '2025-01-10 10:00:00', 199990.00, NULL),
(8, 3, '2025-02-15 10:00:00', 189990.00, NULL),
(9, 3, '2025-03-01 10:00:00', 179990.00, NULL),
(10, 3, '2024-03-01 00:00:00', 36990.00, NULL),
(11, 3, '2024-03-10 00:00:00', 34990.00, NULL),
(12, 3, '2024-03-20 00:00:00', 32990.00, NULL),
(13, 4, '2024-03-10 00:00:00', 39990.00, NULL),
(14, 4, '2024-03-15 00:00:00', 37990.00, NULL),
(15, 4, '2024-03-25 00:00:00', 35990.00, NULL),
(16, 5, '2024-03-11 00:00:00', 42990.00, NULL),
(17, 5, '2024-03-16 00:00:00', 40990.00, NULL),
(18, 5, '2024-03-26 00:00:00', 38990.00, NULL),
(19, 6, '2024-03-12 00:00:00', 37990.00, NULL),
(20, 6, '2024-03-17 00:00:00', 35990.00, NULL),
(21, 6, '2024-03-27 00:00:00', 34990.00, NULL),
(22, 7, '2024-03-13 00:00:00', 45990.00, NULL),
(23, 7, '2024-03-18 00:00:00', 43990.00, NULL),
(24, 7, '2024-03-28 00:00:00', 41990.00, NULL),
(25, 8, '2024-03-14 00:00:00', 41990.00, NULL),
(26, 8, '2024-03-19 00:00:00', 39990.00, NULL),
(27, 8, '2024-03-29 00:00:00', 38990.00, NULL),
(28, 9, '2024-03-15 00:00:00', 38990.00, NULL),
(29, 9, '2024-03-20 00:00:00', 36990.00, NULL),
(30, 9, '2024-03-30 00:00:00', 35990.00, NULL),
(31, 10, '2024-03-16 00:00:00', 44990.00, NULL),
(32, 10, '2024-03-21 00:00:00', 42990.00, NULL),
(33, 10, '2024-03-31 00:00:00', 40990.00, NULL),
(34, 11, '2024-03-17 00:00:00', 39990.00, NULL),
(35, 11, '2024-03-22 00:00:00', 37990.00, NULL),
(36, 11, '2024-04-01 00:00:00', 36990.00, NULL),
(37, 12, '2024-03-18 00:00:00', 42990.00, NULL),
(38, 12, '2024-03-23 00:00:00', 40990.00, NULL),
(39, 12, '2024-04-02 00:00:00', 38990.00, NULL),
(40, 13, '2024-03-19 00:00:00', 37990.00, NULL),
(41, 13, '2024-03-24 00:00:00', 35990.00, NULL),
(42, 13, '2024-04-03 00:00:00', 34990.00, NULL),
(43, 14, '2024-03-20 00:00:00', 45990.00, NULL),
(44, 14, '2024-03-25 00:00:00', 43990.00, NULL),
(45, 14, '2024-04-04 00:00:00', 41990.00, NULL),
(46, 15, '2024-03-21 00:00:00', 41990.00, NULL),
(47, 15, '2024-03-26 00:00:00', 39990.00, NULL),
(48, 15, '2024-04-05 00:00:00', 38990.00, NULL),
(49, 16, '2024-03-22 00:00:00', 38990.00, NULL),
(50, 16, '2024-03-27 00:00:00', 36990.00, NULL),
(51, 16, '2024-04-06 00:00:00', 35990.00, NULL),
(52, 17, '2024-03-23 00:00:00', 44990.00, NULL),
(53, 17, '2024-03-28 00:00:00', 42990.00, NULL),
(54, 17, '2024-04-07 00:00:00', 40990.00, NULL),
(55, 18, '2024-03-24 00:00:00', 39990.00, NULL),
(56, 18, '2024-03-29 00:00:00', 37990.00, NULL),
(57, 18, '2024-04-08 00:00:00', 36990.00, NULL),
(58, 19, '2024-03-25 00:00:00', 42990.00, NULL),
(59, 19, '2024-03-30 00:00:00', 40990.00, NULL),
(60, 19, '2024-04-09 00:00:00', 38990.00, NULL),
(61, 20, '2024-03-26 00:00:00', 37990.00, NULL),
(62, 20, '2024-03-31 00:00:00', 35990.00, NULL),
(63, 20, '2024-04-10 00:00:00', 34990.00, NULL),
(64, 21, '2024-03-27 00:00:00', 45990.00, NULL),
(65, 21, '2024-04-01 00:00:00', 43990.00, NULL),
(66, 21, '2024-04-11 00:00:00', 41990.00, NULL),
(67, 22, '2024-03-28 00:00:00', 41990.00, NULL),
(68, 22, '2024-04-02 00:00:00', 39990.00, NULL),
(69, 22, '2024-04-12 00:00:00', 38990.00, NULL),
(70, 23, '2024-03-29 00:00:00', 38990.00, NULL),
(71, 23, '2024-04-03 00:00:00', 36990.00, NULL),
(72, 23, '2024-04-13 00:00:00', 35990.00, NULL),
(73, 24, '2024-03-30 00:00:00', 44990.00, NULL),
(74, 24, '2024-04-04 00:00:00', 42990.00, NULL),
(75, 24, '2024-04-14 00:00:00', 40990.00, NULL),
(76, 25, '2024-03-31 00:00:00', 39990.00, NULL),
(77, 25, '2024-04-05 00:00:00', 37990.00, NULL),
(78, 25, '2024-04-15 00:00:00', 36990.00, NULL),
(79, 26, '2024-04-01 00:00:00', 42990.00, NULL),
(80, 26, '2024-04-06 00:00:00', 40990.00, NULL),
(81, 26, '2024-04-16 00:00:00', 38990.00, NULL),
(82, 27, '2024-04-02 00:00:00', 37990.00, NULL),
(83, 27, '2024-04-07 00:00:00', 35990.00, NULL),
(84, 27, '2024-04-17 00:00:00', 34990.00, NULL),
(85, 28, '2024-04-03 00:00:00', 45990.00, NULL),
(86, 28, '2024-04-08 00:00:00', 43990.00, NULL),
(87, 28, '2024-04-18 00:00:00', 41990.00, NULL),
(88, 29, '2024-04-04 00:00:00', 41990.00, NULL),
(89, 29, '2024-04-09 00:00:00', 39990.00, NULL),
(90, 29, '2024-04-19 00:00:00', 38990.00, NULL),
(91, 30, '2024-04-05 00:00:00', 38990.00, NULL),
(92, 30, '2024-04-10 00:00:00', 36990.00, NULL),
(93, 30, '2024-04-20 00:00:00', 35990.00, NULL),
(94, 31, '2024-04-06 00:00:00', 44990.00, NULL),
(95, 31, '2024-04-11 00:00:00', 42990.00, NULL),
(96, 31, '2024-04-21 00:00:00', 40990.00, NULL),
(97, 32, '2024-04-07 00:00:00', 39990.00, NULL),
(98, 32, '2024-04-12 00:00:00', 37990.00, NULL),
(99, 32, '2024-04-22 00:00:00', 36990.00, NULL),
(100, 33, '2024-04-08 00:00:00', 42990.00, NULL),
(101, 33, '2024-04-13 00:00:00', 40990.00, NULL),
(102, 33, '2024-04-23 00:00:00', 38990.00, NULL),
(103, 34, '2024-04-09 00:00:00', 37990.00, NULL),
(104, 34, '2024-04-14 00:00:00', 35990.00, NULL),
(105, 34, '2024-04-24 00:00:00', 34990.00, NULL),
(106, 35, '2024-04-10 00:00:00', 45990.00, NULL),
(107, 35, '2024-04-15 00:00:00', 43990.00, NULL),
(108, 35, '2024-04-25 00:00:00', 41990.00, NULL),
(109, 36, '2024-04-11 00:00:00', 41990.00, NULL),
(110, 36, '2024-04-16 00:00:00', 39990.00, NULL),
(111, 36, '2024-04-26 00:00:00', 38990.00, NULL),
(112, 37, '2024-04-12 00:00:00', 38990.00, NULL),
(113, 37, '2024-04-17 00:00:00', 36990.00, NULL),
(114, 37, '2024-04-27 00:00:00', 35990.00, NULL),
(115, 38, '2024-04-13 00:00:00', 44990.00, NULL),
(116, 38, '2024-04-18 00:00:00', 42990.00, NULL),
(117, 38, '2024-04-28 00:00:00', 40990.00, NULL),
(118, 39, '2024-04-14 00:00:00', 39990.00, NULL),
(119, 39, '2024-04-19 00:00:00', 37990.00, NULL),
(120, 39, '2024-04-29 00:00:00', 36990.00, NULL),
(121, 40, '2024-04-15 00:00:00', 42990.00, NULL),
(122, 40, '2024-04-20 00:00:00', 40990.00, NULL),
(123, 40, '2024-04-30 00:00:00', 38990.00, NULL),
(124, 41, '2024-04-16 00:00:00', 37990.00, NULL),
(125, 41, '2024-04-21 00:00:00', 35990.00, NULL),
(126, 41, '2024-05-01 00:00:00', 34990.00, NULL),
(127, 42, '2024-04-17 00:00:00', 45990.00, NULL),
(128, 42, '2024-04-22 00:00:00', 43990.00, NULL),
(129, 42, '2024-05-02 00:00:00', 41990.00, NULL),
(130, 43, '2024-04-18 00:00:00', 41990.00, NULL),
(131, 43, '2024-04-23 00:00:00', 39990.00, NULL),
(132, 43, '2024-05-03 00:00:00', 38990.00, NULL),
(133, 44, '2024-04-19 00:00:00', 38990.00, NULL),
(134, 44, '2024-04-24 00:00:00', 36990.00, NULL),
(135, 44, '2024-05-04 00:00:00', 35990.00, NULL),
(136, 45, '2024-04-20 00:00:00', 44990.00, NULL),
(137, 45, '2024-04-25 00:00:00', 42990.00, NULL),
(138, 45, '2024-05-05 00:00:00', 40990.00, NULL),
(139, 46, '2024-04-21 00:00:00', 39990.00, NULL),
(140, 46, '2024-04-26 00:00:00', 37990.00, NULL),
(141, 46, '2024-05-06 00:00:00', 36990.00, NULL),
(142, 47, '2024-04-22 00:00:00', 42990.00, NULL),
(143, 47, '2024-04-27 00:00:00', 40990.00, NULL),
(144, 47, '2024-05-07 00:00:00', 38990.00, NULL),
(145, 48, '2024-04-23 00:00:00', 37990.00, NULL),
(146, 48, '2024-04-28 00:00:00', 35990.00, NULL),
(147, 48, '2024-05-08 00:00:00', 34990.00, NULL),
(148, 49, '2024-04-24 00:00:00', 45990.00, NULL),
(149, 49, '2024-04-29 00:00:00', 43990.00, NULL),
(150, 49, '2024-05-09 00:00:00', 41990.00, NULL),
(151, 50, '2024-04-25 00:00:00', 41990.00, NULL),
(152, 50, '2024-04-30 00:00:00', 39990.00, NULL),
(153, 50, '2024-05-10 00:00:00', 38990.00, NULL),
(154, 51, '2024-04-26 00:00:00', 38990.00, NULL),
(155, 51, '2024-05-01 00:00:00', 36990.00, NULL),
(156, 51, '2024-05-11 00:00:00', 35990.00, NULL),
(157, 52, '2024-04-27 00:00:00', 44990.00, NULL),
(158, 52, '2024-05-02 00:00:00', 42990.00, NULL),
(159, 52, '2024-05-12 00:00:00', 40990.00, NULL),
(160, 53, '2024-04-28 00:00:00', 39990.00, NULL),
(161, 53, '2024-05-03 00:00:00', 37990.00, NULL),
(162, 53, '2024-05-13 00:00:00', 36990.00, NULL),
(163, 54, '2024-04-29 00:00:00', 42990.00, NULL),
(164, 54, '2024-05-04 00:00:00', 40990.00, NULL),
(165, 54, '2024-05-14 00:00:00', 38990.00, NULL),
(166, NULL, '2018-06-23 00:00:00', 899990.00, 1),
(167, NULL, '2018-06-28 00:00:00', 897990.00, 1),
(168, NULL, '2018-07-03 00:00:00', 895990.00, 1),
(169, NULL, '2023-03-07 00:00:00', 789990.00, 2),
(170, NULL, '2023-03-12 00:00:00', 787990.00, 2),
(171, NULL, '2023-03-17 00:00:00', 785990.00, 2),
(172, NULL, '2022-07-19 00:00:00', 2999990.00, 3),
(173, NULL, '2022-07-24 00:00:00', 2997990.00, 3),
(174, NULL, '2022-07-29 00:00:00', 2995990.00, 3),
(175, NULL, '2017-04-29 00:00:00', 239000.00, 4),
(176, NULL, '2017-05-04 00:00:00', 237000.00, 4),
(177, NULL, '2017-05-09 00:00:00', 235000.00, 4),
(178, NULL, '2020-03-20 00:00:00', 349990.00, 5),
(179, NULL, '2020-03-25 00:00:00', 347990.00, 5),
(180, NULL, '2020-03-30 00:00:00', 345990.00, 5),
(181, NULL, '2020-08-13 00:00:00', 349990.00, 6),
(182, NULL, '2020-08-18 00:00:00', 347990.00, 6),
(183, NULL, '2020-08-23 00:00:00', 345990.00, 6),
(184, NULL, '2022-07-07 00:00:00', 299990.00, 8),
(185, NULL, '2022-07-12 00:00:00', 297990.00, 8),
(186, NULL, '2022-07-17 00:00:00', 295990.00, 8),
(187, NULL, '2021-07-29 00:00:00', 1899990.00, 9),
(188, NULL, '2021-08-03 00:00:00', 1897990.00, 9),
(189, NULL, '2021-08-08 00:00:00', 1895990.00, 9);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `beszallitott_termekek`
--

CREATE TABLE `beszallitott_termekek` (
  `termek_id` int(11) NOT NULL,
  `szallito_id` int(11) NOT NULL,
  `cipo_id` int(11) NOT NULL,
  `beszerzesi_ar` decimal(10,2) NOT NULL,
  `rendeles_darabszam` int(11) NOT NULL,
  `beszallitas_datuma` timestamp NOT NULL DEFAULT current_timestamp(),
  `exkluziv_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cipok`
--

CREATE TABLE `cipok` (
  `cipo_id` int(11) NOT NULL,
  `szin` varchar(50) NOT NULL,
  `cikkszam` varchar(50) NOT NULL,
  `marka` varchar(100) NOT NULL,
  `modell` varchar(100) NOT NULL,
  `megjelenes` date DEFAULT NULL,
  `ar` decimal(10,2) NOT NULL,
  `kep` varchar(255) NOT NULL,
  `leiras` text DEFAULT NULL,
  `fizetes_szallitas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `cipok`
--

INSERT INTO `cipok` (`cipo_id`, `szin`, `cikkszam`, `marka`, `modell`, `megjelenes`, `ar`, `kep`, `leiras`, `fizetes_szallitas`) VALUES
(1, 'Fekete-Fehér', 'CW1588-100', 'Nike', 'Nike Dunk Low Retro White Black', '2021-03-01', 54990.00, 'nike_dunk_low_retro_white_black_1.jpg, nike_dunk_low_retro_white_black_2.jpg,\r\nnike_dunk_low_retro_white_black_3.jpg', 'A Nike Dunk tökéletes választás...', 'Utánvéttel és bankkártyás fizetés'),
(2, 'Sárga-Zöld', 'HJ3386-300', 'Nike', 'Nike SB Dunk Low Chameleon', '2023-06-15', 89990.00, 'nike_sb_dunk_low_alexis_sablone_chameleon_1.jpg,\r\nnike_sb_dunk_low_alexis_sablone_chameleon_2.jpg,\r\nnike_sb_dunk_low_alexis_sablone_chameleon_3.jpg', 'Nike SB Dunk Low Chameleon leírás...', 'Utánvéttel és bankkártyás fizetés'),
(3, 'Zöld-Kék', 'FN6040-400', 'Nike', 'Nike SB Dunk Low Verdy Visty', '2024-09-01', 199990.00, 'nike_sb_dunk_low_verdy_visty_1.jpg,\r\nnike_sb_dunk_low_verdy_visty_2.jpg,\r\nnike_sb_dunk_low_verdy_visty_3.jpg', 'A Nike SB Dunk Low Verdy Visty egy friss és játékos változata az ikonikus SB Dunk modellnek, amelyet a japán művész Verdyvel való együttműködés hívott életre. Ez a szemet gyönyörködtető tornacipő Verdy „VISTY” karakteréből merít ihletet, és a kreativitást és az utcai stílust ötvözi egy kiemelkedő dizájnban. A színpaletta egy pasztell álom, a kék tekintet, a világos sarkvidéki rózsaszín és a sárga árnyalatok szeszélyes hangulatot kölcsönöznek a klasszikus sziluettnek.\r\n\r\nA Verdy Visty Dunk egyik legkülönlegesebb aspektusa az anyagkeverék. A bolyhos, szőrös textúra a toe boxon, a középső panelen, a nyelven és a sarokgalléron dimenziót és személyiséget kölcsönöz a tornacipőnek, míg a rózsaszín bőr Nike swoosh sima kontrasztot ad hozzá. A pasztellkék kordbársony felsőrész teszi teljessé a dizájnt, vintage, mégis modern esztétikát kölcsönözve a cipőnek. A sárga középtalp és a hozzá illő cipőfűzők extra színt adnak, így ez a Dunk azonnal feltűnő lesz..', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(4, 'Barna-Kék', 'FZ3129-200', 'Nike', 'Nike SB Dunk Low Big Money Savings', '2024-04-22', 84990.00, 'nike_sb_dunk_low_big_money_savings_1.jpg,\r\nnike_sb_dunk_low_big_money_savings_2.jpg,\r\nnike_sb_dunk_low_big_money_savings_3.jpg', 'A Nike Dunk az utóbbi idők egyik legfelkapottabb sneaker modelljévé vált. A cipő gördeszkázásra nagyon alkalmas ezért is az egyik leghíresebb \"deszkás\" sneaker ami a 2020-as évtől kapott hype-ot. Azóta rengeteg kollaborációt, különleges modellt épített fel rá a Nike, ami a 2000-2010-es évek után most éli a reneszánszát.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(5, 'Szürke-Fehér', 'DD1503-103', 'Nike', 'Nike Dunk Low Photon Dust', '2021-04-07', 69990.00, 'nike_dunk_low_photon_dust_1.jpg,\r\nnike_dunk_low_photon_dust_2.jpg,\r\nnike_dunk_low_photon_dust_3.jpg', 'A Nike Dunk az utóbbi idők egyik legfelkapottabb sneaker modelljévé vált. A cipő gördeszkázásra nagyon alkalmas ezért is az egyik leghíresebb \"deszkás\" sneaker ami a 2020-as évtől kapott hype-ot. Azóta rengeteg kollaborációt, különleges modellt épített fel rá a Nike, ami a 2000-2010-es évek után most éli a reneszánszát.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(6, 'Lila-Fehér', 'DV5464-500', 'Nike', 'Nike SB Dunk Low Pro ISO Court Purple', '2023-06-15', 89990.00, 'nike_sb_dunk_low_pro_iso_court_purple_1.jpg,\r\nnike_sb_dunk_low_pro_iso_court_purple_2.jpg,\r\nnike_sb_dunk_low_pro_iso_court_purple_3.jpg', 'A Nike Dunk az utóbbi idők egyik legfelkapottabb sneaker modelljévé vált. A cipő gördeszkázásra nagyon alkalmas ezért is az egyik leghíresebb \"deszkás\" sneaker ami a 2020-as évtől kapott hype-ot. Azóta rengeteg kollaborációt, különleges modellt épített fel rá a Nike, ami a 2000-2010-es évek után most éli a reneszánszát.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(7, 'Kék-Zöld', 'HF6061-400', 'Nike', 'Nike SB Dunk Low Futura Laboratories Bleached Aqua', '2024-05-29', 149000.00, 'nike_sb_dunk_low_futura_laboratories_bleached_aqua_1.jpg,\r\nnike_sb_dunk_low_futura_laboratories_bleached_aqua_2.jpg,\r\nnike_sb_dunk_low_futura_laboratories_bleached_aqua_3.jpg', 'A Nike Dunk az utóbbi idők egyik legfelkapottabb sneaker modelljévé vált. A cipő gördeszkázásra nagyon alkalmas ezért is az egyik leghíresebb \"deszkás\" sneaker ami a 2020-as évtől kapott hype-ot. Azóta rengeteg kollaborációt, különleges modellt épített fel rá a Nike, ami a 2000-2010-es évek után most éli a reneszánszát.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(8, 'Sárga_Zöld', 'CU1727-700', 'Nike', 'Nike Dunk Low SP Brazil', '2020-05-20', 94990.00, 'nike_dunk_low_sp_brazil_1.jpg,\r\nnike_dunk_low_sp_brazil_2.jpg,\r\nnike_dunk_low_sp_brazil_3.jpg', 'A Nike Dunk az utóbbi idők egyik legfelkapottabb sneaker modelljévé vált. A cipő gördeszkázásra nagyon alkalmas ezért is az egyik leghíresebb \"deszkás\" sneaker ami a 2020-as évtől kapott hype-ot. Azóta rengeteg kollaborációt, különleges modellt épített fel rá a Nike, ami a 2000-2010-es évek után most éli a reneszánszát.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(9, 'Piros-Fehér', 'BQ6817-600', 'Nike', 'Nike SB Dunk Low J-Pack Chicago', '2020-09-01', 79990.00, 'nike_sb_dunk_low_jpack_chicago_1.jpg,\r\nnike_sb_dunk_low_jpack_chicago_2.jpg,\r\nnike_sb_dunk_low_jpack_chicago_3.jpg', 'A Nike Dunk az utóbbi idők egyik legfelkapottabb sneaker modelljévé vált. A cipő gördeszkázásra nagyon alkalmas ezért is az egyik leghíresebb \"deszkás\" sneaker ami a 2020-as évtől kapott hype-ot. Azóta rengeteg kollaborációt, különleges modellt épített fel rá a Nike, ami a 2000-2010-es évek után most éli a reneszánszát.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(10, 'Fekete', 'CT8532-001', 'Jordan', 'Jordan 3 Retro Black Cat (2025)', '2025-01-01', 104990.00, 'jordan_3_retro_black_cat_1.jpg,\r\njordan_3_retro_black_cat_2.jpg,\r\njordan_3_retro_black_cat_3.jpg', 'Az Air Jordan 3 Retro Black Cat (2025) egy ikonikus sziluett újjáélesztése, amely lopakodó eleganciát sugároz. A prémium fekete nubukba burkolt cipő finom, sötét szén akcentusokat mutat a jellegzetes elefántmintás feliratokon. A monokróm dizájnt fekete lakkbőr, egyedi elefántmintás cipőfűző és minimális fekete és krómozott márkajelzés emeli, tiszta, mégis erőteljes esztétikát teremtve, amely a Jordan legendás „Black Cat” személyiségére emlékeztet.\r\n\r\nA Black Cat modern értelmezése frissített anyagokkal rendelkezik, így legalább annyira funkcionális, mint amennyire stílusos. A klasszikus Jumpman logó a nyelven és a sarkon megőrzi időtlen vonzerejét, míg a látható Air egységek a talpban kényelmet és tartós retro hangulatot biztosítanak. Ez az elegáns kialakítás tökéletesen egyensúlyoz a kortárs hangulat és a Jordan gazdag öröksége között.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(11, 'Fekete', 'HV6674-067', 'Jordan', 'Jordan 1 Retro High 85 OG Bred (2025)', '2025-02-01', 154990.00, 'jordan_1_retro_high_85_og_bred_1.jpg,\r\njordan_1_retro_high_85_og_bred_2.jpg,\r\njordan_1_retro_high_85_og_bred_3.jpg', 'Az Air Jordan 1 Retro High 85 OG Bred (2025) a sneakerek történetének egyik legikonikusabb színösszeállítását hozza vissza. Az eredetileg 1985-ben piacra dobott és az NBA által „betiltott” fekete-piros dizájn a lázadást és a stílust szimbolizálja. A 40. évfordulóra a Jordan Brand egy aprólékosan megtervezett, frissített kiadást kínál, amely prémium bőrszerkezettel és összetéveszthetetlen színblokkolással tér vissza az eredeti stílusához.\r\n\r\nA kissé magasabb felépítéssel és a nagyobb, karcsúbb swoosh-sal a legújabb retrócipőkhöz képest ez a pár olyan közel áll az 1985-ös változathoz, amennyire csak lehet. A fekete bőr alapot vörös színű, egyetemi vörös felsőrész és tiszta fehér középtalp hangsúlyozza, míg a további jellemzők közé tartozik a gumi külső talp a tartósság érdekében, az extra fűző és a nosztalgikus felirat. Mindegyik pár az eredeti stílusú dobozban van csomagolva, így a retro élményt a gyűjtők és a rajongók számára is teljessé teszi.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(12, 'Fekete-Piros', 'DZ5485-106', 'Jordan', 'Jordan 1 Retro High OG Black Toe Reimagined', '2025-02-01', 99990.00, 'jordan_1_retro_high_og_black_toe_reimagined_1.jpg,\r\njordan_1_retro_high_og_black_toe_reimagined_2.jpg,\r\njordan_1_retro_high_og_black_toe_reimagined_3.jpg', 'Az Air Jordan 1 Retro High OG „Black Toe Reimagined” visszahozza az OG mintaszínt, amely egy korai MJ újonc fotózáson vált híressé. A high-top egy sima bőr felsőrészt használ, amely fehér alapot tartalmaz, fekete hangsúlyokkal az elülső talpbetéten, a galléron és a Swoosh-on. A Varsity Red kontrasztos színű betétek a sarokrészen és a gallérszárnyon találhatók, a hagyományos Wings logó helyett az „Air Jordan” szöveggel jelölve. A fekete nejlonnyelvet egy szőtt Nike Air címke díszíti. A tornacipőt egy gumi talpbetét rögzíti, amelyet fehér oldalfalak és egy bíborvörös színű külső talpbetét emel ki.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(13, 'Fekete-Piros', '861428-106', 'Jordan', 'Air Jordan 1 Retro High OG NRG Not For Resale', '2018-12-25', 369990.00, 'jordan_1_retro_high_og_nrg_not_for_resale_1.jpg,\r\njordan_1_retro_high_og_nrg_not_for_resale_2.jpg,\r\njordan_1_retro_high_og_nrg_not_for_resale_3.jpg', 'Az Air Jordan 1 „Not For Resale - Red” 2018-ban jelent meg Michael Jordan első aláírt cipőjének különleges kiadásaként. A Jordan 1 a cipő egészén grafikus üzenetekkel van ellátva, amelyek arra ösztönzik a felhasználókat, hogy viseljék a párjukat. A sneaker-kultúra trendjeire adott nyelves válaszként a cipő a cipő felsőrészén és a talpközépen olyan szövegeket tartalmaz, mint „NOT FOR RESALE”, „NO PHOTOS”, „PLEASE CREASE” és „WEAR ME”. Az Air Jordan 1 belsejében még több üzenet található, köztük a „GENERAL RELEASE” és a „NO L s”. Az Air Jordan 1 „Not For Resale - Red” fekete, fehér és piros bőr felsőrésszel rendelkezik, amely a legendás modell OG színváltozataira emlékeztet.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(14, 'Fekete-Barna', 'DM7866-202', 'Jordan', 'Jordan 1 Retro Low OG SP Travis Scott Velvet Brown', '2024-12-05', 249990.00, 'jordan_1_retro_low_og_sp_travis_scott_velvet_brown_1.jpg,\r\njordan_1_retro_low_og_sp_travis_scott_velvet_brown_2.jpg,\r\njordan_1_retro_low_og_sp_travis_scott_velvet_brown_3.jpg', 'Az Air Jordan 1 Retro Low OG SP Travis Scott Velvet Brown egy friss együttműködés, amely könnyedén egyesíti Travis Scott esztétikájának merészségét a Jordan 1 sziluett időtlen vonzerejével. A sötét mokka, fekete és bársonybarna színben pompázó sneaker egy olyan földszínű palettát ölel fel, amely egyszerre robusztus és fényűző. Az aláírt Cactus Jack márkajelzés és a fordított Swoosh dizájn kiemeli a cipő egyediségét, így a gyűjtők és rajongók számára kötelező darab.\r\n\r\nA sneaker piacot gyökeresen megváltoztatta a Jordan 1-es sziluett. Az első modell 1984-ben jelent meg, azóta hatalmas hype övezi. Nem csoda hiszen az élő kosár legenda által fémjelzett sneakerről beszélünk. Rengeteg fajta Jordan jelent meg,  leghíresebb típusai a fennt említett Jordan 1 low, mid, high, ezen kívül a Jordan 4, 6, 11 hódít mostanában a legnagyobbat.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(15, 'Fekete-Barna', 'FZ8117-204', 'Jordan', 'Jordan Jumpman Jack TR Travis Scott Dark Mocha', '2024-11-23', 199990.00, 'jordan_jumpman_jack_tr_travis_scott_dark_mocha_1.jpg,\r\njordan_jumpman_jack_tr_travis_scott_dark_mocha_2.jpg,\r\njordan_jumpman_jack_tr_travis_scott_dark_mocha_3.jpg', 'Az Air Jordan Jumpman Jack TR Travis Scott Dark Mocha, más néven Jordan CJ1 T-Rexx a harmadik színváltozata Travis Scott aláírt cipőmodelljének, a Jumpman Jacknek.\r\n\r\nEz a Dark Mocha színváltozat teljesen fekete és barna dizájnnal rendelkezik, tépőzáras nyelvpánttal, fordított swoosh márkajelzéssel és az Air Jordan logóval a nyelven. A tornacipő alján egyedi Cactus Jack márkajelzés is látható. Ez a színváltozat messze a Jumpman Jack eddigi legsemlegesebb és leghalkabb színváltozata, így sokoldalúan felhasználható edzőcipő számos különböző alkalomra. Ahogy Travis Scott továbbra is új magasságokba emelkedik, a tornacipője és biztosan olyan forró lesz, mint valaha.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(16, 'Fekete-Szürke', 'FQ8138-002', 'Jordan', 'Jordan 4 Retro Fear', '2024-11-30', 124990.00, 'jordan_4_retro_fear_1.jpg,\r\njordan_4_retro_fear_2.jpg,\r\njordan_4_retro_fear_3.jpg', 'A Jordan 4 Retro Fear (2024) a Fear Pack egyik legjobban várt kiadásának visszatérését jelenti. Az eredetileg 2013-ban megjelent Fear Pack Michael Jordan kudarctól való félelmét és a kudarc leküzdésére irányuló törekvését hivatott feltárni. A Jordan 4 Fear kiemelkedett a csomagból a karcsú fekete, antracit és tiszta platina színösszeállításával, amely merész, éles megjelenést kölcsönzött az ikonikus sziluettnek. A Jordan 4 jellegzetessége, a nyelvén található, jellegzetes repülési folt hangsúlyozza a modell kapcsolatát MJ örökségével és hatásával a pályán és azon kívül is.\r\n\r\nA prémium minőségű bőr és nubuk keverékéből készült Jordan 4 Fear a tartósság és a stílus tökéletes keverékét kínálja. A látható Air párnázó egység kiváló kényelmet biztosít, míg a stabil kialakítás biztosítja, hogy a tornacipő teljesítménye megfeleljen a feltűnő megjelenésének. A visszafogott fekete és szürke tónusokat fehér hangsúlyok kontrasztosítják, így ez az egyik legsokoldalúbb és legstílusosabb tornacipő a Jordan termékcsaládban. A Jordan 4 továbbra is egyre népszerűbb, és megszilárdítja helyét a sneakerheadek rajongóinak kedvenceként.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(17, 'Fekete-Szürke', 'AQ9129-501', 'Jordan', 'Jordan 4 Retro Orchid', '2024-10-22', 129990.00, 'jordan_4_retro_orchid_1.jpg,\r\njordan_4_retro_orchid_2.jpg,\r\njordan_4_retro_orchid_3.jpg', 'A Jordan 4 Retro Orchid egy élénk új színváltozatot mutat be minden idők egyik legikonikusabb Air Jordanjéhez. A Jordan 4 már régóta a rajongók kedvence, mind Michael Jordan karrierjének történelmi jelentősége, mind időtlen dizájnja miatt. Ez a női exkluzív kiadás lenyűgöző orchidea velúr felsőrésszel rendelkezik, amelyet semleges szürke, fekete és fehér tónusok hangsúlyoznak. A pöttyözött középtalp, a szárnyak és a hátsó fül még inkább feldobja ezt az amúgy is figyelemfelkeltő cipőt.\r\n\r\nA Jordan 4 ismert a jellegzetes dizájnelemekről, köztük a hálós panelezésről, a látható Air párnázottságról és a műanyag szárnyas fűzőlyukakról, amelyek egyszerre biztosítják a stílust és a funkcionalitást. Az 1989-ben először bemutatott Jordan 4 gyorsan kulturális ikonná vált, amelyet a pályán nyújtott teljesítménye és a pályán kívüli vonzereje miatt ünnepeltek. Az Orchid színváltozat friss, merész megjelenést kölcsönöz ennek a szeretett modellnek, tökéletes azok számára, akik szeretnének kitűnni, miközben tisztelegnek a sneaker-történelem egy darabja előtt.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(18, 'Fehér-Szürke', 'CT8532-106', 'Jordan', 'Jordan 3 Retro Cement Grey', '2024-08-22', 104990.00, 'jordan_3_retro_cement_grey_1.jpg,\r\njordan_3_retro_cement_grey_2.jpg,\r\njordan_3_retro_cement_grey_3.jpg', 'A Jordan 3 Retro Cement Grey a Reimagined sorozat részeként jelent meg, amely a Jordan márka klasszikus modelljeit és színváltozatait a mai vásárlók számára frissíti.\r\n\r\nAz 1988-as eredeti tornacipő által inspirált Air Jordan 3 Retro ezen változata egy „Cement Grey” színváltozatot ad hozzá, amely Summit White, Cement Grey, Fire Red és fekete színeket tartalmaz. Ez a színkombináció tisztelgés az ikonikus „White Cement” színváltozat előtt. A Cement Grey Jordan 3 Retro cipő további örökségi jellemzőkkel büszkélkedhet, többek között elefántbőr mintával a sarok, az elülső lábfej és a fűzőketrec körül. A felsőrész prémium bőrből készült, merész Jordan márkajelzéssel, beleértve a nagy, tűzpiros Jumpman logót a bőrnyelven és a fekete Jumpman logót AIR felirattal a sarokrészen gumírozva.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(19, 'Fekete-Fehér', 'GN1232-234', 'Balenciaga', 'Mens Triple S Sneaker in Black', '2017-09-21', 359000.00, 'mens_triple_s_sneaker_in_black_1.jpg,\r\nmens_triple_s_sneaker_in_black_2.jpg,\r\nmens_triple_s_sneaker_in_black_3.jpg', '\r\n • Bőrmentes\r\n•Edzőcipő\r\n• Dupla habszivacs és hálós tornacipő\r\n• Hímzett méret a lábujj szélén\r\n• Hímzett logó az oldalán\r\n• Dombornyomott logó hátul\r\n• Triple S gumi márkajelzés a nyelven\r\n• 2 fűzős hurok, köztük 1 funkcionális\r\n• Fűzőrendszer 12 szövetfűzőlyukkal\r\n• Kétszínű fűzők, amelyek a túrabakancs fűzőjét idézik\r\n• Hát és nyelv felhúzható fül\r\n• Mosott hatás a kopott megjelenésért\r\n• 1 további pár fűző\r\n• Kínában készült', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(20, 'Fekete', 'ZT5343-666', 'Balenciaga', 'Mens Triple S Clear Sole Sneaker in Black', '2017-09-21', 359000.00, 'mens_triple_s_clear_sole_sneaker_in_black_1.jpg,\r\nmens_triple_s_clear_sole_sneaker_in_black_2.jpg,\r\nmens_triple_s_clear_sole_sneaker_in_black_3.jpg', '\r\n\r\n• Bőrmentes\r\n•Edzőcipő\r\n• Dupla hab és háló\r\n• Komplex 3 rétegű külső talp, Clear Sole technológia\r\n• Hímzett méret a lábujj szélén\r\n• Hímzett logó az oldalán\r\n• Dombornyomott logó hátul\r\n• Triple S gumi márkajelzés a nyelven\r\n• 2 fűzős hurok, köztük 1 funkcionális\r\n• Fűzőrendszer 12 szövetfűzőlyukkal\r\n• Kétszínű fűzők, amelyek a túrabakancs fűzőjét idézik\r\n• 1 további pár fűző\r\n• Hát és nyelv felhúzható fül\r\n• Mosott hatás a kopott megjelenésért\r\n• Kínában készült', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(21, 'Bézs', 'FK4162-132', 'Balenciaga', 'Mens Triple S Sneaker in Beige', '2017-09-21', 359000.00, 'mens_triple_s_sneaker_in_beige_1.jpg,\r\nmens_triple_s_sneaker_in_beige_2.jpg,\r\nmens_triple_s_sneaker_in_beige_3.jpg', '\r\n\r\n• Bőrmentes\r\n•Edzőcipő\r\n• Dupla hab és háló\r\n• Komplex 3 rétegű külső talp, Clear Sole technológia\r\n• Hímzett méret a lábujj szélén\r\n• Hímzett logó az oldalán\r\n• Dombornyomott logó hátul\r\n• Triple S gumi márkajelzés a nyelven\r\n• 2 fűzős hurok, köztük 1 funkcionális\r\n• Fűzőrendszer 12 szövetfűzőlyukkal\r\n• Kétszínű fűzők, amelyek a túrabakancs fűzőjét idézik\r\n• 1 további pár fűző\r\n• Hát és nyelv felhúzható fül\r\n• Mosott hatás a kopott megjelenésért\r\n• Kínában készült', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(22, 'Fekete-Piros', 'LO3122-523', 'Balenciaga', 'Mens Speed 2.0 Full Clear Sole Recycled Knit Sneaker in Black/red', '2021-01-01', 340000.00, 'mens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_blackred_1.jpg,\nmens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_blackred_2.jpg,\nmens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_blackred_3.jpg', '\r\n\r\n• Poliészter és elasztán\r\n• Ultra-tagolt, öntött átlátszó talpegység\r\n• \"No Memory\" talptechnológia\r\n• Extra könnyű: szinte mezítláb érezhető\r\n• Kontrasztos logó a külsejére nyomtatva\r\n• Dombornyomott logó a talp hátulján\r\n• Olaszországban készült\r\nFelsőrész: poliészter, elasztán - Talp: TPU - Talpbetét: poliészter', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(23, 'Fekete-Kék', 'XD1312-599', 'Balenciaga', 'Mens Speed 2.0 Full Clear Sole Recycled Knit Sneaker in Black/blue', '2021-01-01', 340000.00, 'mens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_blackblue_1.jpg,\nmens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_blackblue_2.jpg,\nmens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_blackblue_3.jpg', '\r\n\r\n• Poliészter és elasztán\r\n• Ultra-tagolt, öntött átlátszó talpegység\r\n• \"No Memory\" talptechnológia\r\n• Extra könnyű: szinte mezítláb érezhető\r\n• Kontrasztos logó a külsejére nyomtatva\r\n• Dombornyomott logó a talp hátulján\r\n• Olaszországban készült\r\nFelsőrész: poliészter, elasztán - Talp: TPU - Talpbetét: poliészter', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(24, 'Fekete', 'GD4234-512', 'Balenciaga', 'Mens Speed 2.0 Full Clear Sole Recycled Knit Sneaker in Black', '2021-01-01', 340000.00, 'mens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_black_1.jpg,\nmens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_black_2.jpg,\nmens_speed_2.0_full_clear_sole_recycled_knit_sneaker_in_black_3.jpg', '\r\n\r\n• Poliészter és elasztán\r\n• Ultra-tagolt, öntött átlátszó talpegység\r\n• \"No Memory\" talptechnológia\r\n• Extra könnyű: szinte mezítláb érezhető\r\n• Kontrasztos logó a külsejére nyomtatva\r\n• Dombornyomott logó a talp hátulján\r\n• Olaszországban készült\r\nFelsőrész: poliészter, elasztán - Talp: TPU - Talpbetét: poliészter', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(25, 'Fekete', 'UI1318-999', 'Balenciaga', 'Mens Track Sneaker in Black', '2021-11-04', 340000.00, 'mens_track_sneaker_in_black_1.jpg,\r\nmens_track_sneaker_in_black_2.jpg,\r\nmens_track_sneaker_in_black_3.jpg', '\r\n\r\n\r\n• Bőrmentes\r\n•Edzőcipő\r\n• Háló és nejlon\r\n• Írási méret a lábujj szélén\r\n• Dombornyomott pálya a sarok hátulján\r\n• BB dombornyomott a külső talp elején\r\n• Nyomtatott logó a külsején\r\n• Dombornyomott logó a nyelven\r\n• Dupla fűzők a szokásos felszerelési módon csomózva\r\n• Hát és nyelv felhúzható fül\r\n• Dinamikus talpkialakítás megnövelt hátrésszel a nagyobb kényelem érdekében\r\n• 1 további pár fűzőt tartalmaz\r\n• 50 mm-es ív\r\n• Mosott hatás a kopott megjelenésért\r\n• Kínában készült\r\nAnyaga: poliuretán, poliészter, nejlon', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(26, 'Fehér', 'DU2342-853', 'Balenciaga', 'Mens Track Sneaker in White', '2021-11-04', 340000.00, 'mens_track_sneaker_in_white_1.jpg,\r\nmens_track_sneaker_in_white_2.jpg,\r\nmens_track_sneaker_in_white_3.jpg', '\r\n\r\n\r\n• Bőrmentes\r\n•Edzőcipő\r\n• Háló és nejlon\r\n• Írási méret a lábujj szélén\r\n• Dombornyomott pálya a sarok hátulján\r\n• BB dombornyomott a külső talp elején\r\n• Nyomtatott logó a külsején\r\n• Dombornyomott logó a nyelven\r\n• Dupla fűzők a szokásos felszerelési módon csomózva\r\n• Hát és nyelv felhúzható fül\r\n• Dinamikus talpkialakítás megnövelt hátrésszel a nagyobb kényelem érdekében\r\n• 1 további pár fűzőt tartalmaz\r\n• 50 mm-es ív\r\n• Mosott hatás a kopott megjelenésért\r\n• Kínában készült\r\nAnyaga: poliuretán, poliészter, nejlon', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(27, 'Fehér-Sárga', 'OL5232-632', 'Balenciaga', 'Mens Track Sneaker in White Orange', '2021-11-04', 340000.00, 'mens_track_sneaker_in_white_orange_1.jpg,\r\nmens_track_sneaker_in_white_orange_2.jpg,\r\nmens_track_sneaker_in_white_orange_3.jpg', '\r\n\r\n\r\n• Bőrmentes\r\n•Edzőcipő\r\n• Háló és nejlon\r\n• Írási méret a lábujj szélén\r\n• Dombornyomott pálya a sarok hátulján\r\n• BB dombornyomott a külső talp elején\r\n• Nyomtatott logó a külsején\r\n• Dombornyomott logó a nyelven\r\n• Dupla fűzők a szokásos felszerelési módon csomózva\r\n• Hát és nyelv felhúzható fül\r\n• Dinamikus talpkialakítás megnövelt hátrésszel a nagyobb kényelem érdekében\r\n• 1 további pár fűzőt tartalmaz\r\n• 50 mm-es ív\r\n• Mosott hatás a kopott megjelenésért\r\n• Kínában készült\r\nAnyaga: poliuretán, poliészter, nejlon', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(28, 'Fehér', 'ZT4231-534', 'Maison Margiela', 'Paint Replica sneakers', '2015-02-02', 277000.00, 'paint_replica_sneakers_1.jpg,\npaint_replica_sneakers_2.jpg,\npaint_replica_sneakers_3.jpg', 'A Replica cipő nubukbőrből és velúrból, festékfröccsenő kialakítással. A Maison ikonikus Replica tornacipőit a hetvenes évek osztrák sportcipői ihlették. A replika párok részleteit folyamatosan átdolgozzák az évszak inspirációinak megfelelően.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(29, 'Fekete-Fehér', 'JU1231-542', 'Maison Margiela', 'Tabi sneakers', '2020-01-30', 235000.00, 'tabi_sneakers_1.jpg,\r\ntabi_sneakers_2.jpg,\r\ntabi_sneakers_3.jpg', 'A vászonból készült tornacipők bordázott elülső talppal, hátul numerikus logóval rendelkeznek, és a Tabi osztott orrú cipővel rendelkeznek, amelyet a hagyományos 15. századi japán zokni ihletett, és amelyet a Maison debütáló kollekciójához vezettek be 1989-ben. Megragadja a Maison avantgárd és engedetlen szellemét, és örökségi klasszikusként létezik, amelyet minden kollekcióban folyamatosan felfedeznek.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(30, 'Fehér', 'JU1231-543', 'Maison Margiela', 'Tabi sneakers', '2020-01-30', 235000.00, 'tabi_sneakers_fehér_1.jpg,\r\ntabi_sneakers_fehér_2.jpg,\r\ntabi_sneakers_fehér_3.jpg', 'A vászonból készült tornacipők bordázott elülső talppal, hátul numerikus logóval rendelkeznek, és a Tabi osztott orrú cipővel rendelkeznek, amelyet a hagyományos 15. századi japán zokni ihletett, és amelyet a Maison debütáló kollekciójához vezettek be 1989-ben. Megragadja a Maison avantgárd és engedetlen szellemét, és örökségi klasszikusként létezik, amelyet minden kollekcióban folyamatosan felfedeznek.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(31, 'Fekete-Barna', 'LO4122-212', 'Maison Margiela', 'Replica sneakers', '2012-01-30', 235000.00, 'replica_sneakers_fekete_barna_1.jpg,\r\nreplica_sneakers_fekete_barna_2.jpg,\r\nreplica_sneakers_fekete_barna_3.jpg', 'A Replica tornacipő nappabőrből és velúrból, mézes talppal. A Maison ikonikus Replica tornacipőit a hetvenes évek osztrák sportcipői ihlették. A replika párok részleteit folyamatosan átdolgozzák az évszak inspirációinak megfelelően.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(32, 'Fekete-Barna', 'HL4123-7876', 'Maison Margiela', 'New Evolution sneakers', '2022-12-01', 260000.00, 'new_evolution_sneakers_1.jpg,\r\nnew_evolution_sneakers_2.jpg,\r\nnew_evolution_sneakers_3.jpg', 'Vászonból, borjúbőrből és velúrból készült New Evolution tornacipők hasított elülső talppal és dupla fűzővel ellátott dekormintával rendelkeznek, amelyek réteges és kopott hatást keltenek. A nyelven a numerikus logó jelenik meg, hátul pedig az egyetlen fehér öltés Maison Margiela kezét mutatja.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(33, 'Ezüst', 'PO4144-677', 'Maison Margiela', 'Replica broken mirror sneakers', '2024-07-01', 260000.00, 'replica_broken_mirror_sneakers_1.jpg,\r\nreplica_broken_mirror_sneakers_2.jpg,\r\nreplica_broken_mirror_sneakers_3.jpg', 'A törött tükörfelülettel készült Replica tornacipő. A Maison ikonikus Replica tornacipőit a hetvenes évek osztrák sportcipői ihlették. A replika párok részleteit folyamatosan átdolgozzák az évszak inspirációinak megfelelően.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(34, 'Fekete', 'LP4131-123', 'Maison Margiela', 'Sprinters', '2024-12-12', 260000.00, 'sprinters_1.jpg,\r\nsprinters_2.jpg,\r\nsprinters_3.jpg', 'A fúróból, szőrös velúrból és borjúbőrből készült, vintage kezeléssel készült Sprinters sziluettet a retro futócipők ihlették. A blokk színkontrasztját a klasszikus nyelv és a numerikus logó biztosítja. A szegecses alapon számrészletek is találhatók, a 22-es körbe, amely a Maison cipőkollekcióját jelzi. Maison Margiela jellegzetes öltése hátul jelenik meg; a címke ellentéte.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(35, 'Fehér', 'IU5677-123', 'Maison Margiela', 'New Evolution sneakers', '2022-12-01', 260000.00, 'new_evolution_sneakers_fehér_1.jpg,\r\nnew_evolution_sneakers_fehér_2.jpg,\r\nnew_evolution_sneakers_fehér_3.jpg', 'Vászonból, borjúbőrből és velúrból készült New Evolution tornacipők hasított elülső talppal és dupla fűzővel ellátott dekormintával rendelkeznek, amelyek réteges és kopott hatást keltenek. A nyelven a numerikus logó jelenik meg, hátul pedig az egyetlen fehér öltés Maison Margiela kezét mutatja.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(36, 'Kék', 'OL7682-321', 'Maison Margiela', 'Replica sneakers', '2012-01-30', 260000.00, 'replica_sneakers_kék_1.jpg,\r\nreplica_sneakers_kék_2.jpg,\r\nreplica_sneakers_kék_3.jpg', 'A Replica tornacipő nappabőrből és velúrból, mézes talppal. A Maison ikonikus Replica tornacipőit a hetvenes évek osztrák sportcipői ihlették. A replika párok részleteit folyamatosan átdolgozzák az évszak inspirációinak megfelelően.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(37, 'Fekete-Fehér', 'XD6677-666', 'Rick Owens', 'Mega Geobasket', '2024-05-31', 400000.00, 'mega_geobasket_fekete_fehér_1.jpg, mega_geobasket_fekete_fehér_2.jpg, mega_geobasket_fekete_fehér_3.jpg', 'EZEK A MEGA GEOKOSARAK VÁDLI KÖZEPÉIG ÉRNEK. FOGJÁK A KLASSZIKUS GEOKOSARUNKAT, ÉS PUHA, PÁRNÁZOTT MEGA MÉRETŰRE FÚJJÁK. MEGHOSSZABBÍTOTT NYELVVEL RENDELKEZNEK HEVEDERFÜLLEL, JELLEGZETES GEOMETRIAI PANELEKKEL ÉS PÁRNÁZOTT HÁTSÓ PULTTAL, FELSŐ VARRÁSVONALAKKAL. KILENC FŰZŐLYUKKAL, KONTRASZTOS FŰZŐVEL ÉS DUPLA MAGASSÁGÚ MEGA LÖKHÁRÍTÓS CÁPAFOGÚ TALPPAL RENDELKEZNEK.\r\n\r\nEZ A KÖZEPES SÚLYÚ, TELJES KIŐRLÉSŰ BORJÚBŐR LAPOS ÉS MATT FELÜLETTEL RENDELKEZIK, ÉS KIFEJEZETTEN KOPÁSÁLLÓ CIPŐKHÖZ CSERZETT.\r\n\r\nEZ A CSERZŐÜZEM LWG TANÚSÍTVÁNNYAL RENDELKEZIK, BRONZ MINŐSÍTÉSSEL.\r\n\r\nSZÍN: FEKETE/TEJ/TEJ\r\nANYAGA: FELSŐRÉSZ 100% TEHÉNBŐR\r\nBÉLÉS 100% BORJÚBŐR\r\nTALPBETÉT 100% BORJÚBŐR\r\nTALP 100% HŐRE LÁGYULÓ GUMI\r\nTALP MAGASSÁGA 6,5 CM', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(38, 'Fekete', 'JO6677-666', 'Rick Owens', 'Rick Owens Mega Geobasket', '2024-05-31', 400000.00, 'rick_owens_mega_geobasket_fekete_1.jpg, rick_owens_mega_geobasket_fekete_2.jpg, rick_owens_mega_geobasket_fekete_3.jpg', 'EZEK A MEGA GEOKOSARAK VÁDLI KÖZEPÉIG ÉRNEK. FOGJÁK A KLASSZIKUS GEOKOSARUNKAT, ÉS PUHA, PÁRNÁZOTT MEGA MÉRETŰRE FÚJJÁK. MEGHOSSZABBÍTOTT NYELVVEL RENDELKEZNEK HEVEDERFÜLLEL, JELLEGZETES GEOMETRIAI PANELEKKEL ÉS PÁRNÁZOTT HÁTSÓ PULTTAL, FELSŐ VARRÁSVONALAKKAL. KILENC FŰZŐLYUKKAL, KONTRASZTOS FŰZŐVEL ÉS DUPLA MAGASSÁGÚ MEGA LÖKHÁRÍTÓS CÁPAFOGÚ TALPPAL RENDELKEZNEK.\r\n\r\nEZ A KÖZEPES SÚLYÚ, TELJES KIŐRLÉSŰ BORJÚBŐR LAPOS ÉS MATT FELÜLETTEL RENDELKEZIK, ÉS KIFEJEZETTEN KOPÁSÁLLÓ CIPŐKHÖZ CSERZETT.\r\n\r\nEZ A CSERZŐÜZEM LWG TANÚSÍTVÁNNYAL RENDELKEZIK, BRONZ MINŐSÍTÉSSEL.\r\n\r\nSZÍN: FEKETE / FEKETE / FEKETE\r\nANYAGA: FELSŐRÉSZ 100% TEHÉNBŐR\r\nBÉLÉS 100% BORJÚBŐR\r\nTALPBETÉT 100% BORJÚBŐR\r\nTALP 100% HŐRE LÁGYULÓ GUMI\r\nTALP MAGASSÁGA 6,5 CM', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(39, 'Fekete', 'JO6677-666', 'Rick Owens', 'Rick Owens Mega Geobasket', '2024-05-31', 400000.00, 'rick_owens_mega_geobasket_feher_1.jpg, rick_owens_mega_geobasket_feher_2.jpg, rick_owens_mega_geobasket_feher_3.jpg', 'EZEK A MEGA GEOKOSARAK VÁDLI KÖZEPÉIG ÉRNEK. FOGJÁK A KLASSZIKUS GEOKOSARUNKAT, ÉS PUHA, PÁRNÁZOTT MEGA MÉRETŰRE FÚJJÁK. MEGHOSSZABBÍTOTT NYELVVEL RENDELKEZNEK HEVEDERFÜLLEL, JELLEGZETES GEOMETRIAI PANELEKKEL ÉS PÁRNÁZOTT HÁTSÓ PULTTAL, FELSŐ VARRÁSVONALAKKAL. KILENC FŰZŐLYUKKAL, KONTRASZTOS FŰZŐVEL ÉS DUPLA MAGASSÁGÚ MEGA LÖKHÁRÍTÓS CÁPAFOGÚ TALPPAL RENDELKEZNEK.\r\n\r\nEZ A KÖZEPES SÚLYÚ, TELJES KIŐRLÉSŰ BORJÚBŐR LAPOS ÉS MATT FELÜLETTEL RENDELKEZIK, ÉS KIFEJEZETTEN KOPÁSÁLLÓ CIPŐKHÖZ CSERZETT.\r\n\r\nEZ A CSERZŐÜZEM LWG TANÚSÍTVÁNNYAL RENDELKEZIK, BRONZ MINŐSÍTÉSSEL.\r\n\r\nSZÍN: FEKETE / FEKETE / FEKETE\r\nANYAGA: FELSŐRÉSZ 100% TEHÉNBŐR\r\nBÉLÉS 100% BORJÚBŐR\r\nTALPBETÉT 100% BORJÚBŐR\r\nTALP 100% HŐRE LÁGYULÓ GUMI\r\nTALP MAGASSÁGA 6,5 CM', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(40, 'Fehér', 'UZ5231-634', 'Rick Owens', 'Rick Owens Mega Geobasket', '2024-05-31', 400000.00, 'rick_owens_mega_geobasket_fehér_1.jpg, rick_owens_mega_geobasket_fehér_2.jpg, rick_owens_mega_geobasket_fehér_3.jpg', 'EZEK A MEGA GEOKOSARAK VÁDLI KÖZEPÉIG ÉRNEK. FOGJÁK A KLASSZIKUS GEOKOSARUNKAT, ÉS PUHA, PÁRNÁZOTT MEGA MÉRETŰRE FÚJJÁK. MEGHOSSZABBÍTOTT NYELVVEL RENDELKEZNEK HEVEDERFÜLLEL, JELLEGZETES GEOMETRIAI PANELEKKEL ÉS PÁRNÁZOTT HÁTSÓ PULTTAL, FELSŐ VARRÁSVONALAKKAL. KILENC FŰZŐLYUKKAL, KONTRASZTOS FŰZŐVEL ÉS DUPLA MAGASSÁGÚ MEGA LÖKHÁRÍTÓS CÁPAFOGÚ TALPPAL RENDELKEZNEK.\r\n\r\nEZ A KÖZEPES SÚLYÚ, TELJES KIŐRLÉSŰ BORJÚBŐR LAPOS ÉS MATT FELÜLETTEL RENDELKEZIK, ÉS KIFEJEZETTEN KOPÁSÁLLÓ CIPŐKHÖZ CSERZETT.\r\n\r\nEZ A CSERZŐÜZEM LWG TANÚSÍTVÁNNYAL RENDELKEZIK, BRONZ MINŐSÍTÉSSEL.\r\n\r\nSZÍN: TEJ/TEJ/TEJ\r\nANYAGA: FELSŐRÉSZ 100% TEHÉNBŐR\r\nBÉLÉS 100% BORJÚBŐR\r\nTALPBETÉT 100% BORJÚBŐR\r\nTALP 100% HŐRE LÁGYULÓ GUMI\r\nTALP MAGASSÁGA 6,5 CM', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.');
INSERT INTO `cipok` (`cipo_id`, `szin`, `cikkszam`, `marka`, `modell`, `megjelenes`, `ar`, `kep`, `leiras`, `fizetes_szallitas`) VALUES
(41, 'Fekete-Fehér', 'TR5234-234', 'Rick Owens', 'Rick Owens Jumbo Lace', '2023-03-07', 385000.00, 'rick_owens_lunar_fekete_1.jpg,\nrick_owens_lunar_fekete_2.jpg,\nrick_owens_lunar_fekete_3.jpg', 'EZ A JUMBOLACE TORNACIPŐ BOKA MAGASSÁGA FELETT VAN, ÉS HÉT FŰZŐLYUKKAL, JUMBO FŰZŐVEL, CIPZÁRRAL A BOKA BELSŐ OLDALÁN A KÖNNYŰ RÖGZÍTÉS ÉRDEKÉBEN, LÁBUJJVÉDŐVEL ÉS CÁPAFOGÚ LÖKHÁRÍTÓ TALPPAL RENDELKEZIK.\r\n\r\nEZ A BŐR KÖNNYŰ ÉS PUHA, TERMÉSZETES BARACKBŐR TAPINTÁSÚ.\r\n\r\nKÖNNYŰ BÁRÁNYBŐR A LEHETŐ LEGMEZTELENEBBEN, HOGY PUHA, TERMÉSZETES ŐSZIBARACKBŐR TAPINTÁST ÉRJEN EL. A BŐR PUHA TAPINTÁSÁT ÚGY ÉRIK EL, HOGY A BŐRÖKET TÖBBSZÖR NAGY DOBOKBAN FORGATJÁK, ÉS LEVEGŐN SZÁRÍTJÁK TOVÁBBI FELÜLETEK NÉLKÜL.\r\nEZ A CSERZŐÜZEM AZ LWG ÁLTAL ELLENŐRZÖTT.\r\n\r\nSZÍN: FEKETE/TEJ/TEJ\r\nANYAGA: FELSŐRÉSZ 100% BÁRÁNYBŐR\r\nORRUJJ 100% BORJÚBŐR\r\nBÉLÉS 100% BORJÚBŐR\r\nPÁRNÁZÁS 96% POLIÉTER + 4% NYLON\r\nTALPBETÉT 100% BORJÚBŐR\r\nTALP 100% HŐRE LÁGYULÓ GUMI', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(42, 'Fekete-Fehér', 'IU1432-667', 'Rick Owens', 'Dr. Martens X Rick Owens 146', '2021-03-20', 140000.00, 'dr_martens_x_rick_owens_146_1.jpg, dr_martens_x_rick_owens_146_2.jpg, dr_martens_x_rick_owens_146_3.jpg', 'EZEKET A DR. MARTENS ICONIC 1460 CSIZMÁKAT RICK OWENS GONDOLTA ÚJRA, ÉS MEGA GYÖNGY FŰZÉSSEL ÉS PALLÁDIUM BEVONATTAL RENDELKEZIK, BELEÉRTVE AZ ALAGÚTHURKOKAT ÉS AZ OLDALSÓ CIPZÁRT. A CSIZMA MEGHOSSZABBÍTOTT GEOMETRIAI NYELVVEL RENDELKEZIK, ÉS FEKETE ÉS GYÖNGYHÁZ SZÍNBEN SZŐTT DR MARTENS AIRWAIR SAROKHUROKKAL RENDELKEZIK. GUMI DMXL TALPPAL RENDELKEZNEK, DR MARTENS SÁRGA SZEGÉLYÖLTÉSSEL.\r\n\r\nA 2023 VÉGÉN KIESETT DMXL KÜLSŐ TALP A KLASSZIKUS DR. MARTENS TALP.\r\nKÖNNYŰ EVA ÖSSZETETT ALAPBÓL KÉSZÜLT, RUGALMAS PVC HÜVELYEKKEL.\r\n\r\nSZÍN: FEKETE\r\nFELSŐRÉSZ: 100% TEHÉNBŐR\r\nLÁBBÉLÉS: 100% TEHÉNBŐR\r\nFELSŐ BÉLÉS: 72% POLIÉSZTER + 14% NAYLON + 14% POLIURETÁN\r\nTALP 50% E.V.A + 50% POLIVINILCLORURO\r\n\r\nFELHÍVJUK FIGYELMÉT, HOGY A TERMÉKLEÍRÁS OLDALON FELTÜNTETETT CIPŐMÉRET MEGFELEL AZ EGYESÜLT KIRÁLYSÁG CIPŐMÉRETÉNEK.\r\n\r\nNYOMATÉKOSAN JAVASOLJUK ÜGYFELEINKNEK, HOGY A MEGRENDELÉS LEADÁSA ELŐTT ELLENŐRIZZÉK A MÉRETTÁBLÁZATOT, HOGY ELKERÜLJÉK AZ ESETLEGES KELLEMETLENSÉGEKET.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(43, 'Fekete-Fehér', 'ER4344-764', 'Rick Owens', 'DR. Martens X Rick Owens 1918 Calf Lenght DMXL', '2024-03-07', 160000.00, 'dr_martens_x_rick_owens_1918_calf_lenght_dmxl_1.jpg, dr_martens_x_rick_owens_1918_calf_lenght_dmxl_2.jpg, dr_martens_x_rick_owens_1918_calf_lenght_dmxl_3.jpg', 'EZEKET A DR. MARTENS 1918 CSIZMÁKAT RICK OWENS GONDOLTA ÚJRA, ÉS TÚLZÓ HOSSZÚSÁGÚ GYÖNGYFŰZŐKKEL ÉS PALLÁDIUM BEVONATTAL RENDELKEZNEK, BELEÉRTVE A FŰZŐLYUKAKAT, A GYORSKAMPÓKAT ÉS AZ OLDALSÓ CIPZÁRT. A CSIZMA MEGHOSSZABBÍTOTT GEOMETRIAI NYELVVEL RENDELKEZIK, ÉS FEKETE ÉS GYÖNGYHÁZ SZÍNBEN SZŐTT DR MARTENS AIRWAIR SAROKHUROKKAL RENDELKEZIK. GUMI DMXL TALPPAL RENDELKEZNEK, DR MARTENS SÁRGA SZEGÉLYÖLTÉSSEL.\r\n\r\nA 2023 VÉGÉN KIESETT DMXL KÜLSŐ TALP A KLASSZIKUS DR. MARTENS TALP.\r\nKÖNNYŰ EVA ÖSSZETETT ALAPBÓL KÉSZÜLT, RUGALMAS PVC HÜVELYEKKEL.\r\n\r\nSZÍN: FEKETE\r\nFELSŐRÉSZ: FELSŐRÉSZ 100% TEHÉNBŐR\r\nLÁBBÉLÉS: 100% TEHÉNBŐR\r\nFELSŐ BÉLÉS: 64% POLIÉSZTER + 18% NAYLON + 18% POLIURETÁN\r\nTALP 50% E.V.A + 50% POLIVINILCLORURO\r\n\r\nFELHÍVJUK FIGYELMÉT, HOGY A TERMÉKLEÍRÁS OLDALON FELTÜNTETETT CIPŐMÉRET MEGFELEL AZ EGYESÜLT KIRÁLYSÁG CIPŐMÉRETÉNEK.\r\n\r\nNYOMATÉKOSAN JAVASOLJUK ÜGYFELEINKNEK, HOGY A MEGRENDELÉS LEADÁSA ELŐTT ELLENŐRIZZÉK A MÉRETTÁBLÁZATOT, HOGY ELKERÜLJÉK AZ ESETLEGES KELLEMETLENSÉGEKET.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(44, 'Fekete-Fehér', 'IU1432-667', 'Rick Owens', 'Dr. Martens X Rick Owens 146', '2021-03-20', 140000.00, 'peep_1.jpg,peep_2.jpg,peep_3.jpg', 'EZEKET A DR. MARTENS ICONIC 1460 CSIZMÁKAT RICK OWENS GONDOLTA ÚJRA, ÉS MEGA GYÖNGY FŰZÉSSEL ÉS PALLÁDIUM BEVONATTAL RENDELKEZIK, BELEÉRTVE AZ ALAGÚTHURKOKAT ÉS AZ OLDALSÓ CIPZÁRT. A CSIZMA MEGHOSSZABBÍTOTT GEOMETRIAI NYELVVEL RENDELKEZIK, ÉS FEKETE ÉS GYÖNGYHÁZ SZÍNBEN SZŐTT DR MARTENS AIRWAIR SAROKHUROKKAL RENDELKEZIK. GUMI DMXL TALPPAL RENDELKEZNEK, DR MARTENS SÁRGA SZEGÉLYÖLTÉSSEL.\r\n\r\nA 2023 VÉGÉN KIESETT DMXL KÜLSŐ TALP A KLASSZIKUS DR. MARTENS TALP.\r\nKÖNNYŰ EVA ÖSSZETETT ALAPBÓL KÉSZÜLT, RUGALMAS PVC HÜVELYEKKEL.\r\n\r\nSZÍN: FEKETE\r\nFELSŐRÉSZ: 100% TEHÉNBŐR\r\nLÁBBÉLÉS: 100% TEHÉNBŐR\r\nFELSŐ BÉLÉS: 72% POLIÉSZTER + 14% NAYLON + 14% POLIURETÁN\r\nTALP 50% E.V.A + 50% POLIVINILCLORURO\r\n\r\nFELHÍVJUK FIGYELMÉT, HOGY A TERMÉKLEÍRÁS OLDALON FELTÜNTETETT CIPŐMÉRET MEGFELEL AZ EGYESÜLT KIRÁLYSÁG CIPŐMÉRETÉNEK.\r\n\r\nNYOMATÉKOSAN JAVASOLJUK ÜGYFELEINKNEK, HOGY A MEGRENDELÉS LEADÁSA ELŐTT ELLENŐRIZZÉK A MÉRETTÁBLÁZATOT, HOGY ELKERÜLJÉK AZ ESETLEGES KELLEMETLENSÉGEKET.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(45, 'Fekete', 'BN5232-999', 'Rick Owens', 'Rick Owens SS25 Hollywood Beatle Cyclops', '2024-09-26', 450000.00, 'rick_owens_ss25_hollywood_beatle_cyclops_1.jpg, rick_owens_ss25_hollywood_beatle_cyclops_2.jpg, rick_owens_ss25_hollywood_beatle_cyclops_3.jpg', 'EZEK A BEATLE KÜKLOPSZOK BOKA MAGASSÁGA FELETT VANNAK. GEOMETRIKUS OLDALPANELEKKEL RENDELKEZNEK SZTRECCS ELASZTIKUSBÓL, SZÖGLETES SAROKSZÁMLÁLÓVAL, FELSŐ VARRÁSSAL ÉS HÁTSÓ HUROK HÚZÓFÜLLEL. KLASSZIKUS KÜKLOPSZ TALPPAL RENDELKEZNEK.\r\n\r\nEZ A KÖZEPES SÚLYÚ MARHABŐR NÖVÉNYI CSERZETT ÉS TERMÉSZETES VIASZOKKAL VAN KIDOLGOZVA. A VÉGSŐ MOSÁS PUHASÁGÁT ADJA ENNEK A BŐRNEK, ÉS KIEMELI AZ EGYES BŐRÖK TERMÉSZETES SZEMCSÉS TEXTÚRÁJÁT. MIVEL EZ A BŐR MEZTELEN, NEM FEJEZTE BE A BŐRT BORÍTÓ PIGMENTEK HASZNÁLATÁT, TERMÉSZETES JEGYEK ÉS ÁRNYÉKOLÁSOK LÁTHATÓK, AMELYEK MINDEN BŐRT ÉS TERMÉKET EGYEDIVÉ TESZNEK.\r\n\r\nA NÖVÉNYI CSERZÉS AZT JELENTI, HOGY CSAK NÖVÉNYI ÉS TERMÉSZETES TANNINOKAT HASZNÁLTAK A BŐR CSERZÉSE ÉS TARTÓSÍTÁSA SORÁN.\r\nEZ A CSERZŐÜZEM LWG TANÚSÍTVÁNNYAL RENDELKEZIK, EZÜST MINŐSÍTÉSSEL.\r\n\r\nSZÍN: FEKETE\r\nANYAGA: FELSŐRÉSZ 100% BORJÚBŐR\r\nBÉLÉS 100% BORJÚBŐR\r\nTALPBETÉT 100% BORJÚBŐR\r\nKÖZÉPTALP 100% TEHÉNBŐR\r\nTALP RÉSZLET 100% GUMI\r\nA LÁBFEJ 3 CM / TALPMAGASSÁG A LÁBUJJAKNÁL 1,5 CM\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(46, 'Szürke-Fehér', 'IO6322-888', 'Adidas', 'Adidas Campus 00s Grey White', '2023-03-01', 64990.00, 'adidas_campus_00s_grey_white_1.jpg, adidas_campus_00s_grey_white_2.jpg, adidas_campus_00s_grey_white_3.jpg', 'Az Adidas Campus cipő az időtlen stílus és kényelem tökéletes ötvözete. Ez a klasszikus és népszerű cipőmodell már évtizedek óta az utcai divat egyik ikonjává vált, és nem véletlenül. A Campus cipők egyszerre hozzák a régi iskolás stílus varázsát és a modern funkcionális dizájnt, így minden viseletük egy kifinomult elegancia és önbizalom kifejeződése.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(47, 'Fekete', 'PO5655-123', 'Adidas', 'Yeezy Slide Onyx', '2022-03-22', 67990.00, 'yeezy_slide_onyx_1.jpg, yeezy_slide_onyx_2.jpg, yeezy_slide_onyx_3.jpg', 'Az első Yeezy 2016 szeptemberében jelent meg. A cipő a világ egyik leghíresebb rappere, divatikonja Kanye West és az Adidas közös szerelemgyereke. A Yeezy formavilága rendbontó, a talpában taláható Boost talp hihetetlen kényelmet és puhaságot biztosít a viselője számara. Számos sziluett jelent 2016 óta. A Yeezy 350-es modell aratta előszőr az elsöprő sikert, viszont a Yeezy 700-as, a Yeezy Foam Runnerek, a Yeezy Slide-ok is nagyon pörögnek, köszönhetően a futurisztikus látványuknak, illetve az előbb említett elképesztő kényelmük miatt.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(48, 'Fekete-Fehér', 'SE6342-888', 'Adidas', 'Adidas Campus 00s Core Black', '2023-02-17', 64990.00, 'adidas_campus_00s_core_black_1.jpg, adidas_campus_00s_core_black_2.jpg, adidas_campus_00s_core_black_3.jpg', 'Az Adidas Campus cipő az időtlen stílus és kényelem tökéletes ötvözete. Ez a klasszikus és népszerű cipőmodell már évtizedek óta az utcai divat egyik ikonjává vált, és nem véletlenül. A Campus cipők egyszerre hozzák a régi iskolás stílus varázsát és a modern funkcionális dizájnt, így minden viseletük egy kifinomult elegancia és önbizalom kifejeződése.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(49, 'Fekete-Fehér', 'PL1455-853', 'Adidas', 'Adidas Campus 00s Crystal White Core Black', '2023-03-06', 71990.00, 'adidas_campus_00s_crystal_white_core_black_1.jpg, adidas_campus_00s_crystal_white_core_black_2.jpg, adidas_campus_00s_crystal_white_core_black_3.jpg', 'Az Adidas Campus cipő az időtlen stílus és kényelem tökéletes ötvözete. Ez a klasszikus és népszerű cipőmodell már évtizedek óta az utcai divat egyik ikonjává vált, és nem véletlenül. A Campus cipők egyszerre hozzák a régi iskolás stílus varázsát és a modern funkcionális dizájnt, így minden viseletük egy kifinomult elegancia és önbizalom kifejeződése.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(50, 'Szürke', 'KK6666-111', 'Adidas', 'Yeezy Slide Slate Grey', '2023-08-22', 66990.00, 'yeezy_slide_slate_grey_1.jpg, yeezy_slide_slate_grey_2.jpg, yeezy_slide_slate_grey_3.jpg', 'A Yeezy slide-ok formavilága, futurisztikus megjelenése, pluszban az elképesztő kényelme, egy egyszerűbb vagy éppen egy színesebb outfittel tökéletesen passzol. \r\n\r\nAz első Yeezy 2016 szeptemberében jelent meg. A cipő a világ egyik leghíresebb rappere, divatikonja Kanye West és az Adidas közös szerelemgyereke. A Yeezy formavilága rendbontó, a talpában taláható Boost talp hihetetlen kényelmet és puhaságot biztosít a viselője számara. Számos sziluett jelent 2016 óta. A Yeezy 350-es modell aratta előszőr az elsöprő sikert, viszont a Yeezy 700-as, a Yeezy Foam Runnerek, a Yeezy Slide-ok is nagyon pörögnek, köszönhetően a futurisztikus látványuknak, illetve az előbb említett elképesztő kényelmük miatt.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(51, 'Fehér', 'SW1412-456', 'Adidas', 'Yeezy Boost 350 V2 Bone', '2022-03-11', 149990.00, 'yeezy_boost_350_v2_bone_1.jpg, yeezy_boost_350_v2_bone_2.jpg, yeezy_boost_350_v2_bone_3.jpg', 'A Yeezy Boost 350 Bone egy tökéletes tavaszi, nyári színállás. Egy letisztultabb outfitthez hibátlanul passzol, krémes, fehér színe miatt.\r\n\r\n Az első Yeezy 2016 szeptemberében jelent meg. A cipő a világ egyik leghíresebb rappere, divatikonja Kanye West és az Adidas közös szerelemgyereke. A Yeezy formavilága rendbontó, a talpában taláható Boost talp hihetetlen kényelmet és puhaságot biztosít a viselője számara. Számos sziluett jelent 2016 óta. A Yeezy 350-es modell aratta előszőr az elsöprő sikert, viszont a Yeezy 700-as, a Yeezy Foam Runnerek, a Yeezy Slide-ok is nagyon pörögnek, köszönhetően a futurisztikus látványuknak, illetve az előbb említett elképesztő kényelmük miatt.\r\n\r\n', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(52, 'Sárga', 'KI5111-412', 'Adidas', 'Yeezy Slide Glow Green', '2021-09-06', 74990.00, 'yeezy_slide_glow_green_1.jpg, yeezy_slide_glow_green_2.jpg, yeezy_slide_glow_green_3.jpg', 'A Yeezy slide-ok formavilága, futurisztikus megjelenése, pluszban az elképesztő kényelme, egy egyszerűbb vagy éppen egy színesebb outfittel tökéletesen passzol. ', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(53, 'Sárga-Szürke', 'LL4141-233', 'Adidas', 'Yeezy Boost 350 V2 Beluga Reflective', '2021-12-18', 147990.00, 'yeezy_boost_350_v2_beluga_reflective_1.jpg, yeezy_boost_350_v2_beluga_reflective_2.jpg, yeezy_boost_350_v2_beluga_reflective_3.jpg', 'Az adidas Yeezy Boost 350 V2 Beluga Reflective az eredeti Beluga színváltozatra épül, a Primeknit felsőrész fényvisszaverő tulajdonságokkal és narancssárga pöttyös hangsúlyokkal bővül. Az olyan jellegzetes részletek, mint a Boost talp és a narancssárga oldalsó csíkok teszik teljessé a dizájnt.\r\n\r\nAz első Yeezy 2016 szeptemberében jelent meg. A cipő a világ egyik leghíresebb rappere, divatikonja Kanye West és az Adidas közös szerelemgyereke. A Yeezy formavilága rendbontó, a talpában taláható Boost talp hihetetlen kényelmet és puhaságot biztosít a viselője számara. Számos sziluett jelent 2016 óta. A Yeezy 350-es modell aratta előszőr az elsöprő sikert, viszont a Yeezy 700-as, a Yeezy Foam Runnerek, a Yeezy Slide-ok is nagyon pörögnek, köszönhetően a futurisztikus látványuknak, illetve az előbb említett elképesztő kényelmük miatt.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(54, 'Barna', 'VE3155-123', 'Adidas', 'Yeezy Boost 350 V2 Slate', '2022-09-03', 139990.00, 'yeezy_boost_350_v2_slate_1.jpg, yeezy_boost_350_v2_slate_2.jpg, yeezy_boost_350_v2_slate_3.jpg', 'Az adidas Yeezy Boost 350 fekete felsőrészén barnásbarna Primeknit konstrukció található, amelyet a jellegzetes középső varrás emel ki az alsó részen. Egy kontrasztos fekete csík díszíti az oldalsó oldalt az aláírt \"SPLY-350\" márkajelzéssel. A cipő egy Boost középtalp tetején ül, amelyet egy félig áttetsző TPU-ketrec zár be a tartósság és a támogatás érdekében.\r\n\r\nAz első Yeezy 2016 szeptemberében jelent meg. A cipő a világ egyik leghíresebb rappere, divatikonja Kanye West és az Adidas közös szerelemgyereke. A Yeezy formavilága rendbontó, a talpában taláható Boost talp hihetetlen kényelmet és puhaságot biztosít a viselője számara. Számos sziluett jelent 2016 óta. A Yeezy 350-es modell aratta előszőr az elsöprő sikert, viszont a Yeezy 700-as, a Yeezy Foam Runnerek, a Yeezy Slide-ok is nagyon pörögnek, köszönhetően a futurisztikus látványuknak, illetve az előbb említett elképesztő kényelmük miatt.', 'Fizetés:\r\n \r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n \r\nSzállítás:\r\n \r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exkluziv_cipok`
--

CREATE TABLE `exkluziv_cipok` (
  `exkluziv_id` int(11) NOT NULL,
  `szin` varchar(50) NOT NULL,
  `cikkszam` varchar(50) NOT NULL,
  `marka` varchar(100) NOT NULL,
  `modell` varchar(100) NOT NULL,
  `megjelenes` date DEFAULT NULL,
  `ar` decimal(10,2) NOT NULL,
  `kep` varchar(255) NOT NULL,
  `leiras` text DEFAULT NULL,
  `fizetes_szallitas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `exkluziv_cipok`
--

INSERT INTO `exkluziv_cipok` (`exkluziv_id`, `szin`, `cikkszam`, `marka`, `modell`, `megjelenes`, `ar`, `kep`, `leiras`, `fizetes_szallitas`) VALUES
(1, 'Kék-Fehér', 'EQ3213-221', 'Jordan', 'Air Jordan 1 Retro High Off-White - UNC', '2018-06-23', 899990.00, 'air_jordan_1_retro_high_off_white_unc_1.jpg, air_jordan_1_retro_high_off_white_unc_2.jpg, air_jordan_1_retro_high_off_white_unc_3.jpg', 'A monumentális Off-White x Air Jordan 1 harmadik kiadásához Virgil Abloh Michael Jordan első szignált cipőjének „UNC” színére koncentrált. A magas szárú pár az Észak-Karolinai Egyetem által inspirált ikonikus fehér és karolinai kék bőr felsőrésszel rendelkezik. A színeket Abloh dekonstruált esztétikája és olyan jellegzetes részletek egészítik ki, mint a piros zip-tie.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(2, 'Fekete-Kék', 'LL3213-221', 'Nike', 'Nike Air Force 1 Low Tiffany & Co. 1837', '2023-03-07', 789990.00, 'nike_air_force_1_low_tiffany_co_1837_1.jpg, nike_air_force_1_low_tiffany_co_1837_2.jpg, nike_air_force_1_low_tiffany_co_1837_3.jpg', 'A Jordaneken kívűl az Air Force 1-es cipők azok amik megjelennek mindenki szeme előtt, ha a Nike cipőkről beszélünk. Rengeteg híresebbnél híres kollab jelent meg, pazar részletekkel, például az Air Force 1 Shadow, Pixel, illetve a sima, letisztult Triple White Air Force 1. A formavilág letisztult, könnyen lehet hozzá öltözködni, ezért is lehet ekkora sikere.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(3, 'Kék-Fehér', 'OP2133-213', 'Louis Vuitton', 'Nike Air Force 1 Low Louis Vuitton Virgil Abloh White Royal', '2022-07-19', 2999990.00, 'nike_air_force_1_low_louis_vuitton_abloh_white_royal_1.jpg, nike_air_force_1_low_louis_vuitton_abloh_white_royal_2.jpg, nike_air_force_1_low_louis_vuitton_abloh_white_royal_3.jpg', 'Virgil Abloh ikonikus francia ház utolsó projektjei között a Louis Vuitton x Nike Air Force 1 a kreatív igazgató jellegzetes vizuális nyelvét foglalja magában. A 2022-es tavaszi/nyári szezonban bemutatott tornacipők kézzel készülnek a Louis Vuitton olaszországi Fiesso d Artico-i műhelyében, és dombornyomott monogramos részletekkel rendelkeznek a fényűző bőr felsőrészen.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(4, 'Fehér', 'QW5566-123', 'Adidas', 'Yeezy Boost 350 V2 Cream Triple White', '2017-04-29', 239000.00, 'yeezy_boost_350_v2_cream_triple_white_1.jpg, yeezy_boost_350_v2_cream_triple_white_2.jpg, yeezy_boost_350_v2_cream_triple_white_3.jpg', 'A világító színű adidas Yeezy Boost 350 V2 krémfehér felsőrésszel, magfehér középtalppal és egy álcázott \"SPLY-350\" márkajelzéssel rendelkezik az oldalsó csíkon.\r\n\r\nSzámos sziluett jelent 2016 óta. A Yeezy 350-es modell aratta előszőr az elsöprő sikert, viszont a Yeezy 700-as, a Yeezy Foam Runnerek, a Yeezy Slide-ok is nagyon pörögnek, köszönhetően a futurisztikus látványuknak, illetve az előbb említett elképesztő kényelmük miatt.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(5, 'Piros-Fehér', 'DK2311-322', 'Nike', 'SB Dunk Low What The Paul', '2020-03-20', 349990.00, 'db_dunk_low_what_the_paul_1.jpg, db_dunk_low_what_the_paul_2.jpg, db_dunk_low_what_the_paul_3.jpg', 'Paul Rodriguez már 10 cipővel büszkélkedhet. A hosszú múltra visszatekintő vonal elismeréseként ez a Dunk minden egyes stílus emlékezetes színváltozatának részleteit tartalmazza, így egy olyan eklektikus szövetet kapunk, amely minden anyag, grafika és színárnyalat mögött álló gazdag történetet ünnepel, amelyet P-Rod Nike Skateboardinggal való közös munkája során láthattunk.\r\n\r\nAz egyes cipők egymáshoz nem illő sminkjei kiemelik P-Rod aláírt vonalának néhány legikonikusabb elemét, a díszes hímzések, a vad nyomatok, a színes árnyalatok és a különböző prémium textúrák keverednek, hogy az ismerős vonásokat valami teljesen újdonsággá változtassák.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(6, 'Fekete-Barna', 'CC2311-322', 'Nike', 'Nike SB Dunk Low Travis Scott', '2020-08-13', 349990.00, 'nike_sb_dunk_low_travis_scott_1.jpg, nike_sb_dunk_low_travis_scott_2.jpg, nike_sb_dunk_low_travis_scott_3.jpg', 'Ez a Nike SB Dunk Low szarvasbőr felsőrészből áll, paisley vászon és kockás flanel felsőrésszel. Ahogy a paisley felületek lekopnak, egy elefántmintás anyag kerül elő. A gallér körüli hímzett szöveg, a kötélfűző és a La Flame Cactus Jack logója a puffos nyelveken teszi teljessé ezt a dizájnt.\r\nA Nike Dunk az utóbbi idők egyik legfelkapottabb sneaker modelljévé vált. A cipő gördeszkázásra nagyon alkalmas ezért is az egyik leghíresebb \"deszkás\" sneaker ami a 2020-as évtől kapott hype-ot. Azóta rengeteg kollaborációt, különleges modellt épített fel rá a Nike, ami a 2000-2010-es évek után most éli a reneszánszát.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(7, 'Kék-Fehér', 'EQ3213-221', 'Jordan', 'Air Jordan 4 Doernbecher', '2018-06-23', 1200000.00, 'air_jordan_4_retro_doernbecher_1.jpg, air_jordan_4_retro_doernbecher_2.jpg, air_jordan_4_retro_doernbecher_3.jpg', 'A monumentális Off-White x Air Jordan 1 harmadik kiadásához Virgil Abloh Michael Jordan első szignált cipőjének „UNC” színére koncentrált. A magas szárú pár az Észak-Karolinai Egyetem által inspirált ikonikus fehér és karolinai kék bőr felsőrésszel rendelkezik. A színeket Abloh dekonstruált esztétikája és olyan jellegzetes részletek egészítik ki, mint a piros zip-tie.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(8, 'Arany', 'II1233-212', 'Adidas', 'Adidas Gazelle Gucci Original GG Beige Brown', '2022-07-07', 299990.00, 'adidas_gazelle_gucci_original_gg_beige_brown_1.jpg, adidas_gazelle_gucci_original_gg_beige_brown_2.jpg, adidas_gazelle_gucci_original_gg_beige_brown_3.jpg', 'Az Adidas Gazelle cipő az időtlen stílus és kényelem tökéletes ötvözete. Ez a klasszikus és népszerű cipőmodell már évtizedek óta az utcai divat egyik ikonjává vált, és nem véletlenül. A Gazelle cipők egyszerre hozzák a régi iskolás stílus varázsát és a modern funkcionális dizájnt, így minden viseletük egy kifinomult elegancia és önbizalom kifejeződése.', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.'),
(9, 'Fehér-Kék', 'PP3121-344', 'Jordan', 'Jordan 1 High OG SP Fragment x Travis Scott', '2021-07-29', 1899990.00, 'jordan_1_high_og_sp_fragment_x_travis_scott_1.jpg, jordan_1_high_og_sp_fragment_x_travis_scott_2.jpg, jordan_1_high_og_sp_fragment_x_travis_scott_3.jpg', 'Az Air Jordan 1 High Fragment Design x Travis Scott egy 1985-ös Jordan 1 Royal sajtómintából merít ihletet a fehér és kék színű, bordázott bőr felsőrészével. A korábbi Travis Scott Jordan 1-ekhez hasonlóan a klasszikus dizájnhoz az aláírt fordított Swooshe-ok és a gallérban lévő rejtett zsebek is hozzájárulnak az extra megjelenéshez. Emellett Travis Scott Cactus Jack és Fragment logója is fekete színben található meg a sarokrészen.\r\nHa létezik kollaboráció egy előadó és egy óriás márka között akkor az első számú helyen a sneakerek övezte hype által Travis Scott kollabjai találhatóak. Számos kollaboráció jelent meg az első 2017-es Travis Scott Air Force 1 OG színállas óta, de nem ámitás ha a legesleghíresebbnek a Jordan 1 x Travis Scott ikonikus sneakerét hívjuk. ', 'Fizetés:\r\n\r\nUtánvéttel és bankkártyás fizetéssel is van lehetőségetek vásárolni. Utánvét esetén a futárnál készpénzzel és bankkártyával is tudtok fizetni, az online kártyás fizetéshez pedig az OTP Simple Pay rendszerét használjuk.\r\n\r\nSzállítás:\r\n\r\nA termékeket gondosan becsomagolva eredeti dobozukban küldjük amit dupla dobozba csomagolunk, hogy nehogy megsérüljön az általad rendelt áhított, sneaker, ruha, kiegészítő. A szállítás időtartalma Magyarországon 2-14 munkanap.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exkluziv_cipo_meretek`
--

CREATE TABLE `exkluziv_cipo_meretek` (
  `exkluziv_id` int(11) NOT NULL,
  `meret_id` int(11) NOT NULL,
  `keszlet` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `exkluziv_cipo_meretek`
--

INSERT INTO `exkluziv_cipo_meretek` (`exkluziv_id`, `meret_id`, `keszlet`) VALUES
(1, 42, 3),
(2, 44, 1),
(3, 43, 2),
(4, 43, 3),
(5, 44, 1),
(6, 43, 1),
(8, 42, 1),
(9, 44, 2);

--
-- Eseményindítók `exkluziv_cipo_meretek`
--
DELIMITER $$
CREATE TRIGGER `check_keszlet_before_update` BEFORE UPDATE ON `exkluziv_cipo_meretek` FOR EACH ROW BEGIN
   IF NEW.keszlet < 0 OR NEW.keszlet > 3 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'A keszlet értéke nem lehet kisebb 0-nál vagy nagyobb 3-nál';
   END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `felhasznalo_id` int(11) NOT NULL,
  `vezeteknev` varchar(100) NOT NULL,
  `keresztnev` varchar(100) NOT NULL,
  `felhasznalonev` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `jelszo_hash` varchar(255) NOT NULL,
  `szerep` enum('Vásárló','Adminisztrátor','Raktáros','Bolti eladó') DEFAULT 'Vásárló',
  `regisztracio_datuma` timestamp NOT NULL DEFAULT current_timestamp(),
  `hirlevel_feliratkozott` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`felhasznalo_id`, `vezeteknev`, `keresztnev`, `felhasznalonev`, `email`, `jelszo_hash`, `szerep`, `regisztracio_datuma`, `hirlevel_feliratkozott`) VALUES
(1, 'Kovács', 'Péter', '', 'peter.kovacs@example.com', 'hashed_password1', 'Adminisztrátor', '2025-02-21 09:07:56', 0),
(2, 'Nagy', 'Anna', '', 'anna.nagy@example.com', 'hashed_password2', 'Vásárló', '2025-02-21 09:07:56', 0),
(3, 'Smith', 'Christopher', 'chris', 'smicher@gmail.com', 'rolams', 'Adminisztrátor', '2025-03-26 10:55:01', 0),
(5, 'Davido', 'Christopher', 'smrch', 'smichedikr@gmail.com', 'roland', 'Raktáros', '2025-03-26 10:56:38', 0),
(6, 'Tari', 'Tamás', 'ableski', 'efokjaj@gmail.com', 'proba', 'Vásárló', '2025-03-28 09:06:53', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fizetes`
--

CREATE TABLE `fizetes` (
  `tranzakcio_id` int(11) NOT NULL,
  `rendeles_id` int(11) NOT NULL,
  `fizetesi_mod` enum('Kártya','Utánvét','Online fizetés') NOT NULL,
  `fizetesi_allapot` enum('Függőben','Kifizetve','Sikertelen') DEFAULT 'Függőben',
  `nyugta_szam` varchar(50) DEFAULT NULL,
  `szamla_szam` varchar(50) DEFAULT NULL,
  `fizetesi_idopont` timestamp NOT NULL DEFAULT current_timestamp(),
  `kosar_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hirlevel`
--

CREATE TABLE `hirlevel` (
  `email` varchar(255) NOT NULL,
  `feliratkozas_datuma` timestamp NOT NULL DEFAULT current_timestamp(),
  `felhasznalo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `keszlet`
--

CREATE TABLE `keszlet` (
  `keszlet_id` int(11) NOT NULL,
  `cipo_id` int(11) NOT NULL,
  `raktar_helyszin` varchar(255) NOT NULL,
  `aktualis_keszlet` int(11) NOT NULL DEFAULT 0,
  `bejovo_aruk` int(11) DEFAULT 0,
  `kimeno_aruk` int(11) DEFAULT 0,
  `keszlethiany` tinyint(1) DEFAULT 0,
  `tulkeszlet` tinyint(1) DEFAULT 0,
  `utolso_frissites` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `exkluziv_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `keszlet`
--

INSERT INTO `keszlet` (`keszlet_id`, `cipo_id`, `raktar_helyszin`, `aktualis_keszlet`, `bejovo_aruk`, `kimeno_aruk`, `keszlethiany`, `tulkeszlet`, `utolso_frissites`, `exkluziv_id`) VALUES
(1, 1, 'Raktár A', 17, 12, 8, 0, 0, '2025-03-05 07:59:21', NULL),
(2, 2, 'Raktár A', 4, 15, 5, 0, 0, '2025-03-05 07:59:21', NULL),
(3, 3, 'Raktár A', 17, 14, 18, 0, 0, '2025-03-05 07:59:21', NULL),
(4, 4, 'Raktár A', 11, 17, 14, 0, 0, '2025-03-05 07:59:21', NULL),
(5, 5, 'Raktár A', 17, 9, 13, 0, 0, '2025-03-05 08:09:30', NULL),
(6, 6, 'Raktár A', 11, 19, 6, 0, 0, '2025-03-05 07:59:21', NULL),
(7, 7, 'Raktár A', 11, 14, 2, 0, 0, '2025-03-05 07:59:21', NULL),
(8, 8, 'Raktár A', 6, 3, 14, 0, 0, '2025-03-05 07:59:21', NULL),
(9, 9, 'Raktár A', 5, 3, 19, 0, 0, '2025-03-05 07:59:21', NULL),
(10, 10, 'Raktár A', 7, 15, 16, 0, 0, '2025-03-05 07:59:21', NULL),
(11, 11, 'Raktár A', 14, 5, 19, 0, 0, '2025-03-05 07:59:21', NULL),
(12, 12, 'Raktár A', 2, 11, 10, 0, 0, '2025-03-05 07:59:21', NULL),
(13, 13, 'Raktár A', 18, 1, 7, 0, 0, '2025-03-05 07:59:21', NULL),
(14, 14, 'Raktár A', 14, 10, 8, 0, 0, '2025-03-05 07:59:21', NULL),
(15, 15, 'Raktár A', 11, 9, 11, 0, 0, '2025-03-05 07:59:21', NULL),
(16, 16, 'Raktár A', 8, 6, 8, 0, 0, '2025-03-05 07:59:21', NULL),
(17, 17, 'Raktár A', 3, 9, 16, 0, 0, '2025-03-05 07:59:21', NULL),
(18, 18, 'Raktár A', 15, 9, 15, 0, 0, '2025-03-05 07:59:21', NULL),
(19, 19, 'Raktár A', 12, 13, 10, 0, 0, '2025-03-05 07:59:21', NULL),
(20, 20, 'Raktár A', 12, 8, 6, 0, 0, '2025-03-05 07:59:21', NULL),
(21, 21, 'Raktár A', 5, 6, 13, 0, 0, '2025-03-05 07:59:21', NULL),
(22, 22, 'Raktár A', 7, 18, 12, 0, 0, '2025-03-05 07:59:21', NULL),
(23, 23, 'Raktár A', 5, 7, 2, 0, 0, '2025-03-05 07:59:21', NULL),
(24, 24, 'Raktár A', 7, 10, 8, 0, 0, '2025-03-05 07:59:21', NULL),
(25, 25, 'Raktár A', 11, 12, 5, 0, 0, '2025-03-05 07:59:21', NULL),
(26, 26, 'Raktár A', 8, 7, 12, 0, 0, '2025-03-05 07:59:21', NULL),
(27, 27, 'Raktár A', 17, 12, 7, 0, 0, '2025-03-05 07:59:21', NULL),
(28, 28, 'Raktár A', 18, 14, 12, 0, 0, '2025-03-05 07:59:21', NULL),
(29, 29, 'Raktár A', 1, 5, 5, 0, 0, '2025-03-05 07:59:21', NULL),
(30, 30, 'Raktár A', 8, 7, 8, 0, 0, '2025-03-05 07:59:21', NULL),
(31, 31, 'Raktár A', 1, 18, 9, 0, 0, '2025-03-05 07:59:21', NULL),
(32, 32, 'Raktár A', 9, 17, 1, 0, 0, '2025-03-05 07:59:21', NULL),
(33, 33, 'Raktár A', 9, 4, 13, 0, 0, '2025-03-05 07:59:21', NULL),
(34, 34, 'Raktár A', 16, 1, 12, 0, 0, '2025-03-05 07:59:21', NULL),
(35, 35, 'Raktár A', 18, 15, 2, 0, 0, '2025-03-05 07:59:21', NULL),
(36, 36, 'Raktár A', 5, 17, 13, 0, 0, '2025-03-05 07:59:21', NULL),
(37, 37, 'Raktár A', 12, 3, 17, 0, 0, '2025-03-05 07:59:21', NULL),
(38, 38, 'Raktár A', 17, 14, 1, 0, 0, '2025-03-05 07:59:21', NULL),
(39, 39, 'Raktár A', 2, 5, 16, 0, 0, '2025-03-05 07:59:21', NULL),
(40, 40, 'Raktár A', 11, 6, 13, 0, 0, '2025-03-05 07:59:21', NULL),
(41, 41, 'Raktár A', 11, 13, 13, 0, 0, '2025-03-05 07:59:21', NULL),
(42, 42, 'Raktár A', 6, 11, 16, 0, 0, '2025-03-05 07:59:21', NULL),
(43, 43, 'Raktár A', 11, 5, 10, 0, 0, '2025-03-05 07:59:21', NULL),
(44, 44, 'Raktár A', 17, 15, 4, 0, 0, '2025-03-05 07:59:21', NULL),
(45, 45, 'Raktár A', 14, 18, 10, 0, 0, '2025-03-05 07:59:21', NULL),
(46, 46, 'Raktár A', 13, 15, 18, 0, 0, '2025-03-05 07:59:21', NULL),
(47, 47, 'Raktár A', 7, 18, 10, 0, 0, '2025-03-05 07:59:21', NULL),
(48, 48, 'Raktár A', 16, 11, 7, 0, 0, '2025-03-05 07:59:21', NULL),
(49, 49, 'Raktár A', 19, 17, 7, 0, 0, '2025-03-05 07:59:21', NULL),
(50, 50, 'Raktár A', 5, 2, 13, 0, 0, '2025-03-05 07:59:21', NULL),
(51, 51, 'Raktár A', 1, 6, 7, 0, 0, '2025-03-05 07:59:21', NULL),
(52, 52, 'Raktár A', 16, 2, 17, 0, 0, '2025-03-05 07:59:21', NULL),
(53, 53, 'Raktár A', 3, 19, 10, 0, 0, '2025-03-05 07:59:21', NULL),
(54, 54, 'Raktár A', 10, 2, 16, 0, 0, '2025-03-05 07:59:21', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosar`
--

CREATE TABLE `kosar` (
  `kosar_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `cipo_id` int(11) NOT NULL,
  `meret` float NOT NULL,
  `darabszam` int(11) NOT NULL DEFAULT 1,
  `egysegar` decimal(10,2) NOT NULL,
  `exkluziv_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `meretek`
--

CREATE TABLE `meretek` (
  `meret_id` int(11) NOT NULL,
  `cipo_id` int(11) NOT NULL,
  `meret` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `meretek`
--

INSERT INTO `meretek` (`meret_id`, `cipo_id`, `meret`) VALUES
(1, 1, 40),
(2, 1, 41),
(3, 1, 42),
(4, 2, 43),
(5, 2, 44),
(6, 1, 43),
(7, 1, 44),
(8, 1, 45),
(9, 1, 46),
(10, 1, 47),
(11, 1, 48),
(12, 1, 49),
(13, 2, 40),
(14, 2, 41),
(15, 2, 42),
(16, 2, 45),
(17, 2, 46),
(18, 2, 47),
(19, 2, 48),
(20, 2, 49),
(21, 3, 40),
(22, 3, 41),
(23, 3, 42),
(24, 3, 43),
(25, 3, 44),
(26, 3, 45),
(100, 4, 40),
(101, 4, 41),
(102, 4, 42),
(103, 4, 43),
(104, 4, 44),
(105, 4, 45),
(106, 4, 46),
(107, 5, 40),
(108, 5, 41),
(109, 5, 42),
(110, 5, 43),
(111, 5, 44),
(112, 5, 45),
(113, 5, 46),
(114, 5, 47),
(115, 5, 48),
(116, 5, 49),
(117, 6, 41),
(118, 7, 40),
(119, 7, 41),
(120, 7, 42),
(121, 7, 43),
(122, 7, 44),
(123, 7, 45),
(124, 7, 46),
(125, 7, 47),
(126, 7, 48),
(127, 7, 49),
(128, 8, 40),
(129, 8, 41),
(130, 8, 42),
(131, 8, 43),
(132, 8, 44),
(133, 8, 45),
(134, 8, 46),
(135, 8, 47),
(136, 8, 48),
(137, 8, 49),
(138, 9, 40),
(139, 9, 41),
(140, 9, 42),
(141, 9, 43),
(142, 9, 44),
(143, 9, 45),
(144, 9, 46),
(145, 9, 47),
(146, 10, 40),
(147, 10, 41),
(148, 10, 42),
(149, 10, 43),
(150, 10, 44),
(151, 10, 45),
(152, 10, 46),
(153, 10, 47),
(154, 10, 48),
(155, 10, 49),
(156, 11, 40),
(157, 11, 41),
(158, 11, 42),
(159, 11, 43),
(160, 11, 44),
(161, 11, 45),
(162, 11, 46),
(163, 11, 47),
(164, 11, 48),
(165, 11, 49),
(166, 12, 40),
(167, 12, 41),
(168, 12, 42),
(169, 12, 43),
(170, 12, 44),
(171, 12, 45),
(172, 12, 46),
(173, 12, 47),
(174, 12, 48),
(175, 12, 49),
(176, 13, 40),
(177, 13, 41),
(178, 13, 42),
(179, 13, 43),
(180, 13, 44),
(181, 13, 45),
(182, 13, 46),
(183, 13, 47),
(184, 13, 48),
(185, 13, 49),
(186, 14, 40),
(187, 14, 41),
(188, 14, 42),
(189, 14, 43),
(190, 14, 44),
(191, 14, 45),
(192, 14, 46),
(193, 14, 47),
(194, 14, 48),
(195, 14, 49),
(196, 15, 40),
(197, 15, 41),
(198, 15, 42),
(199, 15, 43),
(200, 15, 44),
(201, 15, 45),
(202, 15, 46),
(203, 15, 47),
(204, 15, 48),
(205, 15, 49),
(206, 16, 40),
(207, 16, 41),
(208, 16, 42),
(209, 16, 43),
(210, 16, 44),
(211, 16, 45),
(212, 16, 46),
(213, 16, 47),
(214, 16, 48),
(215, 16, 49),
(216, 17, 40),
(217, 17, 41),
(218, 17, 42),
(219, 17, 43),
(220, 17, 44),
(221, 17, 45),
(222, 17, 46),
(223, 17, 47),
(224, 17, 48),
(225, 17, 49),
(226, 18, 40),
(227, 18, 41),
(228, 18, 42),
(229, 18, 43),
(230, 18, 44),
(231, 18, 45),
(232, 18, 46),
(233, 18, 47),
(234, 18, 48),
(235, 18, 49),
(236, 19, 40),
(237, 19, 41),
(238, 19, 42),
(239, 19, 43),
(240, 19, 44),
(241, 19, 45),
(242, 19, 46),
(243, 19, 47),
(244, 19, 48),
(245, 19, 49),
(246, 20, 40),
(247, 20, 41),
(248, 20, 42),
(249, 20, 43),
(250, 20, 44),
(251, 20, 45),
(252, 20, 46),
(253, 20, 47),
(254, 20, 48),
(255, 20, 49),
(256, 21, 40),
(257, 21, 41),
(258, 21, 42),
(259, 21, 43),
(260, 21, 44),
(261, 21, 45),
(262, 21, 46),
(263, 21, 47),
(264, 21, 48),
(265, 21, 49),
(266, 22, 40),
(267, 22, 41),
(268, 22, 42),
(269, 22, 43),
(270, 22, 44),
(271, 22, 45),
(272, 22, 46),
(273, 22, 47),
(274, 22, 48),
(275, 22, 49),
(276, 23, 40),
(277, 23, 41),
(278, 23, 42),
(279, 23, 43),
(280, 23, 44),
(281, 23, 45),
(282, 23, 46),
(283, 23, 47),
(284, 23, 48),
(285, 23, 49),
(286, 24, 40),
(287, 24, 41),
(288, 24, 42),
(289, 24, 43),
(290, 24, 44),
(291, 24, 45),
(292, 24, 46),
(293, 24, 47),
(294, 24, 48),
(295, 24, 49),
(296, 25, 40),
(297, 25, 41),
(298, 25, 42),
(299, 25, 43),
(300, 25, 44),
(301, 25, 45),
(302, 25, 46),
(303, 25, 47),
(304, 25, 48),
(305, 25, 49),
(306, 26, 40),
(307, 26, 41),
(308, 26, 42),
(309, 26, 43),
(310, 26, 44),
(311, 26, 45),
(312, 26, 46),
(313, 26, 47),
(314, 26, 48),
(315, 26, 49),
(316, 27, 40),
(317, 27, 41),
(318, 27, 42),
(319, 27, 43),
(320, 27, 44),
(321, 27, 45),
(322, 27, 46),
(323, 27, 47),
(324, 27, 48),
(325, 27, 49),
(326, 28, 40),
(327, 28, 41),
(328, 28, 42),
(329, 28, 43),
(330, 28, 44),
(331, 28, 45),
(332, 28, 46),
(333, 28, 47),
(334, 28, 48),
(335, 28, 49),
(336, 29, 40),
(337, 29, 41),
(338, 29, 42),
(339, 29, 43),
(340, 29, 44),
(341, 29, 45),
(342, 29, 46),
(343, 29, 47),
(344, 29, 48),
(345, 29, 49),
(346, 30, 40),
(347, 30, 41),
(348, 30, 42),
(349, 30, 43),
(350, 30, 44),
(351, 30, 45),
(352, 30, 46),
(353, 30, 47),
(354, 30, 48),
(355, 30, 49),
(356, 31, 40),
(357, 31, 41),
(358, 31, 42),
(359, 31, 43),
(360, 31, 44),
(361, 31, 45),
(362, 31, 46),
(363, 31, 47),
(364, 31, 48),
(365, 31, 49),
(366, 32, 40),
(367, 32, 41),
(368, 32, 42),
(369, 32, 43),
(370, 32, 44),
(371, 32, 45),
(372, 32, 46),
(373, 32, 47),
(374, 32, 48),
(375, 32, 49),
(376, 33, 40),
(377, 33, 41),
(378, 33, 42),
(379, 33, 43),
(380, 33, 44),
(381, 33, 45),
(382, 33, 46),
(383, 33, 47),
(384, 33, 48),
(385, 33, 49),
(386, 34, 40),
(387, 34, 41),
(388, 34, 42),
(389, 34, 43),
(390, 34, 44),
(391, 34, 45),
(392, 34, 46),
(393, 34, 47),
(394, 34, 48),
(395, 34, 49),
(396, 35, 40),
(397, 35, 41),
(398, 35, 42),
(399, 35, 43),
(400, 35, 44),
(401, 35, 45),
(402, 35, 46),
(403, 35, 47),
(404, 35, 48),
(405, 35, 49),
(406, 36, 40),
(407, 36, 41),
(408, 36, 42),
(409, 36, 43),
(410, 36, 44),
(411, 36, 45),
(412, 36, 46),
(413, 36, 47),
(414, 36, 48),
(415, 36, 49),
(416, 37, 40),
(417, 37, 41),
(418, 37, 42),
(419, 37, 43),
(420, 37, 44),
(421, 37, 45),
(422, 37, 46),
(423, 37, 47),
(424, 37, 48),
(425, 37, 49),
(426, 38, 40),
(427, 38, 41),
(428, 38, 42),
(429, 38, 43),
(430, 38, 44),
(431, 38, 45),
(432, 38, 46),
(433, 38, 47),
(434, 38, 48),
(435, 38, 49),
(436, 39, 40),
(437, 39, 41),
(438, 39, 42),
(439, 39, 43),
(440, 39, 44),
(441, 39, 45),
(442, 39, 46),
(443, 39, 47),
(444, 39, 48),
(445, 39, 49),
(446, 40, 40),
(447, 40, 41),
(448, 40, 42),
(449, 40, 43),
(450, 40, 44),
(451, 40, 45),
(452, 40, 46),
(453, 40, 47),
(454, 40, 48),
(455, 40, 49),
(456, 41, 40),
(457, 41, 41),
(458, 41, 42),
(459, 41, 43),
(460, 41, 44),
(461, 41, 45),
(462, 41, 46),
(463, 41, 47),
(464, 41, 48),
(465, 41, 49),
(466, 42, 40),
(467, 42, 41),
(468, 42, 42),
(469, 42, 43),
(470, 42, 44),
(471, 42, 45),
(472, 42, 46),
(473, 42, 47),
(474, 42, 48),
(475, 42, 49),
(476, 43, 40),
(477, 43, 41),
(478, 43, 42),
(479, 43, 43),
(480, 43, 44),
(481, 43, 45),
(482, 43, 46),
(483, 43, 47),
(484, 43, 48),
(485, 43, 49),
(486, 44, 40),
(487, 44, 41),
(488, 44, 42),
(489, 44, 43),
(490, 44, 44),
(491, 44, 45),
(492, 44, 46),
(493, 44, 47),
(494, 44, 48),
(495, 44, 49),
(496, 45, 40),
(497, 45, 41),
(498, 45, 42),
(499, 45, 43),
(500, 45, 44),
(501, 45, 45),
(502, 45, 46),
(503, 45, 47),
(504, 45, 48),
(505, 45, 49),
(506, 46, 40),
(507, 46, 41),
(508, 46, 42),
(509, 46, 43),
(510, 46, 44),
(511, 46, 45),
(512, 46, 46),
(513, 46, 47),
(514, 46, 48),
(515, 46, 49),
(516, 47, 40),
(517, 47, 41),
(518, 47, 42),
(519, 47, 43),
(520, 47, 44),
(521, 47, 45),
(522, 47, 46),
(523, 47, 47),
(524, 47, 48),
(525, 47, 49),
(526, 48, 40),
(527, 48, 41),
(528, 48, 42),
(529, 48, 43),
(530, 48, 44),
(531, 48, 45),
(532, 48, 46),
(533, 48, 47),
(534, 48, 48),
(535, 48, 49),
(536, 49, 40),
(537, 49, 41),
(538, 49, 42),
(539, 49, 43),
(540, 49, 44),
(541, 49, 45),
(542, 49, 46),
(543, 49, 47),
(544, 49, 48),
(545, 49, 49),
(546, 50, 40),
(547, 50, 41),
(548, 50, 42),
(549, 50, 43),
(550, 50, 44),
(551, 50, 45),
(552, 50, 46),
(553, 50, 47),
(554, 50, 48),
(555, 50, 49),
(556, 51, 40),
(557, 51, 41),
(558, 51, 42),
(559, 51, 43),
(560, 51, 44),
(561, 51, 45),
(562, 51, 46),
(563, 51, 47),
(564, 51, 48),
(565, 51, 49),
(566, 52, 40),
(567, 52, 41),
(568, 52, 42),
(569, 52, 43),
(570, 52, 44),
(571, 52, 45),
(572, 52, 46),
(573, 52, 47),
(574, 52, 48),
(575, 52, 49),
(576, 53, 40),
(577, 53, 41),
(578, 53, 42),
(579, 53, 43),
(580, 53, 44),
(581, 53, 45),
(582, 53, 46),
(583, 53, 47),
(584, 53, 48),
(585, 53, 49),
(586, 54, 40),
(587, 54, 41),
(588, 54, 42),
(589, 54, 43),
(590, 54, 44),
(591, 54, 45),
(592, 54, 46),
(593, 54, 47),
(594, 54, 48),
(595, 54, 49);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendelesek`
--

CREATE TABLE `rendelesek` (
  `rendeles_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `rendeles_datuma` timestamp NOT NULL DEFAULT current_timestamp(),
  `osszeg` decimal(10,2) NOT NULL,
  `statusz` enum('Függőben','Kiszállítva','Kézbesítve','Törölve') DEFAULT 'Függőben',
  `cipo_id` int(11) DEFAULT NULL,
  `meret` float DEFAULT NULL,
  `darabszam` int(11) DEFAULT NULL,
  `egyseg` decimal(10,2) DEFAULT NULL,
  `egysegar` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szallitok`
--

CREATE TABLE `szallitok` (
  `szallito_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `elerhetoseg` text NOT NULL,
  `szallitasi_ido` varchar(50) NOT NULL,
  `szallitasi_feltetelek` text DEFAULT NULL,
  `telefon_szam` varchar(20) NOT NULL,
  `email_cim` varchar(255) NOT NULL,
  `szallitasi_dij` varchar(50) NOT NULL,
  `szolgaltatas_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szallitok`
--

INSERT INTO `szallitok` (`szallito_id`, `nev`, `elerhetoseg`, `szallitasi_ido`, `szallitasi_feltetelek`, `telefon_szam`, `email_cim`, `szallitasi_dij`, `szolgaltatas_nev`) VALUES
(1, 'GLS Hungary', 'Budapest, GLS Központ', '1-5 munkanap', 'Belföldi és nemzetközi csomagszállítás', '+3612345678', 'info@gls-hungary.com', 'Ingyenes', 'csomagszállítás'),
(2, 'Magyar Posta', 'Budapest, Pestszentlőrinc 6 Posta', '1-5 munkanap', 'Csak belföldi csomagszállítás', '+3617678282', 'ugyfelszolgalat@posta.hu', '0.00', 'csomagszállítás'),
(3, 'DHL Express', 'Budapest, DHL Logisztikai Központ', '1-5 munkanap', 'Belföldi és nemzetközi csomagszállítás', '+3618770000', 'customer.service@dhl.com', '0.00', 'csomagszállítás');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `arvaltozas`
--
ALTER TABLE `arvaltozas`
  ADD PRIMARY KEY (`arvaltozas_id`),
  ADD KEY `cipo_id` (`cipo_id`),
  ADD KEY `fk_arvaltozas_exkluziv_cipok` (`exkluziv_id`);

--
-- A tábla indexei `beszallitott_termekek`
--
ALTER TABLE `beszallitott_termekek`
  ADD PRIMARY KEY (`termek_id`),
  ADD KEY `szallito_id` (`szallito_id`),
  ADD KEY `cipo_id` (`cipo_id`),
  ADD KEY `fk_beszallitott_termekek_exkluziv_cipok` (`exkluziv_id`);

--
-- A tábla indexei `cipok`
--
ALTER TABLE `cipok`
  ADD PRIMARY KEY (`cipo_id`);

--
-- A tábla indexei `exkluziv_cipok`
--
ALTER TABLE `exkluziv_cipok`
  ADD PRIMARY KEY (`exkluziv_id`);

--
-- A tábla indexei `exkluziv_cipo_meretek`
--
ALTER TABLE `exkluziv_cipo_meretek`
  ADD PRIMARY KEY (`exkluziv_id`,`meret_id`),
  ADD KEY `meret_id` (`meret_id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`felhasznalo_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `fizetes`
--
ALTER TABLE `fizetes`
  ADD PRIMARY KEY (`tranzakcio_id`),
  ADD KEY `rendeles_id` (`rendeles_id`),
  ADD KEY `fk_fizetes_kosar` (`kosar_id`);

--
-- A tábla indexei `hirlevel`
--
ALTER TABLE `hirlevel`
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `keszlet`
--
ALTER TABLE `keszlet`
  ADD PRIMARY KEY (`keszlet_id`),
  ADD KEY `cipo_id` (`cipo_id`),
  ADD KEY `fk_keszlet_exkluziv_cipok` (`exkluziv_id`);

--
-- A tábla indexei `kosar`
--
ALTER TABLE `kosar`
  ADD PRIMARY KEY (`kosar_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `cipo_id` (`cipo_id`),
  ADD KEY `fk_kosar_exkluziv_cipok` (`exkluziv_id`);

--
-- A tábla indexei `meretek`
--
ALTER TABLE `meretek`
  ADD PRIMARY KEY (`meret_id`),
  ADD KEY `cipo_id` (`cipo_id`);

--
-- A tábla indexei `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD PRIMARY KEY (`rendeles_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `szallitok`
--
ALTER TABLE `szallitok`
  ADD PRIMARY KEY (`szallito_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `arvaltozas`
--
ALTER TABLE `arvaltozas`
  MODIFY `arvaltozas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT a táblához `beszallitott_termekek`
--
ALTER TABLE `beszallitott_termekek`
  MODIFY `termek_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cipok`
--
ALTER TABLE `cipok`
  MODIFY `cipo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT a táblához `exkluziv_cipok`
--
ALTER TABLE `exkluziv_cipok`
  MODIFY `exkluziv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `fizetes`
--
ALTER TABLE `fizetes`
  MODIFY `tranzakcio_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `keszlet`
--
ALTER TABLE `keszlet`
  MODIFY `keszlet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT a táblához `kosar`
--
ALTER TABLE `kosar`
  MODIFY `kosar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `meretek`
--
ALTER TABLE `meretek`
  MODIFY `meret_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=596;

--
-- AUTO_INCREMENT a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  MODIFY `rendeles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT a táblához `szallitok`
--
ALTER TABLE `szallitok`
  MODIFY `szallito_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `arvaltozas`
--
ALTER TABLE `arvaltozas`
  ADD CONSTRAINT `arvaltozas_ibfk_1` FOREIGN KEY (`cipo_id`) REFERENCES `cipok` (`cipo_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_arvaltozas_exkluziv_cipok` FOREIGN KEY (`exkluziv_id`) REFERENCES `exkluziv_cipok` (`exkluziv_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `beszallitott_termekek`
--
ALTER TABLE `beszallitott_termekek`
  ADD CONSTRAINT `beszallitott_termekek_ibfk_1` FOREIGN KEY (`szallito_id`) REFERENCES `szallitok` (`szallito_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beszallitott_termekek_ibfk_2` FOREIGN KEY (`cipo_id`) REFERENCES `cipok` (`cipo_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_beszallitott_termekek_exkluziv_cipok` FOREIGN KEY (`exkluziv_id`) REFERENCES `exkluziv_cipok` (`exkluziv_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `exkluziv_cipo_meretek`
--
ALTER TABLE `exkluziv_cipo_meretek`
  ADD CONSTRAINT `exkluziv_cipo_meretek_ibfk_1` FOREIGN KEY (`exkluziv_id`) REFERENCES `exkluziv_cipok` (`exkluziv_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `fizetes`
--
ALTER TABLE `fizetes`
  ADD CONSTRAINT `fizetes_ibfk_1` FOREIGN KEY (`rendeles_id`) REFERENCES `rendelesek` (`rendeles_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_fizetes_kosar` FOREIGN KEY (`kosar_id`) REFERENCES `kosar` (`kosar_id`);

--
-- Megkötések a táblához `hirlevel`
--
ALTER TABLE `hirlevel`
  ADD CONSTRAINT `fk_felhasznalo_id` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `keszlet`
--
ALTER TABLE `keszlet`
  ADD CONSTRAINT `fk_keszlet_exkluziv_cipok` FOREIGN KEY (`exkluziv_id`) REFERENCES `exkluziv_cipok` (`exkluziv_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `keszlet_ibfk_1` FOREIGN KEY (`cipo_id`) REFERENCES `cipok` (`cipo_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `kosar`
--
ALTER TABLE `kosar`
  ADD CONSTRAINT `fk_kosar_exkluziv_cipok` FOREIGN KEY (`exkluziv_id`) REFERENCES `exkluziv_cipok` (`exkluziv_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `kosar_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalo_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kosar_ibfk_2` FOREIGN KEY (`cipo_id`) REFERENCES `cipok` (`cipo_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `meretek`
--
ALTER TABLE `meretek`
  ADD CONSTRAINT `meretek_ibfk_1` FOREIGN KEY (`cipo_id`) REFERENCES `cipok` (`cipo_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD CONSTRAINT `rendelesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalo_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
