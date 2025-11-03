// User Role Types
export const userRoleTypes = ["ADMIN", "OWNER", "STAFF"] as const;
export type UserRoleType = typeof userRoleTypes[number];

export const currencyTypes = ["USD", "ZIG"] as const;
export type CurrencyType = typeof currencyTypes[number];