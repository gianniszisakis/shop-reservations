import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        if (
          typeof username !== "string" ||
          typeof password !== "string" ||
          !username ||
          !password
        ) {
          return null;
        }

        /*
         * Local development:
         * use the credentials from .env.local
         */
        if (process.env.NODE_ENV === "development") {
          if (
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD
          ) {
            return {
              id: "local-admin",
              name: "Admin",
            };
          }

          return null;
        }

        /*
         * Production:
         * authenticate against the User table
         */
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user || !user.isActive) {
          return null;
        }

        const validPassword = await verifyPassword(password, user.passwordHash);

        if (!validPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.username,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
});
