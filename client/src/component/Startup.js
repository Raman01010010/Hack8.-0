import React, { useState, useEffect } from 'react';
import { addStartup, getStartupCount, getStartup } from '../contract/contract';

export default function Startup() {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [startups, setStartups] = useState([]);

  const loadStartups = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const count = await getStartupCount();
    const list = [];
    for (let i = 1; i <= count; i++) {
      const [id, nm, ow] = await getStartup(i);
      list.push({ id: id.toNumber ? id.toNumber() : id, name: nm, owner: ow });
    }
    setStartups(list);
  };

  useEffect(() => { loadStartups(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStartup(name, owner);
    setName(''); setOwner('');
    await loadStartups();
  };

  return (
    <div>
      <h2>Startups</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Owner Address" value={owner} onChange={e => setOwner(e.target.value)} required />
        <button type="submit">Add Startup</button>
      </form>
      <ul>
        {startups.map(s => (
          <li key={s.id}>{s.id}: {s.name} ({s.owner})</li>
        ))}
      </ul>
    </div>
  );
}