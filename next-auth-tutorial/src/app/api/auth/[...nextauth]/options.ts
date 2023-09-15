import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const config: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username',
        },
        password: {
          label: 'Password:',
          type: 'Password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        const user = { id: '42', name: 'chan', password: 'nextauth' }

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        )
          return user

        return null
      },
    }),
  ],
}
