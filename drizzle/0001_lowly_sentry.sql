CREATE TABLE `permission` (
	`user_id` varchar(255) NOT NULL,
	`curr_branch_no` int NOT NULL,
	`curr_chapter_no` int NOT NULL,
	`curr_level_no` int NOT NULL,
	CONSTRAINT `permission_user_id_curr_branch_no_pk` PRIMARY KEY(`user_id`,`curr_branch_no`)
);
--> statement-breakpoint
ALTER TABLE `permission` ADD CONSTRAINT `permission_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `permission` ADD CONSTRAINT `permission_curr_branch_no_curr_chapter_no_curr_level_no_level_branch_no_chapter_no_level_no_fk` FOREIGN KEY (`curr_branch_no`,`curr_chapter_no`,`curr_level_no`) REFERENCES `level`(`branch_no`,`chapter_no`,`level_no`) ON DELETE no action ON UPDATE no action;