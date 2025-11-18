import { faker } from "@faker-js/faker";
import { NewProductDTO, ProductDTO } from "../shared/dto/product";

export const generateProducts = (userId: string) => {
  const products: NewProductDTO[] = [];
  const names: Set<string> = new Set();
  let productName;
  for (let i = 0; i < 2000; i++) {
    productName = faker.commerce.productName();
    while (names.has(productName)) {
      productName = faker.commerce.productName();
    }
    names.add(productName);

    products.push(
      ProductDTO.parse({
        id: faker.string.uuid(),
        name: productName,
        buyPrice: faker.number.float({ min: 1, max: 100 }),
        sellPrice: faker.number.float({ min: 1, max: 100 }),
        quantity: faker.number.int({ min: 0, max: 100 }),
        isDeleted: false,
        createdAt: faker.date.past(),
        addedBy: userId,
        lowStockThreshold: faker.number.int({ min: 5, max: 15 }),
      })
    );
  }
  return products;
};
