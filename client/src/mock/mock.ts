import { faker } from "@faker-js/faker";
import { Money } from "../lib/money";
import { NewProductDTO, ProductDTO } from "../shared/dto/product";

export const products: ProductDTO[] = [];
for (let i = 0; i < 20; i++) {
  products.push({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    buyPrice: Money.fromString(faker.commerce.price({ min: 1, max: 100 }))
      .toCents,
    sellPrice: Money.fromString(faker.commerce.price({ min: 1, max: 100 }))
      .toCents,
    quantity: faker.number.int({ min: 0, max: 100 }),
    addedBy: faker.string.uuid(),
    isDeleted: false,
    createdAt: faker.date.past(),
    lowStockThreshold: faker.number.int({ min: 5, max: 15 }),
  });
}

export const generateProducts = (userId: string) => {
  const products: NewProductDTO[] = [];
  const names: string[] = [];
  let productName;
  for (let i = 0; i < 200; i++) {
    productName = faker.commerce.productName();
    while (names.includes(productName)) {
      productName = faker.commerce.productName();
    }
    names.push();

    products.push({
      name: productName,
      buyPrice: Money.fromString(faker.commerce.price({ min: 1, max: 100 }))
        .toCents,
      sellPrice: Money.fromString(faker.commerce.price({ min: 1, max: 100 }))
        .toCents,
      quantity: faker.number.int({ min: 0, max: 100 }),
      addedBy: userId,
      lowStockThreshold: faker.number.int({ min: 5, max: 15 }),
    });
  }
  return products;
};
