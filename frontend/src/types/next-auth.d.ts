import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    access: string;
    role?: string;
    refresh: string;
    username?: string;
    redirect?: string;
    message?: string;
    posisi?: string;
    is_superuser?: boolean;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    user: {
      username?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      redirect?: string;
      message?: string;
      role?: string;
      posisi?: string;
      is_superuser?: boolean;
    };
  }
}
