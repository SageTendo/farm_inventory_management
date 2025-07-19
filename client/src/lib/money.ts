/**
 * Money class for handling monetary values
 * All values are stored in cents and operations are performed in cents.
 * Decimals are handled using Banker's Rounding.
 */
export class Money {
  private value = 0;

  private constructor(value: number) {
    if (isNaN(value) || !Number.isInteger(value))
      throw new Error(`Invalid money value: ${value}`);

    if (!Number.isSafeInteger(value))
      throw new Error(`Unsafe money value: ${value}`);
    this.value = value;
  }

  private static convertToCents(value: number) {
    return bankersRounding(value * 100, 0);
  }

  public add(money: Money) {
    return new Money(this.value + money.value);
  }

  public subtract(money: Money) {
    return new Money(this.value - money.value);
  }

  public multiply(multiplier: number) {
    if (isNaN(multiplier) || !isFinite(multiplier)) {
      throw new Error(`Invalid multiplier: ${multiplier}`);
    }

    const result = bankersRounding(this.value * multiplier, 0);
    if (!Number.isSafeInteger(result)) {
      throw new Error(`Multiplication result exceeds safe integer range`);
    }

    return new Money(result);
  }

  public greaterThan(value: Money): boolean {
    return this.value > value.value;
  }

  public lessThan(value: Money): boolean {
    return this.value < value.value;
  }

  public equals(value: Money): boolean {
    return this.value === value.value;
  }

  public isZero(): boolean {
    return this.value === 0;
  }

  public isPositive(): boolean {
    return this.value > 0;
  }

  public isNegative(): boolean {
    return this.value < 0;
  }

  public get toCents(): number {
    return this.value;
  }

  public get toDollars(): number {
    return this.value / 100;
  }

  public get read(): string {
    return this.toDollars.toFixed(2);
  }

  /**
   * Create a Money object from a number
   * @param value The number to convert to a Money object
   */
  static fromNumber(value: number): Money {
    if (!isFinite(value)) throw new Error(`Invalid money value: ${value}`);
    if (Math.abs(value) > Number.MAX_SAFE_INTEGER / 100) {
      throw new Error(`Money value too large: ${value}`);
    }
    const valueAsCents = Money.convertToCents(value);
    return new Money(valueAsCents);
  }

  /**
   * Create a Money object from a string representation of a number
   * @param value The string to convert to a Money object
   */
  static fromString(value: string): Money {
    const cleaned = value.trim().replace(/[$,]/g, "");
    const parsed = parseFloat(cleaned);
    if (isNaN(parsed)) throw new Error(`Invalid money value: ${value}`);
    return Money.fromNumber(parsed);
  }
}

/**
 * Round a number to the nearest even number
 * @see http://stackoverflow.com/a/3109234
 * @see https://en.wikipedia.org/wiki/Bankers%27_rounding
 * @param num The number to round
 * @param decimalPlaces (optional) The number of decimal places to round to
 */
export function bankersRounding(num: number, decimalPlaces?: number): number {
  var d = decimalPlaces || 0;
  var m = Math.pow(10, d);
  var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
  var i = Math.floor(n),
    f = n - i;
  var e = 1e-8; // Allow for rounding errors in f
  var r = f > 0.5 - e && f < 0.5 + e ? (i % 2 == 0 ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}
