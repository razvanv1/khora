CREATE TABLE `admin_notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text,
	`data` json,
	`isRead` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recipientEmail` varchar(320) NOT NULL,
	`recipientName` varchar(255),
	`emailType` varchar(64) NOT NULL,
	`subject` varchar(500),
	`status` enum('pending','sent','failed','bounced') NOT NULL DEFAULT 'pending',
	`errorMessage` text,
	`sentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(10) NOT NULL,
	`totalSubscribers` int DEFAULT 0,
	`newSubscribers` int DEFAULT 0,
	`totalUsers` int DEFAULT 0,
	`newUsers` int DEFAULT 0,
	`emailsSent` int DEFAULT 0,
	`pageViews` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_stats_date_unique` UNIQUE(`date`)
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`source` varchar(64) DEFAULT 'onboarding',
	`gender` varchar(16),
	`age` int,
	`weight` int,
	`height` int,
	`activityLevel` varchar(32),
	`goal` varchar(64),
	`dietaryStyle` varchar(64),
	`calculatedMetrics` json,
	`mealPreferences` json,
	`allergies` json,
	`wantsNewsletter` boolean DEFAULT true,
	`wantsRecipes` boolean DEFAULT true,
	`wantsTips` boolean DEFAULT true,
	`emailVerified` boolean DEFAULT false,
	`welcomeEmailSent` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gender` varchar(16),
	`age` int,
	`weight` int,
	`height` int,
	`activityLevel` varchar(32),
	`goal` varchar(64),
	`dietaryStyle` varchar(64),
	`calculatedMetrics` json,
	`mealPreferences` json,
	`allergies` json,
	`hydrationHistory` json,
	`supplementHistory` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_profiles_userId_unique` UNIQUE(`userId`)
);
