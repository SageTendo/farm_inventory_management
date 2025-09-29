import { createTRPCProxyClient } from "@trpc/client";
// eslint-disable-next-line import/no-unresolved
import { ipcLink } from "electron-trpc/renderer";
import { AppRouter } from ".";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
  transformer: {
    serialize: (data: unknown) => JSON.stringify(data),
    deserialize: (data: string) => JSON.parse(data),
  },
});
