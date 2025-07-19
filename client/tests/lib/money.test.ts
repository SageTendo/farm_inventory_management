import { describe, expect, it } from "vitest";
import { bankersRounding, Money } from "../../src/lib/money";

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
  });
});

describe("Money", () => {
  it("should create a Money object from an integer (in cents)", () => {
    const m = Money.fromNumber(1.335);
    expect(Number.isInteger(m.toCents)).toBe(true);

    expect(Money.fromNumber(0).toCents).toBe(0);
    expect(Money.fromNumber(1).toCents).toBe(100);
    expect(Money.fromNumber(10).toCents).toBe(1000);
    expect(Money.fromNumber(105).toCents).toBe(10500);
    expect(Money.fromNumber(150).toCents).toBe(15000);
    expect(Money.fromNumber(2).toCents).toBe(200);

    expect(Money.fromNumber(0).toDollars).toBe(0);
    expect(Money.fromNumber(1).toDollars).toBe(1);
    expect(Money.fromNumber(10).toDollars).toBe(10);
    expect(Money.fromNumber(105).toDollars).toBe(105);
    expect(Money.fromNumber(150).toDollars).toBe(150);
    expect(Money.fromNumber(2).toDollars).toBe(2);
  });

  it("should create a Money object from a float (in cents)", () => {
    expect(Money.fromNumber(0.0).toCents).toBe(0);
    expect(Money.fromNumber(0.01).toCents).toBe(1);
    expect(Money.fromNumber(0.1).toCents).toBe(10);
    expect(Money.fromNumber(1.0).toCents).toBe(100);
    expect(Money.fromNumber(1.05).toCents).toBe(105);
    expect(Money.fromNumber(1.5).toCents).toBe(150);

    expect(Money.fromNumber(0.0).toDollars).toBe(0);
    expect(Money.fromNumber(0.01).toDollars).toBe(0.01);
    expect(Money.fromNumber(0.1).toDollars).toBe(0.1);
    expect(Money.fromNumber(1.0).toDollars).toBe(1);
    expect(Money.fromNumber(1.05).toDollars).toBe(1.05);
    expect(Money.fromNumber(1.5).toDollars).toBe(1.5);
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

    const x = Money.fromNumber(10);
    const y = Money.fromNumber(20);
    expect(x.subtract(y).toCents).toBe(-1000);
    expect(x.subtract(y).toDollars).toBe(-10);
  });

  it("Should add two Money objects together", () => {
    const x = Money.fromNumber(100);
    const y = Money.fromNumber(100);
    expect(x.add(y).toCents).toBe(20000);
    expect(x.add(y).toDollars).toBe(200);
  });

  it("Should subtract two Money objects", () => {
    const x = Money.fromNumber(100);
    const y = Money.fromNumber(100);
    expect(x.subtract(y).toCents).toBe(0);
    expect(x.subtract(y).toDollars).toBe(0);
    expect(x.subtract(y).isZero()).toBe(true);
  });

  it("Should multiply a Money object by a number", () => {
    const x = Money.fromNumber(100);
    expect(x.multiply(2).toCents).toBe(20000);
    expect(x.multiply(2).toDollars).toBe(200);
    expect(x.multiply(0.5).toCents).toBe(5000);
    expect(x.multiply(0.5).toDollars).toBe(50);
    expect(x.multiply(0).toCents).toBe(0);
    expect(x.multiply(0).toDollars).toBe(0);
    expect(x.multiply(-1).toCents).toBe(-10000);
    expect(x.multiply(-1).toDollars).toBe(-100);
    expect(x.multiply(-0.5).toCents).toBe(-5000);
    expect(x.multiply(-0.5).toDollars).toBe(-50);
    expect(x.multiply(-0.5).isNegative()).toBe(true);
    expect(x.multiply(-0).toCents).toBe(0);
    expect(x.multiply(-0).toDollars).toBe(0);
    expect(x.multiply(-0).isPositive()).toBe(true);
  });

  it("Should convert a Money object to a readable string", () => {
    expect(Money.fromNumber(0).read).toBe("0.00");
    expect(Money.fromNumber(-0).read).toBe("0.00");
    expect(Money.fromNumber(-0.5).read).toBe("-0.50");
    expect(Money.fromNumber(-0.51).read).toBe("-0.51");
    expect(Money.fromNumber(-0.555).read).toBe("-0.56");
    expect(Money.fromNumber(100).read).toBe("100.00");
    expect(Money.fromNumber(100.5).read).toBe("100.50");
    expect(Money.fromNumber(100.51).read).toBe("100.51");
    expect(Money.fromNumber(100.555).read).toBe("100.56");
    expect(Money.fromNumber(-100).read).toBe("-100.00");
    expect(Money.fromNumber(-100.5).read).toBe("-100.50");
    expect(Money.fromNumber(-100.51).read).toBe("-100.51");
    expect(Money.fromNumber(-100.555).read).toBe("-100.56");
    expect(Money.fromNumber(1.125).read).toBe("1.12");
    expect(Money.fromNumber(1.513).read).toBe("1.51");
    expect(Money.fromNumber(1.557).read).toBe("1.56");
  });
});
