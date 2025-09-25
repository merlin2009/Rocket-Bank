'use client';
import { useState } from 'react';

export default function AIPage() {
  const [q, setQ] = useState('');
  const [ans, setAns] = useState<any>(null);

  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  async function ask() {
    const resp = await fetch(`${base}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer REPLACE_TOKEN' },
      body: JSON.stringify({ messages: [{ role: 'user', content: q }] })
    });
    setAns(await resp.json());
  }

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask AI..." />
      <button onClick={ask}>Ask</button>
      <pre>{JSON.stringify(ans, null, 2)}</pre>
    </div>
  );
}

