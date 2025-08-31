CREATE TABLE `exchange_rate` (
	`id` text PRIMARY KEY DEFAULT '370e1609-29af-4399-b9fd-fa0c5e8bc822' NOT NULL,
	`rate` real NOT NULL,
	`updatedBy` text NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` text PRIMARY KEY DEFAULT '0ecee177-574b-43f6-a2d6-613d188232f9' NOT NULL,
	`name` text(100) NOT NULL,
	`buyPrice` integer NOT NULL,
	`sellPrice` integer NOT NULL,
	`addedBy` text NOT NULL,
	`isDeleted` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`addedBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `product_name_unique` ON `product` (`name`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `product` (`name`);--> statement-breakpoint
CREATE TABLE `role` (
	`id` text PRIMARY KEY DEFAULT 'bc238eff-4ee2-48fb-9c90-bd28b191545c' NOT NULL,
	`type` text NOT NULL,
	CONSTRAINT "type_check" CHECK("role"."type"
      IN ('ADMIN', 'OWNER', 'STAFF'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_type_unique` ON `role` (`type`);--> statement-breakpoint
CREATE TABLE `sale_item` (
	`id` text PRIMARY KEY DEFAULT '2691166a-a492-429c-b8fe-f5cdcb9eaeaa' NOT NULL,
	`saleID` text NOT NULL,
	`productID` text NOT NULL,
	`quantity` integer NOT NULL,
	`unitPrice` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`saleID`) REFERENCES `sale`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `sale` (
	`id` text PRIMARY KEY DEFAULT '69803e2d-b9db-49e5-9bca-eca23412d848' NOT NULL,
	`sellerID` text NOT NULL,
	`exchangeRateID` text NOT NULL,
	`usedLocalCurrency` integer NOT NULL,
	`totalAmount` integer NOT NULL,
	`amountPaid` integer NOT NULL,
	`changeReceived` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`sellerID`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`exchangeRateID`) REFERENCES `exchange_rate`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `stock` (
	`id` text PRIMARY KEY DEFAULT '86f88fc7-3143-49a8-8caf-7fe09d67978c' NOT NULL,
	`productID` text NOT NULL,
	`quantity` integer NOT NULL,
	`lowStockThreshold` integer NOT NULL,
	`timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stock_productID_unique` ON `stock` (`productID`);--> statement-breakpoint
CREATE TABLE `user_stock` (
	`userID` text NOT NULL,
	`stockID` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`stockID`) REFERENCES `stock`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY DEFAULT 'c929b36d-67cb-47ef-9bff-508384bd15b5' NOT NULL,
	`fullname` text(100) NOT NULL,
	`username` text(50) NOT NULL,
	`passwordHash` text(256) NOT NULL,
	`roleID` text NOT NULL,
	`isActive` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`roleID`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);