// eslint-disable-next-line import/no-unresolved
import { exposeElectronTRPC } from "electron-trpc/main";

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
require("electron");

process.once("loaded", async () => {
  exposeElectronTRPC();
});
