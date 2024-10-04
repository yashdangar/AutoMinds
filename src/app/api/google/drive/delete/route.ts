import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.googleAccessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const data = await req.json();
  const fileId = data.fileId;

  if (!fileId) {
    return new Response(JSON.stringify({ error: 'File ID is required' }), { status: 400 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token:session.accessToken  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    await drive.files.delete({
      fileId: fileId,
    });
    
    return new Response(JSON.stringify({ message: 'File deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting file:');
    return new Response(JSON.stringify({ error: 'Failed to delete file' }), { status: 500 });
  }
}
