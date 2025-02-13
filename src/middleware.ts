import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Vérifie si l'utilisateur est connecté
  if (!token) {
    return NextResponse.redirect(new URL("/connexion", req.url));
  }

  // Protection des pages admin
  if (req.nextUrl.pathname.startsWith("/dashboard-admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Appliquation le middleware uniquement aux routes admin
export const config = {
  matcher: ["/dashboard-admin/:path*"], // Toutes les pages sous "/dashboard-admin/"
};
