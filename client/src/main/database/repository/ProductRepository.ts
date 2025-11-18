import { and, count, eq, gt, like, ne } from "drizzle-orm";
import { BaseRepository } from ".";
import { productTable, stockTable } from "..";
import { IProductRepository } from "../interfaces/IProductRepository";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import {
  NewProductDTO,
  ProductDTO,
  ProductListDTO,
  UpdateProductDTO,
} from "../../../shared/dto/product";
import { NewStockDTO } from "../../../shared/dto/stock";

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
    return this.dbContext.transaction((tx: BetterSQLite3Database) => {
      // Insert product
      const product = tx.insert(productTable).values(data).returning().get();
      if (!product) throw new Error("Failed to insert product");

      // Insert stock
      const stock = tx
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
      .where(
        and(eq(productTable.id, productId), ne(productTable.isDeleted, true))
      )
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
   * @param name Filtering by name
   * @param limit Number of products to return (default 10)
   * @param offset Number of products to skip (default 0)
   * @returns Array of products
   */
  async getAll(name = "", limit = 10, offset = 0): Promise<ProductListDTO> {
    const filters = and(
      name ? like(productTable.name, `%${name}%`) : undefined,
      gt(stockTable.quantity, 0),
      ne(productTable.isDeleted, true)
    );

    const products = this.dbContext
      .select()
      .from(productTable)
      .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
      .where(filters)
      .limit(limit)
      .offset(offset)
      .all();

    const [{ total }] = await this.dbContext
      .select({ total: count() })
      .from(productTable)
      .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
      .where(filters);

    if (!products) {
      return {
        products: [],
        total: 0,
      };
    }

    return {
      products: products.map((result) => ({
        ...result.product,
        quantity: result.stock?.quantity,
        lowStockThreshold: result.stock?.lowStockThreshold,
      })) as ProductDTO[],
      total: total,
    };
  }

  /**
   * Updates an existing product
   * @param productId ID of the product to update
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
      updatedProduct = this.dbContext
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
      updatedStock = this.dbContext
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

    if (!updatedProduct && !updatedStock) return null;
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
      .set({ isDeleted: true } as Partial<ProductDTO>)
      .where(eq(productTable.id, productID))
      .run();
  }
}
