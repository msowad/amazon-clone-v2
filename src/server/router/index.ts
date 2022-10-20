// src/server/router/index.ts
import superjson from "superjson";
import { authRouter } from "./auth";
import { adminCategoryRouter, categoryRouter } from "./category-router";
import { createRouter } from "./context";
import { adminProductRouter, productRouter } from "./product-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("category.", categoryRouter)
  .merge("admin.category.", adminCategoryRouter)
  .merge("product.", productRouter)
  .merge("admin.product.", adminProductRouter);
// .merge("example.", exampleRouter)
// .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
