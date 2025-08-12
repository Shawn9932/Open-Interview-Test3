
import { NextResponse } from 'next/server';
import { Store } from '@/lib/queue';

export async function POST() {
  if (Store.queue.length === 0) return NextResponse.json({ message: 'empty' });
  const next = Store.queue.shift()!;
  const sessionId = Store.uuid();
  next.status = 'connecting';
  next.sessionId = sessionId;
  Store.sessions.push({ sessionId, jobId: next.jobId, status: 'connecting' });
  return NextResponse.json({ sessionId, jobId: next.jobId });
}
