import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  check,
  real,
  index,
} from "drizzle-orm/sqlite-core";

// *******************************************
// How to create db and perform migrations
// npx drizzle-kit push (create db)
// npx drizzle-kit generate (migrations)
// *******************************************

// User Role Types Enum
const roleTypes = ["ADMIN", "OWNER", "STAFF"] as const;

// *******************************************
// Models
// *******************************************
// User Model
export const user = sqliteTable("user", {
  id: integer().primaryKey(),
  fullname: text({ length: 100 }).notNull(),
  username: text({ length: 50 }).notNull().unique(),
  passwordHash: text({ length: 256 }).notNull(),
  roleID: integer()
    .references(() => role.id, { onDelete: "set null" })
    .notNull(),
  createdAt: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isActive: integer({ mode: "boolean" }).notNull(),
});

// User Role Model
export const role = sqliteTable(
  "role",
  {
    id: integer().primaryKey(),
    type: text({ enum: roleTypes })
      .notNull()
      .$default(() => roleTypes[2]),
  },
  (table) => [
    check("type_check", sql`${table.type} IN ('ADMIN', 'OWNER', 'STAFF')`),
  ]
);

// Exchange Rate Model
export const exchangeRate = sqliteTable("exchange_rate", {
  id: integer().primaryKey(),
  userID: integer()
    .references(() => user.id, { onDelete: "set null" })
    .notNull(),
  rate: real().notNull(), // TODO: round to 4 decimals in crud operations
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Stock Model
// NB: This should probaly be deleted manually when a product is marked as deleted?
export const stock = sqliteTable("stock", {
  id: integer().primaryKey(),
  userID: integer()
    .references(() => user.id, { onDelete: "set null" })
    .notNull(),
  productID: integer("product_id")
    .references(() => product.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
  lowStockThreshold: integer()
    .$default(() => 10)
    .notNull(),
});

// Product Model
export const product = sqliteTable(
  "product",
  {
    id: integer().primaryKey(),
    name: text({ length: 100 }).notNull(),
    buyPrice: real().notNull(), // TODO: round to 2 decimals in crud operations
    sellPrice: real().notNull(), // TODO: round to 2 decimals in crud operations
    addedBy: integer()
      .references(() => user.id, { onDelete: "set null" })
      .notNull(),
    isDeleted: integer({ mode: "boolean" }).default(false),
    createdAt: integer({ mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [index("name_idx").on(table.name)]
);

// Sale Model
export const sale = sqliteTable("sale", {
  id: integer().primaryKey(),
  sellerId: integer()
    .references(() => user.id, { onDelete: "set null" })
    .notNull(),
  exchangeRateId: integer()
    .references(() => exchangeRate.id, { onDelete: "restrict" })
    .notNull(),
  usedLocalCurrency: integer({ mode: "boolean" }).notNull(),
  totalAmount: real().notNull(), // TODO: round to 2 decimals in crud operations
  amountPaid: real().notNull(), // TODO: round to 2 decimals in crud operations
  changeReceived: real().notNull(), // TODO: round to 2 decimals in crud operations
  createdAt: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Sale Item Model
export const saleItem = sqliteTable("sale_item", {
  id: integer().primaryKey(),
  saleId: integer()
    .references(() => sale.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer()
    .references(() => product.id, { onDelete: "restrict" })
    .notNull(),
  quantity: integer().notNull(),
  unitPrice: real().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
});

// *******************************************
// Relationships
// *******************************************
export const userStock = sqliteTable("user_stock", {
  userId: integer()
    .references(() => user.id, { onDelete: "set null" })
    .notNull(),
  stockId: integer()
    .references(() => stock.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  role: one(role, {
    fields: [user.roleID],
    references: [role.id],
  }),

  sales: many(sale),
  stocksUpdates: many(userStock),
}));

export const roleRelations = relations(role, ({ many }) => ({
  users: many(user),
}));

export const saleRelations = relations(sale, ({ one }) => ({
  seller: one(user, {
    fields: [sale.sellerId],
    references: [user.id],
  }),
}));

// export const productRelations = null
// export const stockRelations = relations(stock, ({ one, many }) => {
// })
// export const exchangeRateRelations = null
// export const saleItemRelations = null

// TODO: One to Many Sale and Sale Item Relations
// TODO: One to Many Product and Sale Item Relations
// TODO: Many to Many User and Stock Relations
