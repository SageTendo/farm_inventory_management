// ******************************************************************
// This defines the DTOs (Data Transfer Objects) that are used to
// pass data to and from the database.
//
// DTOs can be in the form of a new DTO or already existing.
// { EXAMPLE: }
// NewMyRecordDTO: This represents the data of a new user being created
//              in the database.
// UpdateMyRecordDTO: This represents the data of a user being updated
// MyRecordDTO:    This represents a user retrieved from the database
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
export interface RoleDTO {
  id: number;
  type: RoleType;
}

export type NewRoleDTO = Omit<RoleDTO, "id">;
export type UpdateRoleDTO = Omit<RoleDTO, "id">;

// User DTO
// This is the data that is returned from the repository layer
export interface UserDTO {
  id: number;
  fullname: string;
  username: string;
  passwordHash: string;
  roleID: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
// This is the data that is returned from the service layer
export type UserResponseDTO = Omit<UserDTO, "passwordHash">;

// This is the data that is sent to the service layer
export interface NewUserDTO {
  fullname: string;
  username: string;
  password: string; // Plaintext, gets hashed in AuthService
  roleID: number;
}

// This is the data that is sent to the repository layer
export interface CreateUserDTO {
  fullname: string;
  username: string;
  passwordHash: string; // already hashed
  roleID: number;
}

// This is the data that is sent to the repository layer
export type UpdateUserDTO = Partial<Omit<UserDTO, "id" | "createdAt">>;

// User Auth DTO
export interface AuthResponseDTO {
  success: boolean;
  message: string;
  authData?: {
    id: number;
    username: string;
    role: RoleType;
  };
}

// Stock DTO
export interface StockDTO {
  id: number;
  productID: number;
  quantity: number;
  lowStockThreshold: number;
  timestamp: Date;
}

export type NewStockDTO = Omit<StockDTO, "id">;
export type UpdateStockDTO = Partial<
  Omit<StockDTO, "id" | "productID" | "timestamp">
>;

// UserStock DTO
export interface UserStock {
  userID: number;
  stockID: number;
  quantity: number;
}

export type NewUserStockDTO = Omit<UserStock, "id">;
export type UpdateUserStockDTO = Omit<UserStock, "id" | "userID" | "stockID">;

// Product DTO
export interface ProductDTO {
  id: number;
  name: string;
  buyPrice: number;
  sellPrice: number;
  addedBy: number;
  isDeleted: boolean;
  createdAt: Date;
}

export type NewProductDTO = Omit<ProductDTO, "id" | "isDeleted" | "createdAt">;
export type UpdateProductDTO = Partial<
  Omit<ProductDTO, "id" | "addedBy" | "createdAt">
>;

// Sale DTO
export interface SaleDTO {
  id: number;
  sellerID: number;
  exchangeRateID: number;
  usedLocalCurrency: boolean;
  totalAmount: number;
  amountPaid: number;
  changeReceived: number;
  createdAt: number;
}

export type NewSaleDTO = Omit<SaleDTO, "id" | "createdAt">;

// SaleItem DTO
export interface SaleItemDTO {
  id: number;
  saleID: number;
  productID: number;
  quantity: number;
  unitPrice: number;
  createdAt: number;
}

export type NewSaleItemDTO = Omit<SaleItemDTO, "id" | "createdAt">;

// Exchange Rate DTO
export interface ExchangeRateDTO {
  id: number;
  rate: number;
  updatedBy: number;
  updatedAt: number;
}

export type NewExchangeRateDTO = Omit<ExchangeRateDTO, "id" | "updatedAt">;
