import React, { useState, useEffect } from 'react';
import { addDocument, getDocumentCount, getDocument } from '../contract/contract';

export default function Document() {
  const [uri, setUri] = useState('');
  const [docs, setDocs] = useState([]);

  const loadDocs = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const count = await getDocumentCount();
    const list = [];
    for (let i = 1; i <= count; i++) {
      const [id, u, upl] = await getDocument(i);
      list.push({ id: id.toNumber ? id.toNumber() : id, uri: u, uploader: upl });
    }
    setDocs(list);
  };

  useEffect(() => { loadDocs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDocument(uri);
    setUri('');
    await loadDocs();
  };

  return (
    <div>
      <h2>Documents</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Document URI" value={uri} onChange={e => setUri(e.target.value)} required />
        <button type="submit">Add Document</button>
      </form>
      <ul>
        {docs.map(d => (
          <li key={d.id}>{d.id}: {d.uri} ({d.uploader})</li>
        ))}
      </ul>
    </div>
  );
}