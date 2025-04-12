import { IGenericRepository } from ".";
import { NewProduct, Product, UpdateProduct } from "../schema/types";

export class ProductRepository
  implements IGenericRepository<Product, NewProduct, UpdateProduct>
{
  create(entity: NewProduct): Promise<Product> {
    // TODO: Create product
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Product[]> {
    // TODO: Get all products
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Product | null> {
    // TODO: Get product by id
    throw new Error("Method not implemented.");
  }

  update(id: number, entity: UpdateProduct): Promise<Product | null> {
    // TODO: Update product
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<void> {
    // TODO: Delete product
    throw new Error("Method not implemented.");
  }
}
