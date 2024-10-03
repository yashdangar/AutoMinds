import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import axios from 'axios';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}/download`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Accept': 'application/json',
      },
    });
    console.log(response.data);
    // {
    //     kind: 'drive#file',
    //     id: '1uHBW9Bd4O9W19iCq1Vc9riu5Gf4RuPmoCwnzU5cXYzo',
    //     name: 'zapy',
    //     mimeType: 'application/vnd.google-apps.document'
    //   }
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
