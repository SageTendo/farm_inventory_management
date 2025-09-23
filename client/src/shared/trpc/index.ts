import { initTRPC } from "@trpc/server";
import { ServiceRegistry } from "../../main/service";
import { authRouter } from "./auth.rpc";
import { userRouter } from "./user.rpc";

const serivices = ServiceRegistry.getInstance();

const t = initTRPC.create({
  isServer: true,
  transformer: {
    serialize: (data: unknown) => JSON.stringify(data),
    deserialize: (data: string) => JSON.parse(data),
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  auth: authRouter(serivices.getService("authService")),
  user: userRouter(serivices.getService("userService")),
});

export type AppRouter = typeof appRouter;
