import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import axios from 'axios';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) { 
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch the list of messages
    const messagesResponse = await axios.get(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages',
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        params: {
          maxResults: 10, // Adjust the number of emails to fetch
        },
      }
    );

    const messages = messagesResponse.data.messages || [];

    // Fetch the content of each message
    const emails = await Promise.all(
      messages.map(async (message: any) => {
        const emailResponse = await axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        return emailResponse.data;
      })
    );

    return NextResponse.json(emails);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}
