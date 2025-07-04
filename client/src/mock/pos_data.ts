import { faker } from "@faker-js/faker";

export interface Product {
  id: number;
  name: string;
  buyPrice: number;
  sellPrice: number;
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
    buyPrice: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
    sellPrice: parseFloat(faker.commerce.price({ min: 100, max: 500 })),
    stock: faker.number.int({ min: 10, max: 100 }),
    addedBy: 1,
    isDeleted: faker.datatype.boolean(0.1),
    createdAt: faker.date.past(),
  });
}
