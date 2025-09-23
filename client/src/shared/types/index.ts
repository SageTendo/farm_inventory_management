// User Role Types
export const userRoleTypes = ["ADMIN", "OWNER", "STAFF"] as const;
export type UserRoleType = typeof userRoleTypes[number];
