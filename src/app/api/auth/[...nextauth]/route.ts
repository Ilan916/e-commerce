// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

// Crée un handler pour NextAuth
const handler = NextAuth(authOptions);

///zaz
// Exporte les méthodes GET et POST
export { handler as GET, handler as POST };
