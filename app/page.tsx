
'use client';
import { useEffect, useState } from 'react';

type Job = { id: string; company: string; title: string; location: string; compensation?: string; logoUrl?: string };

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getJobs();
  }, []);

  async function enqueue(jobId: string) {
    const res = await fetch('/api/queue/enqueue', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId })
    });
    const data = await res.json();
    if (data.queueId) {
      window.location.href = `/waiting-room?queueId=${data.queueId}`;
    }
  }

  return (
    <div>
      <h1 style={{marginTop:12}}>Instant Interview Feed</h1>
      <p className="small">Scroll jobs and tap to interview now.</p>
      <div className="feed">
        {loading && <div className="center">Loading jobs…</div>}
        {!loading && jobs.length === 0 && <div className="center">No active jobs yet.</div>}
        {jobs.map((job) => (
          <div className="card" key={job.id}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <img className="logo" src={job.logoUrl || '/logo.svg'} alt={job.company}/>
              <div>
                <div className="badge">Actively Interviewing</div>
                <div className="title">{job.title}</div>
                <div className="meta">{job.company} • {job.location} • {job.compensation}</div>
              </div>
            </div>
            <button className="cta" onClick={() => enqueue(job.id)}>Tap to Interview Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
