CREATE TABLE `branch` (
	`branch_no` int NOT NULL,
	`no_of_chapters` int NOT NULL,
	`map_name` varchar(100) NOT NULL,
	CONSTRAINT `branch_branch_no` PRIMARY KEY(`branch_no`)
);
--> statement-breakpoint
CREATE TABLE `chapter` (
	`chapter_no` int NOT NULL,
	`branch_no` int NOT NULL,
	`no_of_minigames` int NOT NULL,
	CONSTRAINT `chapter_chapter_no` PRIMARY KEY(`chapter_no`, `branch_no`)
);
--> statement-breakpoint
CREATE TABLE `level` (
	`level_no` int NOT NULL,
	`chapter_no` int NOT NULL,
	`branch_no` int NOT NULL,
	`minigame_name` varchar(8) NOT NULL,
	`x` int NOT NULL,
	`y` int NOT NULL,
	CONSTRAINT `level_level_no_chapter_no_branch_no_pk` PRIMARY KEY(`level_no`,`chapter_no`,`branch_no`),
	CONSTRAINT `level_chapter_no_branch_no_x_y_unique` UNIQUE(`chapter_no`,`branch_no`,`x`,`y`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) COLLATE utf8mb4_bin NOT NULL,
	`password_hash` varchar(100) NOT NULL,
	`curr_branch_no` int DEFAULT 1,
	`curr_chapter_no` int DEFAULT 1,
	`curr_level_no` int DEFAULT 1,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`expires_at` datetime NOT NULL,
	`user_id` bigint,
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `chapter` ADD CONSTRAINT `chapter_branch_no_branch_branch_no_fk` FOREIGN KEY (`branch_no`) REFERENCES `branch`(`branch_no`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `level` ADD CONSTRAINT `level_chapter_no_branch_no_chapter_chapter_no_branch_no_fk` FOREIGN KEY (`chapter_no`,`branch_no`) REFERENCES `chapter`(`chapter_no`,`branch_no`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;