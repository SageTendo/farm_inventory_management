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
  extends BaseRepository
  implements IProductRepository
{
  /**
   * Inserts a new product and stock entry into the database
   * @param product The product data to create
   * @returns The created product entry
   */
  async create(data: NewProductDTO): Promise<ProductDTO> {
    return this.dbContext.transaction(async (tx) => {
      // Insert product
      const product = await tx
        .insert(productTable)
        .values(data)
        .returning()
        .get();
      if (!product) throw new Error("Failed to insert product");

      // Insert stock
      const stock = await tx
        .insert(stockTable)
        .values({
          quantity: data.quantity,
          lowStockThreshold: data.lowStockThreshold,
          productID: product.id,
          timestamp: new Date(),
        } as NewStockDTO)
        .returning()
        .get();
      if (!stock) throw new Error("Failed to insert stock");

      return {
        ...product,
        quantity: stock?.quantity,
        lowStockThreshold: stock?.lowStockThreshold,
      } as ProductDTO;
    });
  }

  /**
   * Retrieves a product by its ID
   * @param productId The ID of the product to retrieve
   * @returns The product if found, or null
   */
  async getById(productId: string): Promise<ProductDTO | null> {
    const product = await this.dbContext
      .select()
      .from(productTable)
      .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
      .where(eq(productTable.id, productId))
      .get();

    if (!product) return null;
    return {
      ...product.product,
      quantity: product.stock?.quantity,
      lowStockThreshold: product.stock?.lowStockThreshold,
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
    const products = await this.dbContext
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

    if (!products) return [];
    return products.map((result) => ({
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
    productId: string,
    product: UpdateProductDTO
  ): Promise<ProductDTO | null> {
    let updatedProduct, updatedStock;

    // Update product fields
    if (product.name || product.buyPrice || product.sellPrice) {
      updatedProduct = await this.dbContext
        .update(productTable)
        .set({
          ...(product.name !== undefined && { name: product.name }),
          ...(product.buyPrice !== undefined && { buyPrice: product.buyPrice }),
          ...(product.sellPrice !== undefined && {
            sellPrice: product.sellPrice,
          }),
        })
        .where(eq(productTable.id, productId))
        .returning()
        .get();
    }

    // Update stock fields if provided
    if (
      product.quantity !== undefined ||
      product.lowStockThreshold !== undefined
    ) {
      updatedStock = await this.dbContext
        .update(stockTable)
        .set({
          ...(product.quantity !== undefined && { quantity: product.quantity }),
          ...(product.lowStockThreshold !== undefined && {
            lowStockThreshold: product.lowStockThreshold,
          }),
        })
        .where(eq(stockTable.productID, productId))
        .returning()
        .get();
    }

    if (!updatedProduct || !updatedStock) return null;
    return {
      ...updatedProduct,
      quantity: updatedStock?.quantity,
      lowStockThreshold: updatedStock?.lowStockThreshold,
    } as ProductDTO;
  }

  /**
   * Deletes a product by its ID
   * @param productID The ID of the product to delete
   */
  async delete(productID: string): Promise<void> {
    this.dbContext
      .update(productTable)
      .set({ isDeleted: true })
      .where(eq(productTable.id, productID))
      .run();
  }
}
