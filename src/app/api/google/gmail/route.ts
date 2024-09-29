import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const gmail = google.gmail({ version: 'v1', auth });

  const { raw } = await req.json();

  const result = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });

  return new Response(JSON.stringify(result.data), { status: 200 });
}
