
'use client';
import { useEffect, useState } from 'react';

export default function WaitingRoom() {
  const [place, setPlace] = useState<number | null>(null);
  const [queueId, setQueueId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('queueId');
    setQueueId(q);
    const interval = setInterval(async () => {
      const res = await fetch(`/api/queue/status?queueId=${q}`);
      const data = await res.json();
      setPlace(data.placeInLine);
      if (data.status === 'connecting' || data.status === 'connected') {
        window.location.href = `/session?sessionId=${data.sessionId}`;
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  async function cancel() {
    await fetch('/api/queue/cancel', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ queueId }) });
    window.location.href = '/';
  }

  return (
    <div className="queue">
      <h1>Waiting Room</h1>
      <div className="small">You are in line to interview…</div>
      <div className="number">{place ?? '—'}</div>
      <button className="cta btn-secondary" onClick={cancel}>Cancel</button>
    </div>
  );
}
