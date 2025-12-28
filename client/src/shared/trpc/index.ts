import { initTRPC, TRPCError } from "@trpc/server";
import { ServiceRegistry } from "../../main/service";
import { authRouter } from "./auth.rpc";
import { userRouter } from "./user.rpc";
import { productRouter } from "./product.rpc";
import { ForbiddenError, NotFoundError, UnauthorizedError, ConflictError } from "../../lib/error";

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

export const handleError = (err: Error) => {
  if (err instanceof ForbiddenError) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: err.message,
      cause: err,
    });
  } else if (err instanceof NotFoundError) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: err.message,
      cause: err,
    });
  } else if (err instanceof UnauthorizedError) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: err.message,
      cause: err,
    });
  } else if (err instanceof ConflictError) {
    throw new TRPCError({
      code: "CONFLICT",
      message: err.message,
      cause: err,
    });
  } else {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
      cause: err,
    });
  }
};
