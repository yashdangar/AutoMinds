import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
      params: {
          scope : "openid email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
      },
      },
    })
    
    ,
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization:{
        params:{
            scope : "repo user gist notifications read:org"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // next-auth uses cookeis and store the token in the cookie , not in localstorage or sessionstorage
    async jwt({ token, account }:any) {
      // console.log("JWT CALLBACK", token, account);
      if (account) {
        if(account?.provider==="google"){
          token.googleAccessToken = account.access_token;
        }else if(account?.provider==="github"){
          token.githubAccessToken = account.access_token;
        }
      }
      return token;
    },
    async session({ session, token }:any) {
      // console.log("SESSION CALLBACK", session, token);
      session.googleAccessToken = token.googleAccessToken;
      session.githubAccessToken = token.githubAccessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };