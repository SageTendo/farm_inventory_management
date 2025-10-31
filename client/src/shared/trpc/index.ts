import { initTRPC } from "@trpc/server";
import { ServiceRegistry } from "../../main/service";
import { authRouter } from "./auth.rpc";
import { userRouter } from "./user.rpc";
import { productRouter } from "./product.rpc";

const serviceRegistry = ServiceRegistry.getInstance();

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
  auth: authRouter(serviceRegistry.resolve("authService")),
  user: userRouter(serviceRegistry.resolve("userService")),
  product: productRouter(serviceRegistry.resolve("productService")),
});

export type AppRouter = typeof appRouter;
