import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type ICategory = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string(),
  stock: z.string(),
  shortDescription: z.string().min(10, {
    message: "Short description should be at least 10 characters long",
  }),
  description: z.string().min(100, {
    message: "Description should be at least 100 characters long",
  }),
});

export type IProduct = z.infer<typeof productSchema>;
