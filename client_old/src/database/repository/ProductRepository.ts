import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { and, eq, gt, like } from "drizzle-orm";
import { BaseRepository } from ".";
import { productTable, stockTable } from "../schema";
import {
  NewProductDTO,
  NewStockDTO,
  ProductDTO,
  UpdateProductDTO,
} from "../schema/types";
import { IProductRepository } from "../interfaces/IProductRepository";

/**
 * Repository class to handle CRUD operations for product entities.
 */
export class ProductRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IProductRepository
{
  /**
   * Inserts a new product and stock entry into the database
   * @param product The product data to create
   * @returns The created product entry
   */
  async create(data: NewProductDTO): Promise<ProductDTO> {
    return this.dbContext.transaction((tx) => {
      // Insert product
      const product_result = tx.insert(productTable).values(data).run();
      if (!product_result) throw new Error("Failed to insert product");

      // Insert stock
      const stock_result = tx
        .insert(stockTable)
        .values({
          quantity: data.quantity,
          lowStockThreshold: data.lowStockThreshold,
          productID: product_result.lastInsertRowid,
          timestamp: new Date(),
        } as NewStockDTO)
        .run();
      if (!stock_result.lastInsertRowid)
        throw new Error("Failed to insert stock");

      // Fetch product with stock
      const product = tx
        .select()
        .from(productTable)
        .where(eq(productTable.id, Number(product_result.lastInsertRowid)))
        .get();

      const stock = tx
        .select()
        .from(stockTable)
        .where(eq(stockTable.id, Number(stock_result.lastInsertRowid)))
        .get();

      return {
        ...product,
        quantity: stock?.quantity,
        lowStockThreshold: stock?.lowStockThreshold,
      } as ProductDTO;
    });
  }

  /**
   * Retrieves a product by its ID
   * @param productID The ID of the product to retrieve
   * @returns The product if found, or null
   */
  async getById(productID: number): Promise<ProductDTO | null> {
    const result = this.dbContext
      .select()
      .from(productTable)
      .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
      .where(eq(productTable.id, productID))
      .get();

    if (!result) return null;
    return {
      ...result.product,
      quantity: result.stock?.quantity,
      lowStockThreshold: result.stock?.lowStockThreshold,
    } as ProductDTO;
  }

  /**
   * Retrieves multiple products, with optional pagination
   * @param limit Number of products to return (default 10)
   * @param offset Number of products to skip (default 0)
   * @returns Array of products
   */
  async getAll(
    name: string = "",
    limit: number = 10,
    offset: number = 0
  ): Promise<ProductDTO[]> {
    const resultsList = this.dbContext
      .select()
      .from(productTable)
      .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
      .where(
        and(
          name ? like(productTable.name, `%${name}%`) : undefined,
          gt(stockTable.quantity, 0)
        )
      )
      .limit(limit)
      .offset(offset)
      .all();

    if (!resultsList) return [];
    return resultsList.map((result) => ({
      ...result.product,
      quantity: result.stock?.quantity,
      lowStockThreshold: result.stock?.lowStockThreshold,
    })) as ProductDTO[];
  }

  /**
   * Updates an existing product
   * @param product The updated product data (must include ID)
   * @returns The updated product if found, otherwise null
   */
  async update(
    id: number,
    product: UpdateProductDTO
  ): Promise<ProductDTO | null> {
    // Update product fields
    if (product.name || product.buyPrice || product.sellPrice) {
      this.dbContext
        .update(productTable)
        .set({
          ...(product.name !== undefined && { name: product.name }),
          ...(product.buyPrice !== undefined && { buyPrice: product.buyPrice }),
          ...(product.sellPrice !== undefined && {
            sellPrice: product.sellPrice,
          }),
        })
        .where(eq(productTable.id, id))
        .run();
    }

    // Update stock fields if provided
    if (
      product.quantity !== undefined ||
      product.lowStockThreshold !== undefined
    ) {
      this.dbContext
        .update(stockTable)
        .set({
          ...(product.quantity !== undefined && { quantity: product.quantity }),
          ...(product.lowStockThreshold !== undefined && {
            lowStockThreshold: product.lowStockThreshold,
          }),
        })
        .where(eq(stockTable.productID, id))
        .run();
    }

    // Fetch and return updated entity
    const result = this.dbContext
      .select()
      .from(productTable)
      .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
      .where(eq(productTable.id, id))
      .get();

    if (!result) return null;
    return {
      ...result.product,
      quantity: result.stock?.quantity,
      lowStockThreshold: result.stock?.lowStockThreshold,
    } as ProductDTO;
  }

  /**
   * Deletes a product by its ID
   * @param productID The ID of the product to delete
   */
  async delete(productID: number): Promise<void> {
    this.dbContext
      .update(productTable)
      .set({ isDeleted: true })
      .where(eq(productTable.id, productID))
      .run();
  }
}
