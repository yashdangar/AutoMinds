// app/api/webhook/drive/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();

  // Process the received data
  console.log('Received webhook data:', data);

  // Respond back to acknowledge receipt
  return NextResponse.json({ message: 'Webhook received successfully' });
}
