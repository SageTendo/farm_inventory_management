/**
 * Represents a monetary value to ensure precision by performing
 * all operations in cents.
 */
export class Money {
  private value = 0;

  private constructor(value: number) {
    this.value = value;
  }

  private static asCents(value: number) {
    return bankersRounding(value * 100);
  }

  public add(value: Money) {
    return new Money(this.value + value.value);
  }

  public subtract(value: Money) {
    return new Money(this.value - value.value);
  }

  public multiply(multiplier: number) {
    return new Money(bankersRounding(this.value * multiplier));
  }

  public isZero(): boolean {
    return this.value === 0;
  }

  public isPositive(): boolean {
    return this.value >= 0;
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

  static fromNumber(value: number): Money {
    return new Money(Money.asCents(value));
  }

  static fromString(value: string): Money {
    if (value === "") return new Money(0);
    const parsed = parseFloat(value);
    if (isNaN(parsed)) throw new Error(`Invalid money value: ${value}`);
    return new Money(Money.asCents(parseFloat(value)));
  }
}

/**
 * Round a number to the nearest even number
 * source http://stackoverflow.com/a/3109234
 * @param num
 * @param decimalPlaces (optional)
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
