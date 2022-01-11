import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

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
      authorize: (credentials) => {
        // 로그인 로직
        // if (
        //   credentials?.username === "john" &&
        //   credentials?.password === "test"
        // ) {
        //   return {
        //     id: 2,
        //     name: "chan",
        //     email: "example@example.com",
        //   };
        // }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
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
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
});
