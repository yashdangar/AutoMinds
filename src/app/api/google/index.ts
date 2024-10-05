import { google } from "googleapis";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getGoogleInstance() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return null;

  const access_token = await prisma.accessToken.findUnique({
    where: {
      userId: user.id,
    },
  });

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: access_token?.GoogleAcessToken });

  const drive = google.drive({ version: "v3", auth });
  const gmail = google.gmail({ version: "v1", auth });

  return { user, drive, gmail };
}
