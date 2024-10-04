import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions"


// THIS ROUTE IS FOR GETTING X NUMBER OF FILES THE FILES IN THE GOOGLE DRIVE
export async function POST(req: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  // }

  // here we will get number of files to be fetched from google drive
  const data = await req.json();
  console.log(data);
  
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: "ya29.a0AcM612z10RpjG9ydVP3sWk7zLWfTLLwvw-63uew6s_pJ41y9ldsTt2z_4gQCPra10k1s3DxCDFIAiHBxjIdk_Icirb-U4SUSvSZe5ney4kVXQoUCF5PTdm4hQZd2s9GyevHxJPr2fDmuK9IVS__IdFxx1S6aEXvFozQBfba6aCgYKAQcSARISFQHGX2Miqig8BprUErmWF8mkDssbPw0175" });

  const drive = google.drive({ version: 'v3', auth });

  const result = await drive.files.list({
    pageSize: 100,
    fields: 'files(id, name)',
  });

  return new Response(JSON.stringify(result.data.files), { status: 200 });
}
