import { ServiceRegistry } from "../service";

/**
 * Abstract base class for IPC handlers.
 * Automatically registers all methods that do not start with an underscore (_) as IPC handlers.
 * Methods starting with an underscore are considered private and will not be registered.
 */
export abstract class IPC {
  protected serviceRegister;
  constructor(serviceRegistry: ServiceRegistry) {
    this.serviceRegister = serviceRegistry;
    this.registerHandlers();
  }

  /**
   * Automatically registers all methods that do not start with an underscore (_) as IPC handlers.
   * Methods starting with an underscore are considered private and will not be registered.
   */
  protected registerHandlers(): void {
    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (
        key !== "constructor" &&
        typeof (this as any)[key] === "function" &&
        !key.startsWith("_")
      ) {
        (this as any)[key]();
      }
    }
  }
}
