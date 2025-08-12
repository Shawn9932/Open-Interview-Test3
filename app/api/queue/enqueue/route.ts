
import { NextResponse } from 'next/server';
import { Store } from '@/lib/queue';

export async function POST(req: Request) {
  const { jobId } = await req.json();
  if (!jobId) return NextResponse.json({ error: 'jobId required' }, { status: 400 });
  const queueId = Store.uuid();
  Store.queue.push({ queueId, jobId, createdAt: Date.now(), status: 'waiting', sessionId: null });
  return NextResponse.json({ queueId });
}
