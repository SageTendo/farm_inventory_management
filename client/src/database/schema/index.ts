import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  check,
  real,
  index,
} from "drizzle-orm/sqlite-core";
import { roleTypes } from "./constants";

// *******************************************
// How to create db and perform migrations
// npx drizzle-kit push (create db)
// npx drizzle-kit generate (migrations)
// *******************************************

// *******************************************
// Models
// *******************************************

// User Model
export const userTable = sqliteTable("user", {
  id: integer().primaryKey(),
  fullname: text({ length: 100 }).notNull(),
  username: text({ length: 50 }).notNull().unique(),
  passwordHash: text({ length: 256 }).notNull(),
  roleID: integer()
    .references(() => roleTable.id, { onDelete: "restrict" })
    .notNull(),
  isActive: integer({ mode: "boolean" })
    .notNull()
    .$default(() => false),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// User Role Model
export const roleTable = sqliteTable(
  "role",
  {
    id: integer().primaryKey(),
    type: text({ enum: roleTypes })
      .unique()
      .notNull()
      .$default(() => roleTypes[2]),
  },
  (table) => [
    check("type_check", sql`${table.type} IN ('ADMIN', 'OWNER', 'STAFF')`),
  ]
);

// Exchange Rate Model
export const exchangeRateTable = sqliteTable("exchange_rate", {
  id: integer().primaryKey(),
  rate: real().notNull(), // TODO: round to 4 decimals in crud operations
  updatedBy: integer()
    .references(() => userTable.id, { onDelete: "set null" })
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Stock Model
// NB: This should probaly be deleted manually when a product is marked as deleted?
export const stockTable = sqliteTable("stock", {
  id: integer().primaryKey(),
  productID: integer()
    .unique()
    .references(() => productTable.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
  lowStockThreshold: integer()
    .$default(() => 10)
    .notNull(),
  timestamp: integer({ mode: "timestamp_ms" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Product Model
export const productTable = sqliteTable(
  "product",
  {
    id: integer().primaryKey(),
    name: text({ length: 100 }).unique().notNull(),
    buyPrice: integer().notNull(), // TODO: round to 2 decimals in crud operations
    sellPrice: integer().notNull(), // TODO: round to 2 decimals in crud operations
    addedBy: integer()
      .references(() => userTable.id, { onDelete: "set null" })
      .notNull(),
    isDeleted: integer({ mode: "boolean" }).default(false),
    createdAt: integer({ mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("name_idx").on(table.name)]
);

// Sale Model
export const saleTable = sqliteTable("sale", {
  id: integer().primaryKey(),
  sellerID: integer()
    .references(() => userTable.id, { onDelete: "set null" })
    .notNull(),
  exchangeRateID: integer()
    .references(() => exchangeRateTable.id, { onDelete: "restrict" })
    .notNull(),
  usedLocalCurrency: integer({ mode: "boolean" }).notNull(),
  totalAmount: integer().notNull(), // TODO: round to 2 decimals in crud operations
  amountPaid: integer().notNull(), // TODO: round to 2 decimals in crud operations
  changeReceived: integer().notNull(), // TODO: round to 2 decimals in crud operations
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Sale Item Model
export const saleItemTable = sqliteTable("sale_item", {
  id: integer().primaryKey(),
  saleID: integer()
    .references(() => saleTable.id, { onDelete: "cascade" })
    .notNull(),
  productID: integer()
    .references(() => productTable.id, { onDelete: "restrict" }) // TODO: Need to look into whether it should be nullified
    .notNull(),
  quantity: integer().notNull(),
  unitPrice: integer().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// *******************************************
// Relationships
// *******************************************

// User Stock Join Table
export const userStock = sqliteTable("user_stock", {
  userID: integer()
    .references(() => userTable.id, { onDelete: "set null" })
    .notNull(),
  stockID: integer()
    .references(() => stockTable.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
});

// User relations
export const userRelations = relations(userTable, ({ one, many }) => ({
  role: one(roleTable, {
    fields: [userTable.roleID],
    references: [roleTable.id],
  }),

  processedSales: many(saleTable),
  exchangeRateUpdates: many(exchangeRateTable),
}));

// Role relations
export const roleRelations = relations(roleTable, ({ many }) => ({
  assignedUsers: many(userTable),
}));

// Sale relations
export const saleRelations = relations(saleTable, ({ one, many }) => ({
  seller: one(userTable, {
    fields: [saleTable.sellerID],
    references: [userTable.id],
  }),

  saleItems: many(saleItemTable),
  exchangeRateUsed: one(exchangeRateTable, {
    fields: [saleTable.exchangeRateID],
    references: [exchangeRateTable.id],
  }),
}));

// Sale Item relations
export const saleItemRelations = relations(saleItemTable, ({ one }) => ({
  sale: one(saleTable, {
    fields: [saleItemTable.saleID],
    references: [saleTable.id],
  }),

  product: one(productTable, {
    fields: [saleItemTable.productID],
    references: [productTable.id],
  }),
}));

// Exchange rate relations
export const exchangeRateRelations = relations(
  exchangeRateTable,
  ({ one, many }) => ({
    user: one(userTable, {
      fields: [exchangeRateTable.updatedBy],
      references: [userTable.id],
    }),

    sales: many(saleTable),
  })
);

// Product relations
export const productRelations = relations(productTable, ({ many }) => ({
  saleItems: many(saleItemTable),
}));

// Stock relations
export const stockRelations = relations(stockTable, ({ one }) => ({
  stockProduct: one(productTable, {
    fields: [stockTable.productID],
    references: [productTable.id],
  }),
}));
