import { StockDTO, UpdateStockDTO } from "../../shared/dto/stock";
import { IStockRepository } from "../database/interfaces/IStockRepository";
import { UserRoleType } from "../../shared/types";
import { IAuthService } from "./interfaces/IAuthService";
import { IStockService } from "./interfaces/IStockService";
import { ForbiddenError } from "../../lib/error";

const PERMITTED_ROLES: UserRoleType[] = ["ADMIN", "OWNER"];

export class StockService implements IStockService {
  private authSerivce: IAuthService;
  private stockRepository: IStockRepository;

  constructor(authService: IAuthService, stockRepository: IStockRepository) {
    this.authSerivce = authService;
    this.stockRepository = stockRepository;
  }

  async getAll(limit?: number, offset?: number): Promise<StockDTO[]> {
    return this.stockRepository.getAll(limit, offset);
  }

  async getById(stockId: string): Promise<StockDTO | null> {
    return this.stockRepository.getById(stockId);
  }

  async setQuantity(
    userId: string,
    stockId: string,
    entity: UpdateStockDTO
  ): Promise<StockDTO | null> {
    const hasPermission = this.authSerivce.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new ForbiddenError("You do not have permission to update the quantity!");
    return await this.stockRepository.update(stockId, entity);
  }

  async setThreshold(
    userId: string,
    stockId: string,
    entity: UpdateStockDTO
  ): Promise<StockDTO | null> {
    const hasPermission = this.authSerivce.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new ForbiddenError(
        "You do not have permission to update the low stock threshold!"
      );
    return await this.stockRepository.update(stockId, entity);
  }

  async decrementStock(
    stockId: string,
    value: number
  ): Promise<UpdateStockDTO> {
    const stock = await this.stockRepository.getById(stockId);
    if (!stock) throw new Error("No stock entry found for this product!");
    if (stock.quantity < value)
      throw new Error(
        "Stock quantity is less that the amount being decremented!"
      );

    return await this.stockRepository.update(stockId, {
      quantity: stock.quantity - value,
    });
  }
  delete(userId: string, stockId: string): Promise<void> {
    const hasPermission = this.authSerivce.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new ForbiddenError("You do not have permission to delete this stock!");
    return this.stockRepository.delete(stockId);
  }
}
