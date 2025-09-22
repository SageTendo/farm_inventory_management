import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create({
  isServer: true,
  transformer: {
    serialize: (data: unknown) => JSON.stringify(data),
    deserialize: (data: string) => JSON.parse(data),
  },
});

export const appRouter = t.router({
  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),
});

export type AppRouter = typeof appRouter;
