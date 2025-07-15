import React, { useEffect, useState } from 'react';

function WhatIfPage() {
  const [subs, setSubs] = useState([]);
  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/subscriptions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setSubs(data.map(s => ({ name: s.name, cost: s.cost, active: true }))))
      .catch(() => setSubs([]));
  }, []);

  const handleToggle = idx => {
    setSubs(subs => subs.map((s, i) => i === idx ? { ...s, active: !s.active } : s));
  };
  const handleAdd = e => {
    e.preventDefault();
    if (!newName || !newCost) return;
    setSubs(subs => [...subs, { name: newName, cost: parseFloat(newCost), active: true }]);
    setNewName('');
    setNewCost('');
  };
  const total = subs.filter(s => s.active).reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="whatif-page">
      <h1>What-If Scenarios</h1>
      <div style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
        <b>Current Monthly Spend:</b> ${total}
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Toggle Subscriptions</h3>
        {subs.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.7rem' }}>
            <label>
              <input type="checkbox" checked={s.active} onChange={() => handleToggle(i)} />
              {s.name} (${s.cost})
            </label>
          </div>
        ))}
      </div>
      <form onSubmit={handleAdd} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Simulate new subscription"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          value={newCost}
          onChange={e => setNewCost(e.target.value)}
          min="0"
        />
        <button type="submit">Add</button>
      </form>
      <p style={{ color: '#2a7ae2', fontWeight: 'bold' }}>
        Toggle subscriptions or add a new one to instantly see the impact on your monthly spend.
      </p>
    </div>
  );
}

export default WhatIfPage;
