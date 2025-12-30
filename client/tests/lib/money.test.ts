import { describe, expect, it } from "vitest";
import { bankersRounding, Money } from "../../src/shared/lib/money";

describe("Banker's Rounding", () => {
  it("should round to the nearest even number", () => {
    expect(bankersRounding(-0.005, 2)).toBe(0);
    expect(bankersRounding(-0.015, 2)).toBe(-0.02);
    expect(bankersRounding(0.0, 2)).toBe(0);
    expect(bankersRounding(0.005, 2)).toBe(0);
    expect(bankersRounding(0.015, 2)).toBe(0.02);
    expect(bankersRounding(0.025, 2)).toBe(0.02);
    expect(bankersRounding(0.035, 2)).toBe(0.04);
    expect(bankersRounding(0.045, 2)).toBe(0.04);
    expect(bankersRounding(0.055, 2)).toBe(0.06);
    expect(bankersRounding(0.065, 2)).toBe(0.06);
    expect(bankersRounding(0.075, 2)).toBe(0.08);
    expect(bankersRounding(0.085, 2)).toBe(0.08);
    expect(bankersRounding(0.095, 2)).toBe(0.1);
    expect(bankersRounding(0.105, 2)).toBe(0.1);
    expect(bankersRounding(0.115, 2)).toBe(0.12);
    expect(bankersRounding(0.125, 2)).toBe(0.12);
    expect(bankersRounding(0.135, 2)).toBe(0.14);
    expect(bankersRounding(0.145, 2)).toBe(0.14);
    expect(bankersRounding(0.155, 2)).toBe(0.16);
    expect(bankersRounding(0.165, 2)).toBe(0.16);
    expect(bankersRounding(0.1656, 2)).toBe(0.17);
    expect(bankersRounding(0.175, 2)).toBe(0.18);
    expect(bankersRounding(0.185, 2)).toBe(0.18);
    expect(bankersRounding(0.195, 2)).toBe(0.2);
    expect(bankersRounding(0.205, 2)).toBe(0.2);
    expect(bankersRounding(1.556, 2)).toBe(1.56);
    expect(bankersRounding(2.5)).toBe(2);
    expect(bankersRounding(3.5)).toBe(4);
    expect(bankersRounding(4.5)).toBe(4);
    expect(bankersRounding(5.5)).toBe(6);
    expect(bankersRounding(6.5)).toBe(6);
    expect(bankersRounding(7.5)).toBe(8.0);
    expect(bankersRounding(8.5)).toBe(8.0);
    expect(bankersRounding(9.5)).toBe(10.0);
    expect(bankersRounding(10.5)).toBe(10.0);
  });
});

describe("Money", () => {
  it("should create a Money object and ensure that its cents value is an integer", () => {
    const m = Money.fromDollars(1.335);
    expect(Number.isInteger(m.toDollars)).toBe(false);
    expect(Number.isInteger(m.toCents)).toBe(true);
  });

  it("should create a Money object from a float string and return its value as cents", () => {
    const m = Money.fromString("1.335");
    expect(Number.isInteger(m.toDollars)).toBe(false);
    expect(Number.isInteger(m.toCents)).toBe(true);
  });

  it("should create a Money object from an integer dollar value and return its value as cents", () => {
    expect(Money.fromDollars(0).toCents).toBe(0);
    expect(Money.fromDollars(1).toCents).toBe(100);
    expect(Money.fromDollars(10).toCents).toBe(1000);
    expect(Money.fromDollars(105).toCents).toBe(10500);
    expect(Money.fromDollars(150).toCents).toBe(15000);
    expect(Money.fromDollars(2).toCents).toBe(200);
  });

  it("should create a Money object from an integer dollar value and return its value as dollars", () => {
    expect(Money.fromDollars(0).toDollars).toBe(0);
    expect(Money.fromDollars(1).toDollars).toBe(1);
    expect(Money.fromDollars(10).toDollars).toBe(10);
    expect(Money.fromDollars(105).toDollars).toBe(105);
    expect(Money.fromDollars(150).toDollars).toBe(150);
    expect(Money.fromDollars(2).toDollars).toBe(2);
  });

  it("should create a Money object from a float dollar value and return its value as cents", () => {
    expect(Money.fromDollars(0.0).toCents).toBe(0);
    expect(Money.fromDollars(0.01).toCents).toBe(1);
    expect(Money.fromDollars(0.1).toCents).toBe(10);
    expect(Money.fromDollars(1.0).toCents).toBe(100);
    expect(Money.fromDollars(1.05).toCents).toBe(105);
    expect(Money.fromDollars(1.5).toCents).toBe(150);
  });

  it("should create a Money object from a float dollar value and return its value as dollars", () => {
    expect(Money.fromDollars(0.0).toDollars).toBe(0);
    expect(Money.fromDollars(0.01).toDollars).toBe(0.01);
    expect(Money.fromDollars(0.1).toDollars).toBe(0.1);
    expect(Money.fromDollars(1.0).toDollars).toBe(1);
    expect(Money.fromDollars(1.05).toDollars).toBe(1.05);
    expect(Money.fromDollars(1.5).toDollars).toBe(1.5);
  });

  it("should create a Money object from an integer cent value and return its value as cents", () => {
    expect(Money.fromCents(0).toCents).toBe(0);
    expect(Money.fromCents(1).toCents).toBe(1);
    expect(Money.fromCents(10).toCents).toBe(10);
    expect(Money.fromCents(105).toCents).toBe(105);
    expect(Money.fromCents(150).toCents).toBe(150);
    expect(Money.fromCents(2).toCents).toBe(2);
  });

  it("should create a Money object from an integer cent value and return its value as dollars", () => {
    expect(Money.fromCents(0).toDollars).toBe(0);
    expect(Money.fromCents(1).toDollars).toBe(0.01);
    expect(Money.fromCents(10).toDollars).toBe(0.1);
    expect(Money.fromCents(105).toDollars).toBe(1.05);
    expect(Money.fromCents(150).toDollars).toBe(1.5);
    expect(Money.fromCents(2).toDollars).toBe(0.02);
  });

  it("should throw an error when creating a Money object from an invalid cent value", () => {
    expect(() => Money.fromCents(0.01)).toThrowError();
    expect(() => Money.fromCents(0.1)).toThrowError();
    expect(() => Money.fromCents(1.05)).toThrowError();
    expect(() => Money.fromCents(1.5)).toThrowError();
    expect(() => Money.fromCents(9.99999999999999)).toThrowError();
    expect(() => Money.fromCents(-0.01)).toThrowError();
    expect(() => Money.fromCents(-0.1)).toThrowError();
    expect(() => Money.fromCents(-1.05)).toThrowError();
    expect(() => Money.fromCents(-1.5)).toThrowError();
    expect(() => Money.fromCents(-9.99999999999999)).toThrowError();
    expect(() => Money.fromCents(NaN)).toThrowError();
    expect(() => Money.fromCents(Infinity)).toThrowError();
    expect(() => Money.fromCents(-Infinity)).toThrowError();
  });

  it("should parse a string as a Money object (in cents)", () => {
    expect(Money.fromString("0").toCents).toBe(0);
    expect(Money.fromString("00").toCents).toBe(0);
    expect(Money.fromString("1").toCents).toBe(100);
    expect(Money.fromString("0.01").toCents).toBe(1);
    expect(Money.fromString("10").toCents).toBe(1000);
    expect(Money.fromString("0.10").toCents).toBe(10);
    expect(Money.fromString("100").toCents).toBe(10000);
    expect(Money.fromString("1.00").toCents).toBe(100);
    expect(Money.fromString("1.5").toCents).toBe(150);

    expect(Money.fromString("0").toDollars).toBe(0);
    expect(Money.fromString("00").toDollars).toBe(0);
    expect(Money.fromString("1").toDollars).toBe(1);
    expect(Money.fromString("0.01").toDollars).toBe(0.01);
    expect(Money.fromString("10").toDollars).toBe(10);
    expect(Money.fromString("0.10").toDollars).toBe(0.1);
    expect(Money.fromString("100").toDollars).toBe(100);
    expect(Money.fromString("1.00").toDollars).toBe(1);
    expect(Money.fromString("1.5").toDollars).toBe(1.5);
  });

  it("should parse negative string as a Money object (in cents)", () => {
    expect(Money.fromString("-0").toCents).toBe(0);
    expect(Money.fromString("-00").toCents).toBe(0);
    expect(Money.fromString("-1").toCents).toBe(-100);
    expect(Money.fromString("-0.01").toCents).toBe(-1);
    expect(Money.fromString("-10").toCents).toBe(-1000);
    expect(Money.fromString("-0.10").toCents).toBe(-10);
    expect(Money.fromString("-100").toCents).toBe(-10000);
    expect(Money.fromString("-1.00").toCents).toBe(-100);
    expect(Money.fromString("-1.5").toCents).toBe(-150);

    expect(Money.fromString("-0").toDollars).toBe(0);
    expect(Money.fromString("-00").toDollars).toBe(0);
    expect(Money.fromString("-1").toDollars).toBe(-1);
    expect(Money.fromString("-0.01").toDollars).toBe(-0.01);
    expect(Money.fromString("-10").toDollars).toBe(-10);
    expect(Money.fromString("-0.10").toDollars).toBe(-0.1);
    expect(Money.fromString("-100").toDollars).toBe(-100);
    expect(Money.fromString("-1.00").toDollars).toBe(-1);
    expect(Money.fromString("-1.5").toDollars).toBe(-1.5);

    const x = Money.fromDollars(10);
    const y = Money.fromDollars(20);
    expect(x.subtract(y).toCents).toBe(-1000);
    expect(x.subtract(y).toDollars).toBe(-10);
  });

  it("Should add two Money objects together", () => {
    const x = Money.fromDollars(100);
    const y = Money.fromDollars(100);
    expect(x.add(y).toCents).toBe(20000);
    expect(x.add(y).toDollars).toBe(200);
  });

  it("Should subtract two Money objects", () => {
    const x = Money.fromDollars(100);
    const y = Money.fromDollars(100);
    expect(x.subtract(y).toCents).toBe(0);
    expect(x.subtract(y).toDollars).toBe(0);
    expect(x.subtract(y).isZero()).toBe(true);
  });

  it("Should multiply a Money object by a number", () => {
    const x = Money.fromDollars(100);
    expect(x.multiply(2).toCents).toBe(20000);
    expect(x.multiply(2).toDollars).toBe(200);
    expect(x.multiply(0.5).toCents).toBe(5000);
    expect(x.multiply(0.5).isPositive()).toBe(true);
    expect(x.multiply(0.333).toCents).toBe(3330);
    expect(x.multiply(0.5).toDollars).toBe(50);
    expect(x.multiply(-0).toCents).toBe(0);
    expect(x.multiply(0).toDollars).toBe(0);
    expect(x.multiply(-1).toCents).toBe(-10000);
    expect(x.multiply(-1).toDollars).toBe(-100);
    expect(x.multiply(-0.5).toCents).toBe(-5000);
    expect(x.multiply(-0.5).toDollars).toBe(-50);
    expect(x.multiply(-0.5).isNegative()).toBe(true);
    expect(x.multiply(-0).toCents).toBe(0);
    expect(x.multiply(-0).toDollars).toBe(0);
    expect(x.multiply(-0).isZero()).toBe(true);

    const y = Money.fromDollars(1);
    expect(y.multiply(0.333).toCents).toBe(33);
  });

  it("Should convert a Money object to a readable string", () => {
    expect(Money.fromDollars(0).read).toBe("0.00");
    expect(Money.fromDollars(-0).read).toBe("0.00");
    expect(Money.fromDollars(-0.5).read).toBe("-0.50");
    expect(Money.fromDollars(-0.51).read).toBe("-0.51");
    expect(Money.fromDollars(-0.555).read).toBe("-0.56");
    expect(Money.fromDollars(100).read).toBe("100.00");
    expect(Money.fromDollars(100.5).read).toBe("100.50");
    expect(Money.fromDollars(100.51).read).toBe("100.51");
    expect(Money.fromDollars(100.555).read).toBe("100.56");
    expect(Money.fromDollars(-100).read).toBe("-100.00");
    expect(Money.fromDollars(-100.5).read).toBe("-100.50");
    expect(Money.fromDollars(-100.51).read).toBe("-100.51");
    expect(Money.fromDollars(-100.555).read).toBe("-100.56");
    expect(Money.fromDollars(1.125).read).toBe("1.12");
    expect(Money.fromDollars(1.513).read).toBe("1.51");
    expect(Money.fromDollars(1.557).read).toBe("1.56");
  });
});

describe("Money - Additional Edge Cases", () => {
  describe("Input Validation Edge Cases", () => {
    it("should handle invalid number inputs", () => {
      expect(() => Money.fromDollars(NaN)).toThrow("Invalid money value");
      expect(() => Money.fromDollars(Infinity)).toThrow(
        "Invalid money value: Infinity"
      );
      expect(() => Money.fromDollars(-Infinity)).toThrow(
        "Invalid money value: -Infinity"
      );
    });

    it("should handle invalid string inputs", () => {
      expect(() => Money.fromString("not a number")).toThrow(
        "Invalid money value"
      );
      expect(() => Money.fromString("")).toThrow("Invalid money value");
      expect(() => Money.fromString("   ")).toThrow("Invalid money value");
      expect(() => Money.fromString("abc123")).toThrow("Invalid money value");
    });

    it("should handle floating-point precision issues", () => {
      // JavaScript's 0.1 + 0.2 = 0.30000000000000004
      const result = Money.fromDollars(0.1 + 0.2);
      expect(result.toCents).toBe(30); // Should round correctly to 30 cents
      expect(result.toDollars).toBe(0.3);
    });

    it("should handle very small values correctly", () => {
      expect(Money.fromDollars(0.001).toCents).toBe(0); // Rounds down
      expect(Money.fromDollars(0.004).toCents).toBe(0); // Rounds down
      expect(Money.fromDollars(0.005).toCents).toBe(0); // Banker's rounding to even (0)
      expect(Money.fromDollars(0.006).toCents).toBe(1); // Rounds up
      expect(Money.fromDollars(0.015).toCents).toBe(2); // Banker's rounding to even (2)
    });
  });

  describe("Multiplication Edge Cases", () => {
    it("should handle multiplication by invalid numbers", () => {
      const money = Money.fromDollars(10);
      expect(() => money.multiply(NaN)).toThrow("Invalid multiplier: NaN");
      expect(() => money.multiply(Infinity)).toThrow(
        "Invalid multiplier: Infinity"
      );
      expect(() => money.multiply(-Infinity)).toThrow(
        "Invalid multiplier: -Infinity"
      );
    });

    it("should handle banker's rounding in multiplication", () => {
      const penny = Money.fromDollars(0.01);
      expect(penny.multiply(2.5).toCents).toBe(2); // 2.5 cents -> 2 cents (round to even)
      expect(penny.multiply(3.5).toCents).toBe(4); // 3.5 cents -> 4 cents (round to even)
      expect(penny.multiply(4.5).toCents).toBe(4); // 4.5 cents -> 4 cents (round to even)
      expect(penny.multiply(5.5).toCents).toBe(6); // 5.5 cents -> 6 cents (round to even)
    });

    it("should handle large multiplication results", () => {
      const large = Money.fromDollars(50000000); // $50M
      // This should be close to the limit but not exceed it
      expect(() => large.multiply(100)).not.toThrow();

      // This should exceed MAX_SAFE_INTEGER and throw
      expect(() => large.multiply(10000000000)).toThrow(
        "Multiplication result exceeds safe integer range"
      );
    });

    it("should handle negative zero correctly", () => {
      const money = Money.fromDollars(100);
      const result1 = money.multiply(-0);
      const result2 = money.multiply(0);

      expect(result1.toCents).toBe(0);
      expect(result2.toCents).toBe(0);
      expect(result1.isZero()).toBe(true);
      expect(result2.isZero()).toBe(true);
    });
  });

  describe("Comparison Edge Cases", () => {
    it("should handle comparisons with zero values", () => {
      const zero1 = Money.fromDollars(0);
      const zero2 = Money.fromDollars(-0);
      const positive = Money.fromDollars(0.01);
      const negative = Money.fromDollars(-0.01);

      expect(zero1.equals(zero2)).toBe(true);
      expect(zero1.greaterThan(negative)).toBe(true);
      expect(zero1.lessThan(positive)).toBe(true);
      expect(negative.lessThan(zero1)).toBe(true);
      expect(positive.greaterThan(zero1)).toBe(true);
    });

    it("should handle very close values", () => {
      const money1 = Money.fromDollars(1.005); // Rounds to 1.00
      const money2 = Money.fromDollars(1.004); // Rounds to 1.00

      expect(money1.equals(money2)).toBe(true);
      expect(money1.greaterThan(money2)).toBe(false);
      expect(money1.lessThan(money2)).toBe(false);
    });
  });

  describe("isPositive/isNegative Edge Cases", () => {
    it("should correctly identify positive, negative, and zero", () => {
      const zero = Money.fromDollars(0);
      const positive = Money.fromDollars(0.01);
      const negative = Money.fromDollars(-0.01);

      expect(zero.isPositive()).toBe(false); // Zero is not positive
      expect(zero.isNegative()).toBe(false); // Zero is not negative
      expect(zero.isZero()).toBe(true);

      expect(positive.isPositive()).toBe(true);
      expect(positive.isNegative()).toBe(false);
      expect(positive.isZero()).toBe(false);

      expect(negative.isPositive()).toBe(false);
      expect(negative.isNegative()).toBe(true);
      expect(negative.isZero()).toBe(false);
    });
  });

  describe("String Representation Edge Cases", () => {
    it("should handle very small rounded values in string representation", () => {
      expect(Money.fromDollars(0.001).read).toBe("0.00");
      expect(Money.fromDollars(-0.001).read).toBe("0.00");
      expect(Money.fromDollars(0.005).read).toBe("0.00"); // Banker's rounding
      expect(Money.fromDollars(0.015).read).toBe("0.02"); // Banker's rounding
    });

    it("should handle large values in string representation", () => {
      expect(Money.fromDollars(999999.99).read).toBe("999999.99");
      expect(Money.fromDollars(-999999.99).read).toBe("-999999.99");
    });
  });

  describe("Arithmetic with Rounded Values", () => {
    it("should maintain consistency when chaining operations", () => {
      const base = Money.fromDollars(10.666); // Rounds to 10.67
      const multiplied = base.multiply(3); // 10.67 * 3 = 32.01
      const divided = multiplied.multiply(1 / 3); // Should get back close to original

      expect(base.toCents).toBe(1067);
      expect(multiplied.toCents).toBe(3201);
      // Due to rounding, we might not get exactly back to 1067
      expect(divided.toCents).toBe(1067); // 3201 / 3 = 1067
    });

    it("should handle addition and subtraction with rounded values", () => {
      const money1 = Money.fromDollars(1.005); // Rounds to 1.00
      const money2 = Money.fromDollars(0.995); // Rounds to 1.00

      expect(money1.add(money2).toCents).toBe(200); // 1.00 + 1.00 = 2.00
      expect(money1.subtract(money2).toCents).toBe(0); // 1.00 - 1.00 = 0.00
    });
  });

  describe("Constructor Edge Cases", () => {
    it("should reject non-integer values in constructor", () => {
      // These would be called internally, but testing the validation
      expect(() => {
        Money.fromDollars(NaN);
      }).toThrow("Invalid money value");
    });
  });
});
