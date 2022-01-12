import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        // 로그인 로직
        const user = await prisma.users.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        if (user) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user, account, profile, isNewUser }) => {
      console.log("token", token);
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("isNewUser", isNewUser);

      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    redirect: ({ baseUrl }) => {
      return baseUrl;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
});
