
import { NextResponse } from 'next/server';
import { Store } from '@/lib/queue';

export async function POST(req: Request) {
  const { queueId } = await req.json();
  Store.queue = Store.queue.filter((q) => q.queueId !== queueId);
  return NextResponse.json({ ok: true });
}
