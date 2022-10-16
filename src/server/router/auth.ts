import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { registerSchema } from "utils/validation/auth";
import { createRouter } from "./context";

export const authRouter = createRouter().mutation("register", {
  input: registerSchema,
  async resolve({ input, ctx }) {
    const { name, email, password } = input;

    const user = await ctx.prisma.user.findFirst({ where: { email } });
    if (user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email has already taken",
      });
    }

    const hashedPassword = await hash(password);
    await ctx.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { status: 201, data: { email, password } };
  },
});
