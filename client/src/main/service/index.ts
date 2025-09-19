import { UserRepository } from "../database/repository/UserRepository";
import { ProductRepository } from "../database/repository/ProductRepository";
import { StockRepository } from "../database/repository/StockRepository";
import { RoleRepository } from "../database/repository/RoleRepository";
import { ExchangeRateRepository } from "../database/repository/ExchangeRateRepository";

import { AuthService } from "../service/AuthService";
import { UserService } from "../service/UserService";
import { ProductService } from "../service/ProductService";
import { StockService } from "../service/StockService";
import { RoleService } from "../service/RoleService";
import { ExchangeRateService } from "../service/ExchangeRateService";

import { getDb } from "../database/db";
import { IUserRepository } from "../database/interfaces/IUserRepository";
import { IProductRepository } from "../database/interfaces/IProductRepository";
import { IStockRepository } from "../database/interfaces/IStockRepository";
import { IRoleRepository } from "../database/interfaces/IRoleRepository";
import { IExchangeRateRepository } from "../database/interfaces/IExchangeRateRepository";

interface ServiceRegister {
  authService: AuthService;
  userService: UserService;
  productService: ProductService;
  stockService: StockService;
  roleService: RoleService;
  exchangeRateService: ExchangeRateService;
  // Add other services here as needed
}

export class ServiceRegistry {
  private static instance: ServiceRegistry;
  public services: ServiceRegister;

  private constructor() {
    this.services = this.initializeServices();
  }

  private initializeServices(): ServiceRegister {
    const db = getDb();

    // Initialize repositories
    const userRepository: IUserRepository = new UserRepository(db);
    const productRepository: IProductRepository = new ProductRepository(db);
    const stockRepository: IStockRepository = new StockRepository(db);
    const roleRepository: IRoleRepository = new RoleRepository(db);
    const exchangeRateRepository: IExchangeRateRepository =
      new ExchangeRateRepository(db);

    // Initialize services with their respective repositories
    const authService = new AuthService(userRepository, roleRepository);
    const userService = new UserService(userRepository, roleRepository);
    const productService = new ProductService(authService, productRepository);
    const stockService = new StockService(authService, stockRepository);
    const roleService = new RoleService(roleRepository);
    const exchangeRateService = new ExchangeRateService(
      authService,
      exchangeRateRepository
    );

    return {
      authService,
      userService,
      productService,
      stockService,
      roleService,
      exchangeRateService,
      // Add other services here as needed
    };
  }

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  /**
   * Get a specific service by name
   */
  public getService<K extends keyof ServiceRegister>(
    serviceName: K
  ): ServiceRegister[K] {
    return this.services[serviceName];
  }

  /**
   * Replace a specific service (useful for testing/mocking)
   */
  public setService<K extends keyof ServiceRegister>(
    serviceName: K,
    serviceInstance: ServiceRegister[K]
  ): void {
    this.services[serviceName] = serviceInstance;
  }
}
