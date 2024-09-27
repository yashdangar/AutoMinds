import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const drive = google.drive({ version: 'v3', auth });

  const result = await drive.files.list({
    pageSize: 10,
    fields: 'files(id, name)',
  });

  return new Response(JSON.stringify(result.data.files), { status: 200 });
}
