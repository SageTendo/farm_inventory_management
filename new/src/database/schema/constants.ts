// User Role Types
export const roleTypes = ["ADMIN", "OWNER", "STAFF"] as const;
export type RoleType = (typeof roleTypes)[number];
