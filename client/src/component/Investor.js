import React, { useState, useEffect } from 'react';
import { addInvestor, getInvestorCount, getInvestor } from '../contract/contract';

export default function Investor() {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');
  const [investors, setInvestors] = useState([]);

  const loadInvestors = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const count = await getInvestorCount();
    const list = [];
    for (let i = 1; i <= count; i++) {
      const [id, nm, wl] = await getInvestor(i);
      list.push({ id: id.toNumber ? id.toNumber() : id, name: nm, wallet: wl });
    }
    setInvestors(list);
  };

  useEffect(() => { loadInvestors(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInvestor(name, wallet);
    setName(''); setWallet('');
    await loadInvestors();
  };

  return (
    <div>
      <h2>Investors</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Wallet" value={wallet} onChange={e => setWallet(e.target.value)} required />
        <button type="submit">Add Investor</button>
      </form>
      <ul>
        {investors.map(inv => (
          <li key={inv.id}>{inv.id}: {inv.name} ({inv.wallet})</li>
        ))}
      </ul>
    </div>
  );
}
