
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";

import clientPromise from "@/lib/mongodb";

const loginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8 hours
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Admin Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const admin = await db.collection("users").findOne({
          email: email.toLowerCase(),
          role: "admin",
          isActive: true,
        });

        if (!admin || typeof admin.passwordHash !== "string") {
          return null;
        }

        const passwordMatches = await compare(
          password,
          admin.passwordHash,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: "admin",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
});
