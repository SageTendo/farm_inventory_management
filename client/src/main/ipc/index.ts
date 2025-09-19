import { IPC } from "./IPC";

/**
 * Singleton class to manage and register IPC handlers.
 * Ensures that only one instance of the registry exists.
 * Provides methods to register and retrieve IPC handlers.
 *
 * Usage:
 * const serviceRegistry = ServiceRegistry.getInstance();
 * const ipcRegistry = IPCRegistry.getInstance();
 * ipcRegistry.registerHandler(new MyIPC(serviceRegistry));
 */
export class IPCRegistry {
  private static instance: IPCRegistry;
  private handlers: IPC[] = [];

  private constructor() {
    this.handlers = [];
  }

  public static getInstance(): IPCRegistry {
    if (!IPCRegistry.instance) {
      IPCRegistry.instance = new IPCRegistry();
    }
    return IPCRegistry.instance;
  }

  public registerHandler(handler: IPC): IPCRegistry {
    this.handlers.push(handler);
    return this;
  }

  public getHandlers(): IPC[] {
    return this.handlers;
  }

  public getHandlerByName(name: string): IPC | undefined {
    return this.handlers.find((handler) => handler.constructor.name === name);
  }
}
