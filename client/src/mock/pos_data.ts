import { faker } from "@faker-js/faker";
import { Money } from "../lib/money";

export interface Product {
  id: number;
  name: string;
  buyPrice: Money;
  sellPrice: Money;
  stock: number;
  addedBy: number;
  isDeleted: boolean;
  createdAt: Date;
}

export const products: Product[] = [];

for (let i = 0; i < 20; i++) {
  products.push({
    id: i + 1,
    name: faker.commerce.productName(),
    buyPrice: Money.fromString(faker.commerce.price({ min: 1, max: 100 })),
    sellPrice: Money.fromString(faker.commerce.price({ min: 1, max: 100 })),
    stock: faker.number.int({ min: 0, max: 100 }),
    addedBy: 1,
    isDeleted: false,
    createdAt: faker.date.past(),
  });
}
