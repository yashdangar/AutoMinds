import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
      params: {
          scope: "openid email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
      },
      },
  })
  ,
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    authorization:{
      params:{
          scope:"repo user"
      }
    }
  }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
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


//Google
// JWT CALLBACK {
//   name: 'DEV ITALIYA 冬 16',
//   email: 'dev.kehs2@gajeratrust.org',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocJFdz8pANFbbsoxx-RCVPowErF30PC2FE-WNGLOQsUxyMnngeVZ=s96-c',
//   sub: '110088585457390638293',
//   accessToken: 'ya29.a0AcM612wRDHnPta1hnsMhY_ys-oAIYWtLzPRBZHCEQtF7KBCqydBzR0XURsnGhOvnFsOWFlmEVi9PfGsNI4s7Y0_rDkBjmKTPHf2yt9UIQoUQ23HS6UlcE4_EHEOB6Q86A4bWXalXBsectMTPfbBxsGzY2s6N-XuTRAi9FJOJaCgYKAWoSAQ4SFQHGX2Mi8csoCPtf2Td0brMq2KsuVg0175',
//   iat: 1727529265,
//   exp: 1730121265,
//   jti: 'd1a3bef7-887b-4611-a443-6066959ba881'
// } undefined

// SESSION CALLBACK {
//   user: {
//     name: 'DEV ITALIYA 冬 16',
//     email: 'dev.kehs2@gajeratrust.org',
//     image: 'https://lh3.googleusercontent.com/a/ACg8ocJFdz8pANFbbsoxx-RCVPowErF30PC2FE-WNGLOQsUxyMnngeVZ=s96-c'
//   },
//   expires: '2024-10-28T13:14:27.319Z'
// } {
//   name: 'DEV ITALIYA 冬 16',
//   email: 'dev.kehs2@gajeratrust.org',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocJFdz8pANFbbsoxx-RCVPowErF30PC2FE-WNGLOQsUxyMnngeVZ=s96-c',
//   sub: '110088585457390638293',
//   accessToken: 'ya29.a0AcM612wRDHnPta1hnsMhY_ys-oAIYWtLzPRBZHCEQtF7KBCqydBzR0XURsnGhOvnFsOWFlmEVi9PfGsNI4s7Y0_rDkBjmKTPHf2yt9UIQoUQ23HS6UlcE4_EHEOB6Q86A4bWXalXBsectMTPfbBxsGzY2s6N-XuTRAi9FJOJaCgYKAWoSAQ4SFQHGX2Mi8csoCPtf2Td0brMq2KsuVg0175',
//   iat: 1727529265,
//   exp: 1730121265,
//   jti: 'd1a3bef7-887b-4611-a443-6066959ba881'
// }


//Github
// JWT CALLBACK {
//   name: 'Dev Italiya',
//   email: 'devitaliya22@gmail.com',
//   picture: 'https://avatars.githubusercontent.com/u/132957942?v=4',
//   sub: '132957942',
//   accessToken: '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',
//   iat: 1727529341,
//   exp: 1730121341,
//   jti: 'af2851b9-d28b-4dcf-b818-91604592af19'
// } undefined
// SESSION CALLBACK {
//   user: {
//     name: 'Dev Italiya',
//     email: 'devitaliya22@gmail.com',
//     image: 'https://avatars.githubusercontent.com/u/132957942?v=4'
//   },
//   expires: '2024-10-28T13:15:44.846Z'
// } {
//   name: 'Dev Italiya',
//   email: 'devitaliya22@gmail.com',
//   picture: 'https://avatars.githubusercontent.com/u/132957942?v=4',
//   sub: '132957942',
//   accessToken: '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',
//   iat: 1727529341,
//   exp: 1730121341,
//   jti: 'af2851b9-d28b-4dcf-b818-91604592af19'
// }

// JWT CALLBACK {
//   name: 'Dev Italiya',
//   email: 'devitaliya22@gmail.com',
//   picture: 'https://avatars.githubusercontent.com/u/132957942?v=4',
//   sub: '132957942'
// } {
//   provider: 'github',
//   type: 'oauth',
//   providerAccountId: '132957942',
//   access_token: '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',
//   token_type: 'bearer',
//   scope: 'repo,user'
// }