import slugify from "slugify";
import { stringToSlug } from "utils";
import { trpc } from "utils/trpc";
import { categorySchema } from "utils/validation";
import * as z from "zod";
import { createProtectedRouter } from "./context";

export const adminRouter = createProtectedRouter()
  .mutation("createCategory", {
    input: categorySchema,
    async resolve({ input, ctx }) {
      await ctx.prisma.category.create({
        data: {
          name: input.name,
          slug: stringToSlug(input.name),
        },
      });
      return { status: 201, message: "Category created successfully" };
    },
  })
  .mutation("updateCategory", {
    input: categorySchema.extend({ id: z.string() }),
    async resolve({ input, ctx }) {
      await ctx.prisma.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          slug: stringToSlug(input.name),
        },
      });
      return { status: 200, message: "Category updated successfully" };
    },
  })
  .query("categories", {
    async resolve({ input, ctx }) {
      const data = await ctx.prisma.category.findMany();
      return data;
    },
  })
  .query("category", {
    input: z.string(),
    async resolve({ input, ctx }) {
      const category = await ctx.prisma.category.findFirst({
        where: { slug: input },
      });
      return category;
    },
  });
