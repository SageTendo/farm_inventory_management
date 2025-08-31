import {
  NewProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from "../../database/schema/types";

export interface IProductService {
  /**
   * Create a new product
   * @param userId The ID of the user creating the product.
   * @param entity: A new product entity to be inserted into the database.
   * @returns {Promise<ProductDTO>} A promise that resolves to the created product entity.
   */
  create(entity: NewProductDTO): Promise<ProductDTO>;

  /**
   * Retrieves a product by its ID.
   * @param id The ID of the product to retrieve.
   * @returns A promise that resolves to the product entity if found, otherwise null.
   */
  getById(id: number): Promise<ProductDTO | null>;

  /**
   * @param name?: string,
   * @param limit?: number,
   * @param offset?: number
   * Retrieves all products from the database.
   * @returns A promise that resolves to an array of product entities.
   */
  getAll(name?: string, limit?: number, offset?: number): Promise<ProductDTO[]>;

  /**
   * Updates an existing product in the database.
   * @param userId The ID of the user making the change.
   * @param productId The ID of the product to update.
   * @param entity The updated product entity.
   * @returns A promise that resolves to the updated product entity if successful, otherwise null.
   */
  update(
    userId: number,
    productId: number,
    entity: UpdateProductDTO
  ): Promise<ProductDTO | null>;

  /**
   * Deletes a product by its ID.
   * @param userId The ID of the user deleting the product.
   * @param productId The ID of the product to update.
   * @returns A promise that resolves when the product is deleted.
   */
  delete(userId: number, productId: number): Promise<void>;
}
