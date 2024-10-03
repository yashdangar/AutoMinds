import { authOptions } from "@/lib/authOptions"
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}

// export const authOptions : NextAuthOptions= {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       authorization: {
//         params: {
//           scope: 'openid email profile',
//         },
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//       authorization: {
//         params: {
//           scope: 'repo user gist notifications read:org',
//         },
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/auth/signin',
//   },
//   callbacks: {
//     async jwt({ token, account, profile }: any) {
//       if (account) {
//         if (account.provider === 'google') {
//           token.googleAccessToken = account.access_token;
//         } else if (account.provider === 'github') {
//           token.githubAccessToken = account.access_token;
//         }
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       session.googleAccessToken = token.googleAccessToken;
//       session.githubAccessToken = token.githubAccessToken;
//       // console.log(session.user.image);
//       return session;
//     },
//     async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
//       return baseUrl + '/dashboard';
//     },
//   },
// };
