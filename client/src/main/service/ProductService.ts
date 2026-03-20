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
import { Money } from "../../shared/lib/money";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../error";

const PERMITTED_ROLES: UserRoleType[] = ["ADMIN", "OWNER"];

export class ProductService implements IProductService {
  protected authService: IAuthService;
  protected productRepository: IProductRepository;

  constructor(
    authService: IAuthService,
    productRepository: IProductRepository,
  ) {
    this.authService = authService;
    this.productRepository = productRepository;
  }

  async create(product: NewProductDTO): Promise<ProductDTO> {
    const hasPermission = await this.authService.hasRequiredRole(
      product.addedBy,
      PERMITTED_ROLES,
    );

    if (!hasPermission) {
      throw new ForbiddenError("You do not have permission to add products!");
    }

    const productExists = await this.productRepository.getByName(product.name);
    if (productExists) {
      throw new ConflictError(
        `A Product with the name: ${product.name} already exists!`,
      );
    }

    return await this.productRepository.create({
      ...product,
      buyPrice: Money.fromDollars(product.buyPrice).toCents,
      sellPrice: Money.fromDollars(product.sellPrice).toCents,
    });
  }

  async getById(productId: string): Promise<ProductDTO | null> {
    const product = await this.productRepository.getById(productId);
    if (!product) return null;
    return ProductDTO.parse({
      ...product,
      buyPrice: Money.fromCents(product.buyPrice).toDollars,
      sellPrice: Money.fromCents(product.sellPrice).toDollars,
    });
  }

  async getAll(
    name?: string,
    limit?: number,
    offset?: number,
  ): Promise<ProductListDTO> {
    const productsList = await this.productRepository.getAll(
      name,
      limit,
      offset,
    );

    const products = productsList.products.map((product) =>
      ProductDTO.parse({
        ...product,
        buyPrice: Money.fromCents(product.buyPrice).toDollars,
        sellPrice: Money.fromCents(product.sellPrice).toDollars,
      }),
    );

    return {
      products,
      total: productsList.total,
    };
  }

  async update(
    userId: string,
    productId: string,
    entity: UpdateProductDTO,
  ): Promise<ProductDTO | null> {
    const hasPermission = this.authService.hasRequiredRole(
      userId,
      PERMITTED_ROLES,
    );
    if (!hasPermission)
      throw new ForbiddenError(
        "You do not have permission to update products!",
      );

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new NotFoundError(
        "You cannot modify a product which does not exist!",
      );
    }

    const productExists = await this.productRepository.getByName(entity.name);
    if (productExists) {
      const isValidProductName = productExists.id === productId;
      if (!isValidProductName) {
        throw new ConflictError(
          `A Product with the name: ${entity.name} already exists!`,
        );
      }
    }

    if (entity.name !== undefined && entity.name.trim() === "")
      throw new BadRequestError("Product name cannot be empty!");

    if (entity.buyPrice !== undefined && entity.buyPrice <= 0)
      throw new BadRequestError("Product buy price must be greater than zero!");

    if (entity.sellPrice !== undefined && entity.sellPrice <= 0)
      throw new BadRequestError(
        "Product sell price must be greater than zero!",
      );

    const updatedProduct = await this.productRepository.update(productId, {
      ...entity,
      buyPrice: Money.fromDollars(entity.buyPrice).toCents,
      sellPrice: Money.fromDollars(entity.sellPrice).toCents,
    });

    if (!updatedProduct) return null;
    return ProductDTO.parse({
      ...updatedProduct,
      buyPrice: Money.fromCents(updatedProduct.buyPrice).toDollars,
      sellPrice: Money.fromCents(updatedProduct.sellPrice).toDollars,
    });
  }

  async delete(userId: string, productId: string): Promise<void> {
    const hasPermission = this.authService.hasRequiredRole(
      userId,
      PERMITTED_ROLES,
    );

    if (!hasPermission)
      throw new ForbiddenError(
        "You do not have permission to delete products!",
      );
    return await this.productRepository.delete(productId);
  }
}
