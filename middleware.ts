import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

//  esta es una expresion regular para definir que rutas estan protegidas
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
// In your Next.js middleware or API route
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
