/**
 * Error for monetary parsing errors
 */
export class MoneyParseError extends Error {
  public constructor(err: string) {
    super(err)
  }
}

/**
 * Error for monetary parsing errors
 */
export class UnsafeMonetaryValueError extends Error {
  public constructor(err: string) {
    super(err)
  }
}

