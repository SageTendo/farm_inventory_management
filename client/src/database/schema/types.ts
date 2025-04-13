// ******************************************************************
// This defines the DTOs (Data Transfer Objects) that are used to
// pass data to and from the database.
//
// DTOs can be in the form of a new DTO or already existing.
// { EXAMPLE: }
// NewMyRecordDTO: This represents the data of a new user being created
//              in the database.
// UpdateMyRecordDTO: This represents the data of a user being updated
// MyRecordDTO:    This represents a user retrived from the database
//
//
// The use of the "Omit" type is to remove sensitive information
// from the data that is returned from the database.
//
// The use of the "Partial" type is to allow for partial updates
// of a db entity, meaning that only the fields that are being updated
// can be provided, without having to provide all the fields of an
// entity.
//
// IF YOU ADD A NEW TABLE, ADD A NEW DTO HERE
// ALTERNATIVELY, IF UPDATE THE TABLE, THE RESPECTIVE DTO SHOULD BE
// UPDATED TO REFLECT THE CHANGES
// *****************************************************************

import { RoleType } from "./constants";

// Role DTO
export type RoleDTO = {
  id: number;
  type: RoleType;
};
export type NewRoleDTO = Omit<RoleDTO, "id">;
export type UpdateRoleDTO = Omit<RoleDTO, "id">;

// User DTO
export type UserDTO = {
  id: number;
  fullname: string;
  username: string;
  roleID: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type NewUserDTO = {
  fullname: string;
  username: string;
  passwordHash: string;
  roleID: number;
};
export type UpdateUserDTO = Partial<Omit<UserDTO, "id" | "createdAt">>;

// Stock DTO
export type StockDTO = {
  id: number;
  productID: number;
  quantity: number;
  lowStockThreshold: number;
  timestamp: Date;
};
export type NewStockDTO = Omit<StockDTO, "id">;
export type UpdateStockDTO = Partial<
  Omit<StockDTO, "id" | "productID" | "timestamp">
>;

// UserStock DTO
export type UserStock = {
  userID: number;
  stockID: number;
  quantity: number;
};
export type NewUserStockDTO = Omit<UserStock, "id">;
export type UpdateUserStockDTO = Omit<UserStock, "id" | "userID" | "stockID">;

// Product DTO
export type ProductDTO = {
  id: number;
  name: string;
  buyPrice: number;
  sellPrice: number;
  addedBy: number;
  isDeleted: boolean;
  createdAt: number;
};
export type NewProductDTO = Omit<ProductDTO, "id" | "isDeleted" | "createdAt">;
export type UpdateProductDTO = Partial<
  Omit<ProductDTO, "id" | "addedBy" | "createdAt">
>;

// Sale DTO
export type SaleDTO = {
  id: number;
  sellerID: number;
  exchangeRateID: number;
  usedLocalCurrency: boolean;
  totalAmount: number;
  amountPaid: number;
  changeReceived: number;
  createdAt: number;
};
export type NewSaleDTO = Omit<SaleDTO, "id" | "createdAt">;

// SaleItem DTO
export type SaleItemDTO = {
  id: number;
  saleID: number;
  productID: number;
  quantity: number;
  unitPrice: number;
  createdAt: number;
};
export type NewSaleItemDTO = Omit<SaleItemDTO, "id" | "createdAt">;

// Exchange Rate DTO
export type ExchangeRateDTO = {
  id: number;
  rate: number;
  updatedBy: number;
  updatedAt: number;
};
export type NewExchangeRateDTO = Omit<ExchangeRateDTO, "id" | "updatedAt">;
