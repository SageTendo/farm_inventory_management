PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exchange_rate` (
	`id` text PRIMARY KEY NOT NULL,
	`rate` real NOT NULL,
	`updatedBy` text NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_exchange_rate`("id", "rate", "updatedBy", "updatedAt") SELECT "id", "rate", "updatedBy", "updatedAt" FROM `exchange_rate`;--> statement-breakpoint
DROP TABLE `exchange_rate`;--> statement-breakpoint
ALTER TABLE `__new_exchange_rate` RENAME TO `exchange_rate`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_product` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`buyPrice` integer NOT NULL,
	`sellPrice` integer NOT NULL,
	`addedBy` text NOT NULL,
	`isDeleted` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`addedBy`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_product`("id", "name", "buyPrice", "sellPrice", "addedBy", "isDeleted", "createdAt") SELECT "id", "name", "buyPrice", "sellPrice", "addedBy", "isDeleted", "createdAt" FROM `product`;--> statement-breakpoint
DROP TABLE `product`;--> statement-breakpoint
ALTER TABLE `__new_product` RENAME TO `product`;--> statement-breakpoint
CREATE UNIQUE INDEX `product_name_unique` ON `product` (`name`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `product` (`name`);--> statement-breakpoint
CREATE TABLE `__new_role` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	CONSTRAINT "type_check" CHECK("__new_role"."type"
      IN ('ADMIN', 'OWNER', 'STAFF'))
);
--> statement-breakpoint
INSERT INTO `__new_role`("id", "type") SELECT "id", "type" FROM `role`;--> statement-breakpoint
DROP TABLE `role`;--> statement-breakpoint
ALTER TABLE `__new_role` RENAME TO `role`;--> statement-breakpoint
CREATE UNIQUE INDEX `role_type_unique` ON `role` (`type`);--> statement-breakpoint
CREATE TABLE `__new_sale_item` (
	`id` text PRIMARY KEY NOT NULL,
	`saleID` text NOT NULL,
	`productID` text NOT NULL,
	`quantity` integer NOT NULL,
	`unitPrice` integer NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`saleID`) REFERENCES `sale`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
INSERT INTO `__new_sale_item`("id", "saleID", "productID", "quantity", "unitPrice", "createdAt") SELECT "id", "saleID", "productID", "quantity", "unitPrice", "createdAt" FROM `sale_item`;--> statement-breakpoint
DROP TABLE `sale_item`;--> statement-breakpoint
ALTER TABLE `__new_sale_item` RENAME TO `sale_item`;--> statement-breakpoint
CREATE TABLE `__new_sale` (
	`id` text PRIMARY KEY NOT NULL,
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
INSERT INTO `__new_sale`("id", "sellerID", "exchangeRateID", "usedLocalCurrency", "totalAmount", "amountPaid", "changeReceived", "createdAt") SELECT "id", "sellerID", "exchangeRateID", "usedLocalCurrency", "totalAmount", "amountPaid", "changeReceived", "createdAt" FROM `sale`;--> statement-breakpoint
DROP TABLE `sale`;--> statement-breakpoint
ALTER TABLE `__new_sale` RENAME TO `sale`;--> statement-breakpoint
CREATE TABLE `__new_stock` (
	`id` text PRIMARY KEY NOT NULL,
	`productID` text NOT NULL,
	`quantity` integer NOT NULL,
	`lowStockThreshold` integer NOT NULL,
	`timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_stock`("id", "productID", "quantity", "lowStockThreshold", "timestamp") SELECT "id", "productID", "quantity", "lowStockThreshold", "timestamp" FROM `stock`;--> statement-breakpoint
DROP TABLE `stock`;--> statement-breakpoint
ALTER TABLE `__new_stock` RENAME TO `stock`;--> statement-breakpoint
CREATE UNIQUE INDEX `stock_productID_unique` ON `stock` (`productID`);--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
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
INSERT INTO `__new_user`("id", "fullname", "username", "passwordHash", "roleID", "isActive", "createdAt", "updatedAt") SELECT "id", "fullname", "username", "passwordHash", "roleID", "isActive", "createdAt", "updatedAt" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);