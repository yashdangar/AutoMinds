import { google } from "googleapis";
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

  if (!session || !session.user?.email || !session.accessToken) {
    return null;
  }
  const access_token = session.accessToken;

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token });

  const drive = google.drive({ version: "v3", auth });
  const gmail = google.gmail({ version: "v1", auth });

  return { drive, gmail };
}

export { createFile, deleteFile, getAllfiles, readFile, updateFile, addLabel, removeLabel, createLabel, deleteEmail, searchEmails, sendEmail, createAndSendDraftEmail,getGoogleInstance };