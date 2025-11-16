import {
  NewProductDTO,
  ProductDTO,
  ProductListDTO,
  UpdateProductDTO,
} from "../../shared/dto/product";
import { IProductRepository } from "../database/interfaces/IProductRepository";
import { UserRoleType } from "../../shared/types";
import { IAuthService } from "./interfaces/IAuthService";
import { IProductService } from "./interfaces/IProductService";

const PERMITTED_ROLES: UserRoleType[] = ["ADMIN", "OWNER"];

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

  async getById(productId: string): Promise<ProductDTO | null> {
    return await this.productRepository.getById(productId);
  }

  async getAll(
    name?: string,
    limit?: number,
    offset?: number
  ): Promise<ProductListDTO> {
    return await this.productRepository.getAll(name, limit, offset);
  }

  async update(
    userId: string,
    productId: string,
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

  async delete(userId: string, productId: string): Promise<void> {
    const hasPermission = this.authService.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new Error("You do not have permission to delete products!");
    return await this.productRepository.delete(productId);
  }
}
