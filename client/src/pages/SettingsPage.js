import React, { useState } from 'react';


function SettingsPage() {
  const [email, setEmail] = useState('');
  const [notifyRenewal, setNotifyRenewal] = useState(true);
  const [currency, setCurrency] = useState('USD');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved! (Demo only)');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSave} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: 16 }}>
          <label>Email for notifications:<br />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            <input type="checkbox" checked={notifyRenewal} onChange={e => setNotifyRenewal(e.target.checked)} />
            &nbsp;Notify me about upcoming renewals
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Currency:
            <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="USD">USD ($)</option>
            </select>
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
      <div style={{ marginTop: 32 }}>
        <h3>Export Data</h3>
        <button onClick={() => alert('Exported! (Demo only)')}>Export Subscriptions (CSV)</button>
      </div>
    </div>
  );
}

export default SettingsPage;
