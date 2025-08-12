
// Simple in-memory queue & sessions.
// NOTE: This resets on redeploy. Use Redis for production.

export type QueueItem = {
  queueId: string;
  jobId: string;
  createdAt: number;
  status: 'waiting' | 'connecting' | 'connected';
  sessionId: string | null;
};

export type SessionItem = {
  sessionId: string;
  jobId: string;
  status: 'connecting' | 'connected';
};

const jobs = [
  { id: 'job_1', company: 'Sun Energy Insulation', title: 'Insulation Sales Rep', location: 'Remote', compensation: '$60k–$80k/yr', logoUrl: '' },
  { id: 'job_2', company: 'Caring Journey', title: 'Non-Emergency Driver', location: 'Orlando, FL', compensation: '$18–$22/hr', logoUrl: '' },
];

let queue: QueueItem[] = [];
let sessions: SessionItem[] = [];

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const Store: { jobs: typeof jobs; queue: typeof queue; sessions: typeof sessions; uuid: () => string } = {
  jobs,
  queue,
  sessions,
  uuid
};
