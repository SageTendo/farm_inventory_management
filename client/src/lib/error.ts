/**
 * Error for monetary parsing errors
 */
export class MoneyParseError extends Error {
  public constructor(err: string) {
    super(err);
  }
}

/**
 * Error for monetary parsing errors
 */
export class UnsafeMonetaryValueError extends Error {
  public constructor(err: string) {
    super(err);
  }
}

/** Generic error for CRUD operations */
export class CRUDError extends Error {
  public constructor(err: string) {
    super(err);
  }
}

/**
 * Errors for unauthorized access to resources
 * e.g. user is not logged in
 */
export class UnauthorizedError extends Error {
  public constructor(err: string) {
    super(err);
  }
}

/**
 * Errors for forbidden access to resources
 * e.g. user is not an admins
 */
export class ForbiddenError extends Error {
  public constructor(err: string) {
    super(err);
  }
}

/**
 * Errors for not found resources
 * e.g. user tries to access a product that does not exist
 */
export class NotFoundError extends Error {
  constructor(err: string) {
    super(err);
  }
}

/**
 * Errors for conflicts
 * e.g. user tries to add a product that already exists
 */
export class ConflictError extends Error {
  constructor(err: string) {
    super(err);
  }
}