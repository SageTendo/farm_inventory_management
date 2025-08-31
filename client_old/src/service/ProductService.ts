import { IProductRepository } from "../database/interfaces/IProductRepository";
import { RoleType } from "../database/schema/constants";
import {
  NewProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from "../database/schema/types";
import { IAuthService } from "./interfaces/IAuthService";
import { IProductService } from "./interfaces/IProductService";

const PERMITTED_ROLES: RoleType[] = ["ADMIN", "OWNER"];

export class ProductService implements IProductService {
  protected authService: IAuthService;
  protected productRepository: IProductRepository;

  constructor(
    authService: IAuthService,
    productRepository: IProductRepository
  ) {
    this.authService = authService;
    this.productRepository = productRepository;
  }

  async create(product: NewProductDTO): Promise<ProductDTO> {
    const hasPermission = await this.authService.hasRequiredRole(
      product.addedBy,
      PERMITTED_ROLES
    );

    if (!hasPermission) {
      throw new Error("You do not have permission to add products!");
    }
    return await this.productRepository.create(product);
  }

  async getById(id: number): Promise<ProductDTO | null> {
    return await this.productRepository.getById(id);
  }

  async getAll(
    name?: string,
    limit?: number,
    offset?: number
  ): Promise<ProductDTO[]> {
    return await this.productRepository.getAll(name, limit, offset);
  }

  async update(
    userId: number,
    productId: number,
    entity: UpdateProductDTO
  ): Promise<ProductDTO | null> {
    const hasPermission = this.authService.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new Error("You do not have permission to update products!");

    const productExists = this.productRepository.getById(productId);
    if (!productExists)
      throw Error("You cannot modify a product which does not exist!");
    return await this.productRepository.update(productId, entity);
  }

  async delete(userId: number, productId: number): Promise<void> {
    const hasPermission = this.authService.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new Error("You do not have permission to delete products!");
    return await this.productRepository.delete(productId);
  }
}
