'use client';
import { useState } from 'react';

export default function KycPage() {
  const [token, setToken] = useState('REPLACE_TOKEN');
  const [out, setOut] = useState<any>(null);

  async function create() {
    const r = await fetch('http://localhost:4000/users/kyc', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ fullName: 'Test User', country: 'BG' }) });
    setOut(await r.json());
  }
  async function approve() {
    const r = await fetch('http://localhost:4000/users/kyc/approve', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    setOut(await r.json());
  }
  async function reject() {
    const r = await fetch('http://localhost:4000/users/kyc/reject', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    setOut(await r.json());
  }

  return (
    <div>
      <h2>KYC</h2>
      <input value={token} onChange={(e) => setToken(e.target.value)} style={{ width: 400 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={create}>Create/Update</button>
        <button onClick={approve} style={{ marginLeft: 8 }}>Approve</button>
        <button onClick={reject} style={{ marginLeft: 8 }}>Reject</button>
      </div>
      <pre>{JSON.stringify(out, null, 2)}</pre>
    </div>
  );
}

