/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 15/05/2024 13:59:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_cate
-- ----------------------------
DROP TABLE IF EXISTS `article_cate`;
CREATE TABLE `article_cate`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cate_alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id` DESC) USING BTREE,
  UNIQUE INDEX `cate_name`(`cate_name` ASC) USING BTREE,
  UNIQUE INDEX `cate_alias`(`cate_alias` ASC) USING BTREE,
  UNIQUE INDEX ` id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_cate
-- ----------------------------
INSERT INTO `article_cate` VALUES (13, 'wdjd11', 'wsahfs11', 0);
INSERT INTO `article_cate` VALUES (12, 'wsahfs', 'wsahfs', 0);
INSERT INTO `article_cate` VALUES (11, '看见额购物', 'wgslkjfolwe', 0);
INSERT INTO `article_cate` VALUES (10, 'hewsahfs', 'jesklwealetwf', 0);
INSERT INTO `article_cate` VALUES (9, '1', '21', 0);
INSERT INTO `article_cate` VALUES (2, '历史', 'LiShi', 0);
INSERT INTO `article_cate` VALUES (1, '科技', 'KeJi', 1);

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cover_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pub_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` tinyint NOT NULL DEFAULT 0,
  `cate_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`id` DESC) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, 'test1', 'test1', '\\uploads\\d9cbfcae367bcbb8550bbd002054fc62', '2024-05-14 21:56:58.373', '已发布', 1, 6, 20);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id` DESC) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
