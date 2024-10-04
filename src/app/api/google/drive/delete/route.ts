import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions";

export async function DELETE(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.googleAccessToken) {
//     return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//   }

  const data = await req.json();
  const fileId = data.fileId;

  if (!fileId) {
    return new Response(JSON.stringify({ error: 'File ID is required' }), { status: 400 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token:"ya29.a0AcM612z10RpjG9ydVP3sWk7zLWfTLLwvw-63uew6s_pJ41y9ldsTt2z_4gQCPra10k1s3DxCDFIAiHBxjIdk_Icirb-U4SUSvSZe5ney4kVXQoUCF5PTdm4hQZd2s9GyevHxJPr2fDmuK9IVS__IdFxx1S6aEXvFozQBfba6aCgYKAQcSARISFQHGX2Miqig8BprUErmWF8mkDssbPw0175"   });

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
