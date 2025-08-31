import { NewProductDTO, UpdateProductDTO, ProductDTO } from "../schema/types";

/**
 * Interface for product repository
 */
export interface IProductRepository {
  /**
   * Creates a new product
   * @param product The product data to create
   * @returns A promise that resolves to the created product entity
   */
  create(product: NewProductDTO): Promise<ProductDTO>;

  /**
   * Retrieves a product by its ID
   * @param productId The ID of the product to retrieve
   * @returns A promise that resolves to the product entity if found
   */
  getById(productId: string): Promise<ProductDTO | null>;

  /**
   * Retrieves multiple products
   * @param limit The maximum number of products to retrieve (optional)
   * @param offset The number of products to skip before retrieving (optional)
   * @returns A promise that resolves to an array of product entities
   */
  getAll(name?: string, limit?: number, offset?: number): Promise<ProductDTO[]>;

  /**
   * Updates an existing product
   * @param productId The ID of the product to update
   * @param product The updated product data
   * @returns A promise that resolves to the updated product entity
   */
  update(
    productId: string,
    enitity: UpdateProductDTO
  ): Promise<ProductDTO | null>;

  /**
   * Deletes a product by its ID
   * @param productId The ID of the product to delete
   * @returns A promise that resolves when the product is deleted
   */
  delete(productId: string): Promise<void>;
}
