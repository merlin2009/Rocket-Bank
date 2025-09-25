'use client';
import { useState } from 'react';

export default function P2PPage() {
  const [token, setToken] = useState('REPLACE_TOKEN');
  const [data, setData] = useState<any>({});

  async function fetchJson(url: string) {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    setData((prev: any) => ({ ...prev, [url]: j }));
  }

  return (
    <div>
      <h2>P2P</h2>
      <input value={token} onChange={(e) => setToken(e.target.value)} style={{ width: 400 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => fetchJson('http://localhost:4000/p2p/bisq/listings')}>Bisq Listings</button>
        <button onClick={() => fetchJson('http://localhost:4000/p2p/hodlhodl/offers')} style={{ marginLeft: 8 }}>HodlHodl Offers</button>
        <button onClick={() => fetchJson('http://localhost:4000/p2p/icard/cards')} style={{ marginLeft: 8 }}>iCard Cards</button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

