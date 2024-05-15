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

 Date: 15/05/2024 14:35:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_cate
-- ----------------------------
DROP TABLE IF EXISTS `article_cate`;
CREATE TABLE `article_cate`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文章分类id',
  `cate_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章分类名字\r\n',
  `cate_alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章分类别名',
  `is_delete` tinyint UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章分类是否是被删除\\n0 表示 未被删除\\n1 表示 已被删除',
  PRIMARY KEY (`id` DESC) USING BTREE,
  UNIQUE INDEX `cate_name`(`cate_name` ASC) USING BTREE,
  UNIQUE INDEX `cate_alias`(`cate_alias` ASC) USING BTREE,
  UNIQUE INDEX ` id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_cate
-- ----------------------------
INSERT INTO `article_cate` VALUES (2, '历史', 'LiShi', 1);
INSERT INTO `article_cate` VALUES (1, '科技', 'KeJi', 0);

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文章id\r\n',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章内容',
  `cover_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章封面图片地址',
  `pub_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章发布时间',
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章状态  只能是[\"已发布\", \"草稿\"]',
  `is_delete` tinyint NOT NULL DEFAULT 0 COMMENT '文章删除状态 /0代表未删除 /1代表删除',
  `cate_id` int NOT NULL COMMENT '文章分类id\r\n',
  `author_id` int NOT NULL COMMENT '文章作者id\r\n',
  PRIMARY KEY (`id` DESC) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, 'test1', 'test1', '\\uploads\\d9cbfcae367bcbb8550bbd002054fc62', '2024-05-14 21:56:58.373', '已发布', 0, 1, 20);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码别名(昵称)',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电子邮箱',
  `user_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '头像',
  PRIMARY KEY (`id` DESC) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (23, 'admin', '$2a$10$15Nh2hPn4o6rQJ7pMOiDqOMPl0FHyaOULZI0s5Wlq/5I5qnDX/47u', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
