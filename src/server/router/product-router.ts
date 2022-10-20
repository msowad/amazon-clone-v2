import { Prisma, Product } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { stringToSlug } from "utils";
import { productSchema } from "utils/validation";
import * as z from "zod";
import { createProtectedRouter, createRouter } from "./context";

const categories = z.array(
  z.object({
    name: z.string(),
  })
);

export const adminProductRouter = createProtectedRouter()
  .mutation("create", {
    input: productSchema.extend({ categories }),
    async resolve({ input, ctx }) {
      const entry = await ctx.prisma.product.findFirst({
        where: { name: input.name },
      });
      if (entry) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product already exists in database",
        });
      }
      await ctx.prisma.product.create({
        data: {
          name: input.name,
          slug: stringToSlug(input.name),
          description: input.description,
          shortDescription: input.shortDescription,
          price: parseInt(input.price),
          stock: parseInt(input.stock),
          categories: {
            connect: input.categories,
          },
        },
      });
      return { status: 201, message: "Product created successfully" };
    },
  })
  .mutation("update", {
    input: productSchema.extend({
      id: z.string(),
      categories,
      disSelectedCategories: categories,
    }),
    async resolve({ input, ctx }) {
      const entry = await ctx.prisma.product.findFirst({
        where: { name: input.name, NOT: { id: input.id } },
      });
      if (entry) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product already exists in database",
        });
      }
      await ctx.prisma.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          slug: stringToSlug(input.name),
          description: input.description,
          shortDescription: input.shortDescription,
          price: parseInt(input.price),
          stock: parseInt(input.stock),
          categories: {
            connect: input.categories,
            disconnect: input.disSelectedCategories,
          },
        },
      });
      return { status: 200, message: "Product updated successfully" };
    },
  })
  .mutation("delete", {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.product.delete({ where: { id: input } });
    },
  });

export type ProductResponse = Product & {
  categories: {
    name: string;
    slug: string;
    id: string;
  }[];
};

export const productRouter = createRouter()
  .query("getAll", {
    input: z.object({
      page: z.number(),
      limit: z.number(),
      orderBy: z.string(),
      sortOrder: z.enum(["desc", "asc"]),
      query: z.string(),
    }),
    async resolve({ input, ctx }) {
      const where: Prisma.ProductWhereInput = {
        OR: [
          {
            name: {
              contains: input.query,
            },
          },
          {
            shortDescription: {
              contains: input.query,
            },
          },
          {
            description: {
              contains: input.query,
            },
          },
          {
            categories: {
              some: {
                name: {
                  contains: input.query,
                },
              },
            },
          },
        ],
      };

      return await ctx.prisma.$transaction([
        ctx.prisma.product.count({ where }),
        ctx.prisma.product.findMany({
          skip: (input.page - 1) * input.limit,
          take: input.limit,
          orderBy: {
            [input.orderBy]: input.sortOrder,
          },
          include: {
            categories: {
              select: {
                id: true,
                slug: true,
                name: true,
              },
            },
          },
          where,
        }),
      ]);
    },
  })
  .query("get", {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.product.findFirst({
        where: { slug: input },
        select: {
          categories: {
            select: {
              name: true,
            },
          },
          id: true,
          name: true,
          price: true,
          stock: true,
          shortDescription: true,
          description: true,
        },
      });
    },
  });
