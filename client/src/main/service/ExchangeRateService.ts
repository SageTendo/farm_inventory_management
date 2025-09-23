import { NewExchangeRateDTO, ExchangeRateDTO } from "../../shared/dto/exchangeRate";
import { IExchangeRateRepository } from "../database/interfaces/IExchangeRateRepository";
import { UserRoleType } from "../../shared/types";
import { IAuthService } from "./interfaces/IAuthService";
import { IExchangeRateService } from "./interfaces/IExchangeRateService";

const PERMITTED_ROLES: UserRoleType[] = ["ADMIN", "OWNER"];

export class ExchangeRateService implements IExchangeRateService {
  private authService: IAuthService;
  private exchangeRateRepo: IExchangeRateRepository;

  constructor(
    authService: IAuthService,
    exchangeRateRepository: IExchangeRateRepository
  ) {
    this.authService = authService;
    this.exchangeRateRepo = exchangeRateRepository;
  }

  async set(data: NewExchangeRateDTO): Promise<ExchangeRateDTO> {
    const hasPermission = this.authService.hasRequiredRole(
      data.updatedBy,
      PERMITTED_ROLES
    );

    if (!hasPermission)
      throw Error("You do not have permission to change the exchange rate!");
    return await this.exchangeRateRepo.set(data);
  }

  async getAll(limit?: number, offset?: number): Promise<ExchangeRateDTO[]> {
    return await this.exchangeRateRepo.getAll(limit, offset);
  }

  async getById(exchangeRateId: string): Promise<ExchangeRateDTO | null> {
    return await this.exchangeRateRepo.getById(exchangeRateId);
  }
}
