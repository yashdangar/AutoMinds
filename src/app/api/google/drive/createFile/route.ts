import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.googleAccessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const data = await req.json();
  console.log(data); // data.name , data.body , data.mimeType
//   {
    // "name":"teststt",
    // "mimeType":"text/plain",
    // "body":"devv"
// }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: data.name,
    fields : "id"
  };

  //here MimeTypes are defined in _types/mimeType.ts , WIP : validate the mimeType
  const media = {
    mimeType: data.mimeType,
    body: data.body,
  };

  try {
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('Text File ID:', file);

    return new Response(JSON.stringify({  file }), { status: 200 });
  } catch (error) {
    // console.error('Error creating text file:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to create file'}), { status: 500 });
  }
}
