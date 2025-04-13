import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { BaseRepository, IGenericRepository } from ".";
import { NewProductDTO, ProductDTO, UpdateProductDTO } from "../schema/types";

export class ProductRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IGenericRepository<ProductDTO, NewProductDTO, UpdateProductDTO>
{
  async create(entity: NewProductDTO): Promise<ProductDTO> {
    // TODO: Create product
    throw new Error("Method not implemented.");
  }

  async getAll(limit?: number, offset?: number): Promise<ProductDTO[]> {
    // TODO: Get all products
    throw new Error("Method not implemented.");
  }

  async getById(id: number): Promise<ProductDTO | null> {
    // TODO: Get product by id
    throw new Error("Method not implemented.");
  }

  async update(
    id: number,
    entity: UpdateProductDTO
  ): Promise<ProductDTO | null> {
    // TODO: Update product
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<void> {
    // TODO: Delete product
    throw new Error("Method not implemented.");
  }
}
