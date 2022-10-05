import slugify from "slugify";
import { categorySchema } from "utils/validation";
import { createProtectedRouter } from "./context";

export const adminRouter = createProtectedRouter()
  .mutation("createCategory", {
    input: categorySchema,
    async resolve({ input, ctx }) {
      await ctx.prisma.category.create({
        data: {
          name: input.name,
          slug: slugify(input.name, { lower: true }),
        },
      });
      return { status: 201, message: "Category created successfully" };
    },
  })
  .query("categories", {
    async resolve({ input, ctx }) {
      const data = await ctx.prisma.category.findMany();
      return data;
    },
  });
