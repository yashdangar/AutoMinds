// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import Github from "next-auth/providers/github";

// // next-uath mainly takes 3 parameters => providers ( array ), secret (string), callbacks (object)


// export const {signIn, signOut, auth , handler } = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//             authorization: {
//             params: {
//                 scope: "openid email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
//             },
//             },
//         })
//         ,
//         Github({
//             clientId: process.env.GITHUB_CLIENT_ID as string,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//             authorization: {
//                 params: {
//                     scope: "repo gist user notifications"
//                 }
//             }
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks : {

//     }
// });