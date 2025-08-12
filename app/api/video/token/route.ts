
import { NextResponse } from 'next/server';

export async function POST() {
  const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET } = process.env as Record<string, string | undefined>;
  const roomName = 'open-interview-demo';
  if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY_SID || !TWILIO_API_KEY_SECRET) {
    return NextResponse.json({ token: 'mock-dev-token', roomName, note: 'Provide Twilio env vars for real token minting.' });
  }
  // Implement real Twilio AccessToken minting here when you're ready.
  return NextResponse.json({ token: 'TODO: implement real Twilio AccessToken', roomName });
}
