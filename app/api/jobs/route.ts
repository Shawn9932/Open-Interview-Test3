
import { NextResponse } from 'next/server';
import { Store } from '@/lib/queue';

export async function GET() {
  return NextResponse.json({ jobs: Store.jobs });
}
