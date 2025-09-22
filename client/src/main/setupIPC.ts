import { BrowserWindow } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { appRouter } from "../shared/ipc";

let ipcHandler: ReturnType<typeof createIPCHandler> | undefined;

export function attachWindow(window: BrowserWindow): void {
  if (!ipcHandler) {
    ipcHandler = createIPCHandler({
      router: appRouter,
      windows: [window],
    });
  } else {
    ipcHandler.attachWindow(window);
  }
}

export function detachWindow(window: BrowserWindow): void {
  if (!ipcHandler) return;
  ipcHandler.detachWindow(window);
}
