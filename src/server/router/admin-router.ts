import { categorySchema } from "utils/validation";
import { createProtectedRouter } from "./context";

export const adminRouter = createProtectedRouter().mutation("createCategory", {
  input: categorySchema,
  async resolve({ input, ctx }) {
    await ctx.prisma.category.create({ data: input });
    return { status: 201, message: "Category created successfully" };
  },
});
