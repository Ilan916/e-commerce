import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";

// Définition d'un type personnalisé pour l'utilisateur
interface CustomUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string; // Ou "Role" si tu utilises un enum pour les rôles
}

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

        // Vérification si l'utilisateur existe et si le mot de passe est correct
        if (user && user.password && await bcrypt.compare(credentials.password, user.password)) {
          // Retour de l'utilisateur avec les propriétés nécessaires et un type explicite
          return {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
          } as CustomUser; // Utilisation du type CustomUser pour correspondre aux attentes
        }

        return null; // Connexion échouée
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ajout des informations supplémentaires à la session
      session.user.id = token.id as string;
      session.user.firstname = token.firstname as string;
      session.user.lastname = token.lastname as string;
      session.user.role = token.role as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Ajout des informations de l'utilisateur au JWT
        token.id = user.id as string;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.role = user.role; // Récupération du rôle
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/connexion",
    signOut: "/deconnexion",
    error: "/erreur",
    verifyRequest: "/verification",
    newUser: "/nouveau-compte",
  },
};

