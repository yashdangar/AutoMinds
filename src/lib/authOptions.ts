import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import prisma from "./db";

export const authOptions : AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/drive',
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'repo user gist notifications read:org',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        if (account.provider === 'google') {
          token.googleAccessToken = account.access_token;
          console.log(token.googleAccessToken)
        } else if (account.provider === 'github') {
          token.githubAccessToken = account.access_token;
          console.log(token.googleAccessToken)
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.googleAccessToken = token.googleAccessToken;
      session.githubAccessToken = token.githubAccessToken;
      // console.log(session.user.image);
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl + '/connections';
    },
  },
};