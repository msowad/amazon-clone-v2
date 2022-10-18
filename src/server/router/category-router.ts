import { TRPCError } from "@trpc/server";
import { stringToSlug } from "utils";
import { categorySchema } from "utils/validation";
import * as z from "zod";
import { createProtectedRouter, createRouter } from "./context";

export const adminCategoryRouter = createProtectedRouter()
  .mutation("create", {
    input: categorySchema,
    async resolve({ input, ctx }) {
      const entry = await ctx.prisma.category.findFirst({
        where: { name: input.name },
      });
      if (entry) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category already exists in database",
        });
      }
      await ctx.prisma.category.create({
        data: {
          name: input.name,
          slug: stringToSlug(input.name),
        },
      });
      return { status: 201, message: "Category created successfully" };
    },
  })
  .mutation("update", {
    input: categorySchema.extend({ id: z.string() }),
    async resolve({ input, ctx }) {
      const entry = await ctx.prisma.category.findFirst({
        where: { name: input.name, NOT: { id: input.id } },
      });
      if (entry) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category already exists in database",
        });
      }
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
  .mutation("delete", {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.category.delete({ where: { id: input } });
    },
  });

export const categoryRouter = createRouter()
  .query("getAll", {
    input: z.object({
      page: z.number(),
      limit: z.number(),
    }),
    async resolve({ input, ctx }) {
      const data = await ctx.prisma.$transaction([
        ctx.prisma.category.count(),
        ctx.prisma.category.findMany({
          skip: (input.page - 1) * input.limit,
          take: input.limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);
      return data;
    },
  })
  .query("get", {
    input: z.string(),
    async resolve({ input, ctx }) {
      const category = await ctx.prisma.category.findFirst({
        where: { slug: input },
      });
      return category;
    },
  });
