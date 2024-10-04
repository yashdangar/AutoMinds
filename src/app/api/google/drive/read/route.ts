import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(req: Request) {

  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  // }

  const data = await req.json();
  const fileId = data.fileId;

  if (!fileId) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: "ya29.a0AcM612zOldin1W8URTQ-7sg-xxC0q-fRSatHGzSoFnO5XN1gB8WtGmtyEFm9xZMRvn5uJ-sMbAx-cop52Z-_TrP-rVKgVBke6YqtA-wZXb6tUYmW8Gex0QoozPfshUzJc1D454W_8LPVxd1rrskkjJtv7tbH4sg-VohYDsf8aCgYKAaYSARISFQHGX2MivRbNwMbFYJ9CQauutja0zw0175" });

  try {
    const drive = google.drive({ version: 'v3', auth });

    const file = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });

    const content = file.data;

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
