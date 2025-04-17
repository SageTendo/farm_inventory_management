import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import { BaseRepository } from ".";
import { productTable } from "../schema";
import { NewProductDTO, ProductDTO, UpdateProductDTO } from "../schema/types";
import { IProductRepository } from "../interfaces/IProductRepository";

/**
 * Repository class to handle CRUD operations for product entities.
 */
export class ProductRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IProductRepository
{
  /**
   * Inserts a new product entry into the database
   * @param product The product data to create
   * @returns The created product entry
   */
  async createProduct(product: NewProductDTO): Promise<ProductDTO> {
    const [created] = await this.dbContext
      .insert(productTable)
      .values(product)
      .returning();
    return created;
  }

  /**
   * Retrieves a product by its ID
   * @param productID The ID of the product to retrieve
   * @returns The product if found, or null
   */
  async getProductById(productID: number): Promise<ProductDTO | null> {
    const product = this.dbContext
      .select()
      .from(productTable)
      .where(eq(productTable.id, productID))
      .get();
    return product || null;
  }

  /**
   * Retrieves multiple products, with optional pagination
   * @param limit Number of products to return (default 10)
   * @param offset Number of products to skip (default 0)
   * @returns Array of products
   */
  async getAllProducts(
    limit: number = 10,
    offset: number = 0,
  ): Promise<ProductDTO[]> {
    return this.dbContext
      .select()
      .from(productTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  /**
   * Updates an existing product
   * @param product The updated product data (must include ID)
   * @returns The updated product if found, otherwise null
   */
  async updateProduct(
    id: number,
    product: UpdateProductDTO,
  ): Promise<ProductDTO | null> {
    const [updated] = await this.dbContext
      .update(productTable)
      .set(product)
      .where(eq(productTable.id, id))
      .returning();
    return updated || null;
  }

  /**
   * Deletes a product by its ID
   * @param productID The ID of the product to delete
   */
  async deleteProduct(productID: number): Promise<void> {
    return this.dbContext
      .delete(productTable)
      .where(eq(productTable.id, productID))
      .run();
  }
}
