import NextAuth, { type NextAuthOptions } from "next-auth";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verify } from "argon2";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "server/db/client";
import { loginSchema } from "utils/validation/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email },
        });
        if (!user) {
          throw new Error("Enter valid email and password");
        }

        const isValidPassword = await verify(user.password, password);
        if (!isValidPassword) {
          throw new Error("Enter valid email and password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user == token.user;
      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 60 * 60, //15 days,
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

export default NextAuth(authOptions);
