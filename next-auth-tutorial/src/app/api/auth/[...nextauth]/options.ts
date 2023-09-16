import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'

export const config: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'your-cool-email',
        },
        password: {
          label: 'Password:',
          type: 'Password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) return null

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        })

        if (!user) return null

        // verify password

        return {
          ...user,
          password: undefined,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role

      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role

      return session
    },
  },
}
