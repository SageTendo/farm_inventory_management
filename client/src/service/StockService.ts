import { IStockRepository } from "../database/interfaces/IStockRepository";
import { RoleType } from "../database/schema/constants";
import { StockDTO, UpdateStockDTO } from "../database/schema/types";
import { IAuthService } from "./interfaces/IAuthService";
import { IStockService } from "./interfaces/IStockService";

const PERMITTED_ROLES: RoleType[] = ["ADMIN", "OWNER"];

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

  async getById(stockId: number): Promise<StockDTO | null> {
    return this.stockRepository.getById(stockId);
  }

  async setQuantity(
    userId: number,
    stockId: number,
    entity: UpdateStockDTO
  ): Promise<StockDTO | null> {
    const hasPermission = this.authSerivce.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new Error("You do not have permission to update the quantity!");
    return await this.stockRepository.update(stockId, entity);
  }

  async setThreshold(
    userId: number,
    stockId: number,
    entity: UpdateStockDTO
  ): Promise<StockDTO | null> {
    const hasPermission = this.authSerivce.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new Error(
        "You do not have permission to update the low stock threshold!"
      );
    return await this.stockRepository.update(stockId, entity);
  }

  async decrementStock(
    stockId: number,
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
  delete(userId: number, stockId: number): Promise<void> {
    const hasPermission = this.authSerivce.hasRequiredRole(
      userId,
      PERMITTED_ROLES
    );
    if (!hasPermission)
      throw new Error("You do not have permission to delete this stock!");
    return this.stockRepository.delete(stockId);
  }
}
