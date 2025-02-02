import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/zod";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // console.log(credentials);
        const { data, success } = LoginSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Invalid credentials");
        }
        // verificando si el usuarioe existe
        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        // verificando si la contraseña es correcta
        if (!user.password) {
          throw new Error("Invalid credentials");
        }
        // bycrypt hachea y compara la contraseña del usuario
        const isPasswordValid = bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
        // devuelve el usuario si todo sale correctamente
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
