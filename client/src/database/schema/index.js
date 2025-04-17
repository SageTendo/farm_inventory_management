"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRelations = exports.productRelations = exports.exchangeRateRelations = exports.saleItemRelations = exports.saleRelations = exports.roleRelations = exports.userRelations = exports.userStock = exports.saleItemTable = exports.saleTable = exports.productTable = exports.stockTable = exports.exchangeRateTable = exports.roleTable = exports.userTable = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
var constants_1 = require("./constants");
// *******************************************
// How to create db and perform migrations
// npx drizzle-kit push (create db)
// npx drizzle-kit generate (migrations)
// *******************************************
// *******************************************
// Models
// *******************************************
// User Model
exports.userTable = (0, sqlite_core_1.sqliteTable)("user", {
    id: (0, sqlite_core_1.integer)().primaryKey(),
    fullname: (0, sqlite_core_1.text)({ length: 100 }).notNull(),
    username: (0, sqlite_core_1.text)({ length: 50 }).notNull().unique(),
    passwordHash: (0, sqlite_core_1.text)({ length: 256 }).notNull(),
    roleID: (0, sqlite_core_1.integer)()
        .references(function () { return exports.roleTable.id; }, { onDelete: "restrict" })
        .notNull(),
    isActive: (0, sqlite_core_1.integer)({ mode: "boolean" })
        .notNull()
        .$default(function () { return false; }),
    createdAt: (0, sqlite_core_1.integer)({ mode: "timestamp" })
        .default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
    updatedAt: (0, sqlite_core_1.integer)({ mode: "timestamp" })
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
});
// User Role Model
exports.roleTable = (0, sqlite_core_1.sqliteTable)("role", {
    id: (0, sqlite_core_1.integer)().primaryKey(),
    type: (0, sqlite_core_1.text)({ enum: constants_1.roleTypes })
        .unique()
        .notNull()
        .$default(function () { return constants_1.roleTypes[2]; }),
}, function (table) { return [
    (0, sqlite_core_1.check)("type_check", (0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", " IN ('ADMIN', 'OWNER', 'STAFF')"], ["", " IN ('ADMIN', 'OWNER', 'STAFF')"])), table.type)),
]; });
// Exchange Rate Model
exports.exchangeRateTable = (0, sqlite_core_1.sqliteTable)("exchange_rate", {
    id: (0, sqlite_core_1.integer)().primaryKey(),
    rate: (0, sqlite_core_1.real)().notNull(),
    updatedBy: (0, sqlite_core_1.integer)()
        .references(function () { return exports.userTable.id; }, { onDelete: "set null" })
        .notNull(),
    updatedAt: (0, sqlite_core_1.integer)({ mode: "timestamp" })
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
});
// Stock Model
// NB: This should probaly be deleted manually when a product is marked as deleted?
exports.stockTable = (0, sqlite_core_1.sqliteTable)("stock", {
    id: (0, sqlite_core_1.integer)().primaryKey(),
    productID: (0, sqlite_core_1.integer)()
        .unique()
        .references(function () { return exports.productTable.id; }, { onDelete: "cascade" })
        .notNull(),
    quantity: (0, sqlite_core_1.integer)().notNull(),
    lowStockThreshold: (0, sqlite_core_1.integer)()
        .$default(function () { return 10; })
        .notNull(),
    timestamp: (0, sqlite_core_1.integer)({ mode: "timestamp_ms" })
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
});
// Product Model
exports.productTable = (0, sqlite_core_1.sqliteTable)("product", {
    id: (0, sqlite_core_1.integer)().primaryKey(),
    name: (0, sqlite_core_1.text)({ length: 100 }).unique().notNull(),
    buyPrice: (0, sqlite_core_1.integer)().notNull(),
    sellPrice: (0, sqlite_core_1.integer)().notNull(),
    addedBy: (0, sqlite_core_1.integer)()
        .references(function () { return exports.userTable.id; }, { onDelete: "set null" })
        .notNull(),
    isDeleted: (0, sqlite_core_1.integer)({ mode: "boolean" }).default(false).notNull(),
    createdAt: (0, sqlite_core_1.integer)({ mode: "timestamp" })
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
}, function (table) { return [(0, sqlite_core_1.index)("name_idx").on(table.name)]; });
// Sale Model
exports.saleTable = (0, sqlite_core_1.sqliteTable)("sale", {
    id: (0, sqlite_core_1.integer)().primaryKey(),
    sellerID: (0, sqlite_core_1.integer)()
        .references(function () { return exports.userTable.id; }, { onDelete: "set null" })
        .notNull(),
    exchangeRateID: (0, sqlite_core_1.integer)()
        .references(function () { return exports.exchangeRateTable.id; }, { onDelete: "restrict" })
        .notNull(),
    usedLocalCurrency: (0, sqlite_core_1.integer)({ mode: "boolean" }).notNull(),
    totalAmount: (0, sqlite_core_1.integer)().notNull(),
    amountPaid: (0, sqlite_core_1.integer)().notNull(),
    changeReceived: (0, sqlite_core_1.integer)().notNull(),
    createdAt: (0, sqlite_core_1.integer)({ mode: "timestamp" })
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
});
// Sale Item Model
exports.saleItemTable = (0, sqlite_core_1.sqliteTable)("sale_item", {
    id: (0, sqlite_core_1.integer)().primaryKey(),
    saleID: (0, sqlite_core_1.integer)()
        .references(function () { return exports.saleTable.id; }, { onDelete: "cascade" })
        .notNull(),
    productID: (0, sqlite_core_1.integer)()
        .references(function () { return exports.productTable.id; }, { onDelete: "restrict" }) // TODO: Need to look into whether it should be nullified
        .notNull(),
    quantity: (0, sqlite_core_1.integer)().notNull(),
    unitPrice: (0, sqlite_core_1.integer)().notNull(),
    createdAt: (0, sqlite_core_1.integer)({ mode: "timestamp" })
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
});
// *******************************************
// Relationships
// *******************************************
// User Stock Join Table
exports.userStock = (0, sqlite_core_1.sqliteTable)("user_stock", {
    userID: (0, sqlite_core_1.integer)()
        .references(function () { return exports.userTable.id; }, { onDelete: "set null" })
        .notNull(),
    stockID: (0, sqlite_core_1.integer)()
        .references(function () { return exports.stockTable.id; }, { onDelete: "cascade" })
        .notNull(),
    quantity: (0, sqlite_core_1.integer)().notNull(),
});
// User relations
exports.userRelations = (0, drizzle_orm_1.relations)(exports.userTable, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        role: one(exports.roleTable, {
            fields: [exports.userTable.roleID],
            references: [exports.roleTable.id],
        }),
        processedSales: many(exports.saleTable),
        exchangeRateUpdates: many(exports.exchangeRateTable),
    });
});
// Role relations
exports.roleRelations = (0, drizzle_orm_1.relations)(exports.roleTable, function (_a) {
    var many = _a.many;
    return ({
        assignedUsers: many(exports.userTable),
    });
});
// Sale relations
exports.saleRelations = (0, drizzle_orm_1.relations)(exports.saleTable, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        seller: one(exports.userTable, {
            fields: [exports.saleTable.sellerID],
            references: [exports.userTable.id],
        }),
        saleItems: many(exports.saleItemTable),
        exchangeRateUsed: one(exports.exchangeRateTable, {
            fields: [exports.saleTable.exchangeRateID],
            references: [exports.exchangeRateTable.id],
        }),
    });
});
// Sale Item relations
exports.saleItemRelations = (0, drizzle_orm_1.relations)(exports.saleItemTable, function (_a) {
    var one = _a.one;
    return ({
        sale: one(exports.saleTable, {
            fields: [exports.saleItemTable.saleID],
            references: [exports.saleTable.id],
        }),
        product: one(exports.productTable, {
            fields: [exports.saleItemTable.productID],
            references: [exports.productTable.id],
        }),
    });
});
// Exchange rate relations
exports.exchangeRateRelations = (0, drizzle_orm_1.relations)(exports.exchangeRateTable, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        user: one(exports.userTable, {
            fields: [exports.exchangeRateTable.updatedBy],
            references: [exports.userTable.id],
        }),
        sales: many(exports.saleTable),
    });
});
// Product relations
exports.productRelations = (0, drizzle_orm_1.relations)(exports.productTable, function (_a) {
    var many = _a.many;
    return ({
        saleItems: many(exports.saleItemTable),
    });
});
// Stock relations
exports.stockRelations = (0, drizzle_orm_1.relations)(exports.stockTable, function (_a) {
    var one = _a.one;
    return ({
        stockProduct: one(exports.productTable, {
            fields: [exports.stockTable.productID],
            references: [exports.productTable.id],
        }),
    });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
