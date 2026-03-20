import { and, count, eq, gt, like, ne } from "drizzle-orm";
import { BaseRepository } from ".";
import { lower, productTable, stockTable, userTable } from "..";
import { IProductRepository } from "../interfaces/IProductRepository";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import {
  NewProductDTO,
  ProductDTO,
  ProductListDTO,
  UpdateProductDTO,
} from "../../../shared/dto/product";
import { DBError, UniqueConstraintError } from "../../error";
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
      let product = null,
        stock = null;
      try {
        product = tx.insert(productTable).values(data).returning().get();
      } catch (err) {
        const error = new DBError(err.message);
        error.stack = err.stack;
        throw error;
      }

      // Insert stock
      try {
        stock = tx
          .insert(stockTable)
          .values({
            quantity: data.quantity,
            lowStockThreshold: data.lowStockThreshold,
            productID: product.id,
            timestamp: new Date(),
          } as NewStockDTO)
          .returning()
          .get();
      } catch (err) {
        const error = new DBError(err.message);
        error.stack = err.stack;
        throw error;
      }

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
    let product = null;
    try {
      product = this.dbContext
        .select()
        .from(productTable)
        .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
        .leftJoin(userTable, eq(productTable.addedBy, userTable.id))
        .where(
          and(eq(productTable.id, productId), ne(productTable.isDeleted, true)),
        )
        .get();

      if (product === undefined) return null;
      return {
        ...product.product,
        quantity: product.stock?.quantity,
        lowStockThreshold: product.stock?.lowStockThreshold,
        addedBy: product.user?.username,
      } as ProductDTO;
    } catch (err) {
      const error = new DBError(err.message);
      error.stack = err.stack;
      throw error;
    }
  }

  /**
   * Get product by name
   * @param name The name of the product to retrieve
   * @returns The product if found, or null
   */
  async getByName(name: string): Promise<ProductDTO | null> {
    try {
      return this.dbContext
        .select()
        .from(productTable)
        .where(eq(productTable.name, name))
        .get();
    } catch (err) {
      const error = new DBError(err.message);
      error.stack = err.stack;
      throw error;
    }
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
      name
        ? like(lower(productTable.name), `%${name.toLowerCase()}%`)
        : undefined,
      gt(stockTable.quantity, 0),
      ne(productTable.isDeleted, true),
    );

    let products = null;
    let total = 0;
    try {
      products = this.dbContext
        .select()
        .from(productTable)
        .leftJoin(stockTable, eq(productTable.id, stockTable.productID))
        .where(filters)
        .limit(limit)
        .offset(offset)
        .all();

      [{ total }] = await this.dbContext
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
    } catch (err) {
      const error = new DBError(err.message);
      error.stack = err.stack;
      throw error;
    }
  }

  /**
   * Updates an existing product
   * @param productId ID of the product to update
   * @param product The updated product data (must include ID)
   * @returns The updated product if found, otherwise null
   */
  async update(
    productId: string,
    product: UpdateProductDTO,
  ): Promise<ProductDTO | null> {
    let nameConflict;

    // Check for conflicts
    if (product.name !== undefined) {
      try {
        nameConflict = this.dbContext
          .select()
          .from(productTable)
          .where(
            and(
              ne(productTable.id, productId),
              eq(lower(productTable.name), product.name.toLowerCase()),
            ),
          )
          .get();
      } catch (err) {
        const error = new DBError(err.message);
        error.stack = err.stack;
        throw error;
      }

      if (nameConflict)
        throw new UniqueConstraintError(
          `A product with this name: ${product.name} already exists.`,
        );
    }

    // Update product fields
    if (
      product.name !== undefined ||
      product.buyPrice !== undefined ||
      product.sellPrice !== undefined
    ) {
      try {
        return this.dbContext
          .update(productTable)
          .set({
            ...(product.name !== undefined && { name: product.name }),
            ...(product.buyPrice !== undefined && {
              buyPrice: product.buyPrice,
            }),
            ...(product.sellPrice !== undefined && {
              sellPrice: product.sellPrice,
            }),
          })
          .where(eq(productTable.id, productId))
          .returning()
          .get();
      } catch (err) {
        const error = new DBError(err.message);
        error.stack = err.stack;
        throw error;
      }
    }
  }

  /**
   * Deletes a product by its ID
   * @param productID The ID of the product to delete
   */
  async delete(productID: string): Promise<void> {
    try {
      this.dbContext
        .update(productTable)
        .set({ isDeleted: true } as Partial<ProductDTO>)
        .where(eq(productTable.id, productID))
        .run();
    } catch (err) {
      const error = new DBError(err.message);
      error.stack = err.stack;
      throw error;
    }
  }
}
