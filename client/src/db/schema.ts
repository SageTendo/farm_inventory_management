import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, check, real } from 'drizzle-orm/sqlite-core';

// *******************************************
// How to create db and perform migrations
// npx drizzle-kit push (create db)
// npx drizzle-kit generate (migrations)
// *******************************************


// User Model
// TODO: one to many on sale
// TODO: one to many on exchange rate
// TODO: many to many to stock
// TODO: many to one on role
export const user = sqliteTable('user', {
  id: integer().primaryKey(),
  fullname: text({ length: 100 }).notNull(),
  username: text({ length: 50 }).notNull().unique(),
  passwordHash: text({ length: 256 }).notNull(),
  roleID: integer()
    .notNull()
    .references(() => role.id, { onDelete: 'set null' }),
  createdAt: integer({ mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: integer({ mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
})

// User Role Model
// TODO: one to many to users
export const roleTypes = ['ADMIN', 'OWNER', 'STAFF'] as const;
export const role = sqliteTable('role', {
  id: integer().primaryKey(),
  type: text({ enum: roleTypes })
    .notNull()
    .$default(() => roleTypes[2])
},
  (table) => [
    check("type_check", sql`${table.type} IN ('ADMIN', 'OWNER', 'STAFF')`)
  ]
)

// Exchange Rate Model
// TODO: many to one on users
// TODO: one to many sale
export const exchangeRate = sqliteTable('exchange_rate', {
  id: integer().primaryKey(),
  userID: integer(),
  rate: real().notNull(), // round to 4 decimals
  updatedAt: integer({ mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
})

// Stock Model
// TODO: many to many for users
export const stock = sqliteTable('stock', {
  id: integer().primaryKey(),
  userID: integer().references(() => user.id, { onDelete: 'set null' }),
  productID: integer('product_id').references(() => stock.id, { onDelete: 'cascade' }), //review onDelete
  quantity: integer().notNull(),
  lowStockThreshold: integer().$default(() => 10).notNull()
})

// Product Model
// TODO: Add reference to who added the product
// TODO: one to many on sale items
export const product = sqliteTable('product', {
  id: integer().primaryKey(),
  name: text({ length: 100 }).notNull(),
  buyPrice: real().notNull(), // round to 2 decimals
  sellPrice: real().notNull(), // round to 2 decimals
  createdAt: integer({ mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
})

// Sale Model
// TODO: many to one on users
// TODO: many to one on exchange rate
// TODO: one to many on sale items
export const sale = sqliteTable('sale', {
  id: integer().primaryKey(),
  sellerId: integer().references(() => user.id, { onDelete: 'set null' }),
  exchangeRate: real().references(() => exchangeRate.id, { onDelete: 'restrict' }),
  usedLocalCurrency: integer({ mode: 'boolean' }).notNull(),
  totalAmount: real().notNull(),
  amountPaid: real().notNull(),
  changeReceived: real().notNull(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull()
})

// Sale Item Model
// TODO: many to one on sale
// TODO: many to one on products
export const saleItem = sqliteTable('sale_item', {
  id: integer().primaryKey(),
  // saleId: integer().references(() => sale.id, { onDelete: 'cascade' }),
  productId: integer().references(() => product.id, { onDelete: 'restrict' }),
  quantity: integer().notNull(),
  unitPrice: real().notNull(),
  createdAt: integer({ mode: 'timestamp' }).notNull()
})



