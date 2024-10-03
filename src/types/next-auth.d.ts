import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    googleAccessToken?: string;
    githubAccessToken?: string;
    googleDriveAccessToken?: string;
    googleMailAccessToken?: string;
    DiscordAccessToken?: string;
    SlackAccessToken?: string;
    NotionAccessToken?: string;
  }
  interface JWT {
    accessToken?: string;
    googleAccessToken?: string;
    githubAccessToken?: string;
    googleDriveAccessToken?: string;
    googleMailAccessToken?: string;
    DiscordAccessToken?: string;
    SlackAccessToken?: string;
    NotionAccessToken?: string;
  }
}
