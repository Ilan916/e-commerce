import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      role: string;
      phoneNumber: string;
      address: string;
    };
  }

  interface User {
    id: string;
    firstname: string;
    lastname: string;
    role: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstname: string;
    lastname: string;
    role: string;
  }
}
