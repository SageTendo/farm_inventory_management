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
  createProduct(product: NewProductDTO): Promise<ProductDTO>;

  /**
   * Retrieves a product by its ID
   * @param productID The ID of the product to retrieve
   * @returns A promise that resolves to the product entity if found
   */
  getProduct(productID: number): Promise<ProductDTO>;

  /**
   * Retrieves multiple products
   * @param limit The maximum number of products to retrieve (optional)
   * @param offset The number of products to skip before retrieving (optional)
   * @returns A promise that resolves to an array of product entities
   */
  getProducts(limit?: number, offset?: number): Promise<ProductDTO[]>;

  /**
   * Updates an existing product
   * @param product The updated product data
   * @returns A promise that resolves to the updated product entity
   */
  updateProduct(product: UpdateProductDTO): Promise<ProductDTO>;

  /**
   * Deletes a product by its ID
   * @param productID The ID of the product to delete
   * @returns A promise that resolves when the product is deleted
   */
  deleteProduct(productID: number): Promise<void>;
}
