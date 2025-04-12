import {
  exchangeRateTable,
  productTable,
  roleTable,
  stockTable,
  userTable,
} from ".";

// ******************************************************************
// This defines the entity types that are used in CRUD operations.
//
// Entities can be in the form of a new entity or already existing.
// { EXAMPLE: }
// NewMyRecord: This represents the data of a new user being created
//              in the database.
// UpdateMyRecord: This represents the data of a user being updated
// MyRecord:    This represents a user retrived from the database
//
//
// The use of the "Omit" type is to remove sensitive information
// from the data that is returned from the database.
//
// The use of the "Partial" type is to allow for partial updates
// of an entity, meaning that only the fields that are being updated
// can be provided, without having to provide all the fields of an
// entity.
// *****************************************************************

export type NewRole = typeof roleTable.$inferInsert;
export type UpdateRole = Partial<Omit<NewRole, "id">>;
export type Role = typeof roleTable.$inferSelect;

export type NewUser = typeof userTable.$inferInsert;
export type UpdateUser = Partial<Omit<NewUser, "id" | "createdAt">>;
export type User = Omit<typeof userTable.$inferSelect, "passwordHash">;

export type NewStock = typeof stockTable.$inferInsert;
export type Stock = typeof stockTable.$inferSelect;
export type UpdateStock = Partial<Omit<NewStock, "id" | "productID">>;

// export type NewUserStock = typeof userStock.$inferInsert;
// export type UserStock = Omit<typeof userStock.$inferSelect, "id">;

export type NewProduct = typeof productTable.$inferInsert;
export type Product = typeof productTable.$inferSelect;
export type UpdateProduct = Partial<
  Omit<NewProduct, "id" | "createdAt" | "isDeleted">
>;

// export type NewSale = typeof saleTable.$inferInsert;
// export type Sale = Omit<typeof saleTable.$inferSelect, "id">;

// export type NewSaleItem = typeof saleItemTable.$inferInsert;
// export type SaleItem = Omit<typeof saleItemTable.$inferSelect, "id">;

export type NewExchangeRate = typeof exchangeRateTable.$inferInsert;
export type ExchangeRate = typeof exchangeRateTable.$inferSelect;
