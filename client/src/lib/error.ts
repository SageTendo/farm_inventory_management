/**
 * Error for monetary parsing errors
 */
class MoneyParseError extends Error {
  public constructor(err: string) {
    super(err)
  }
}

/**
 * Error for monetary parsing errors
 */
class UnsafeMonetaryValueError extends Error {
  public constructor(err: string) {
    super(err)
  }
}

