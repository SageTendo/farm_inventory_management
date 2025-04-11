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
    .references(() => role.id, { onDelete: "restrict" })
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
  rate: real().notNull(), // TODO: round to 4 decimals in crud operations
  updatedBy: integer()
    .references(() => user.id, { onDelete: "set null" })
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Stock Model
// NB: This should probaly be deleted manually when a product is marked as deleted?
export const stock = sqliteTable("stock", {
  id: integer().primaryKey(),
  productID: integer()
    .unique()
    .references(() => product.id, { onDelete: "cascade" })
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
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("name_idx").on(table.name)]
);

// Sale Model
export const sale = sqliteTable("sale", {
  id: integer().primaryKey(),
  sellerID: integer()
    .references(() => user.id, { onDelete: "set null" })
    .notNull(),
  exchangeRateID: integer()
    .references(() => exchangeRate.id, { onDelete: "restrict" })
    .notNull(),
  usedLocalCurrency: integer({ mode: "boolean" }).notNull(),
  totalAmount: real().notNull(), // TODO: round to 2 decimals in crud operations
  amountPaid: real().notNull(), // TODO: round to 2 decimals in crud operations
  changeReceived: real().notNull(), // TODO: round to 2 decimals in crud operations
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Sale Item Model
export const saleItem = sqliteTable("sale_item", {
  id: integer().primaryKey(),
  saleID: integer()
    .references(() => sale.id, { onDelete: "cascade" })
    .notNull(),
  productID: integer()
    .references(() => product.id, { onDelete: "restrict" }) // TODO: Need to look into whether it should be nullified
    .notNull(),
  quantity: integer().notNull(),
  unitPrice: real().notNull(),
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
    .references(() => user.id, { onDelete: "set null" })
    .notNull(),
  stockID: integer()
    .references(() => stock.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
});

// User relations
export const userRelations = relations(user, ({ one, many }) => ({
  role: one(role, {
    fields: [user.roleID],
    references: [role.id],
  }),

  processedSales: many(sale),
  stocksUpdates: many(userStock),
  exchangeRateUpdates: many(exchangeRate),
}));

// Role relations
export const roleRelations = relations(role, ({ many }) => ({
  assignedUsers: many(user),
}));

// Sale relations
export const saleRelations = relations(sale, ({ one, many }) => ({
  seller: one(user, {
    fields: [sale.sellerID],
    references: [user.id],
  }),

  saleItems: many(saleItem),
  exchangeRateUsed: one(exchangeRate, {
    fields: [sale.exchangeRateID],
    references: [exchangeRate.id],
  }),
}));

// Sale Item relations
export const saleItemRelations = relations(saleItem, ({ one }) => ({
  sale: one(sale, {
    fields: [saleItem.saleID],
    references: [sale.id],
  }),

  product: one(product, {
    fields: [saleItem.productID],
    references: [product.id],
  }),
}));

// Exchange rate relations
export const exchangeRateRelations = relations(
  exchangeRate,
  ({ one, many }) => ({
    user: one(user, {
      fields: [exchangeRate.updatedBy],
      references: [user.id],
    }),

    sales: many(sale),
  })
);

// Product relations
export const productRelations = relations(product, ({ many }) => ({
  saleItems: many(saleItem),
}));

// Stock relations
export const stockRelations = relations(stock, ({ one }) => ({
  stockProduct: one(product, {
    fields: [stock.productID],
    references: [product.id],
  }),
}));
