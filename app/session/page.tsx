
'use client';
import { useEffect, useState } from 'react';

export default function SessionPage() {
  const [token, setToken] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string>('');

  useEffect(() => {
    async function fetchToken() {
      const res = await fetch('/api/video/token', { method:'POST' });
      const data = await res.json();
      setToken(data.token);
      setRoomName(data.roomName || 'demo-room');
    }
    fetchToken();
  }, []);

  return (
    <div>
      <h1>Interview Session</h1>
      <p className="small">Token (dev): {token ? token.slice(0, 20) + '…' : 'requesting…'}</p>
      <p className="small">Room: {roomName}</p>
      <div className="card">Embed your video component here (Twilio Video / WebRTC)</div>
    </div>
  );
}
