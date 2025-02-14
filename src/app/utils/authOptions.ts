// src/app/utils/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email et mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe sont requis.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role, // ✅ Ajout du rôle ici
          };
        }

        return null; // Connexion échouée
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.firstname = token.firstname as string;
      session.user.lastname = token.lastname as string;
      session.user.role = token.role as string; // ✅ Ajout du rôle dans la session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.role = user.role; // ✅ Ajout du rôle dans le JWT
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret",
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/connexion",
    signOut: "/deconnexion",
    error: "/erreur",
    verifyRequest: "/verification",
    newUser: "/nouveau-compte",
  },
};
