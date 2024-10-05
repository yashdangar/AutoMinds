import { google } from "googleapis";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  createFile,
  deleteFile,
  getAllfiles,
  readFile,
  updateFile
} from "../google/drive/index"
import {
  addLabel, removeLabel,
  createLabel,
  deleteEmail,
  searchEmails,
  sendEmail,
  createAndSendDraftEmail
} from "../google/gmail/index"

async function getGoogleInstance() {
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

export { createFile, deleteFile, getAllfiles, readFile, updateFile, addLabel, removeLabel, createLabel, deleteEmail, searchEmails, sendEmail, createAndSendDraftEmail,getGoogleInstance };