import React, { useEffect, useState } from 'react';
import SubscriptionForm from '../components/subscriptions/forms/SubscriptionForm';
import SubscriptionList from '../components/subscriptions/list/SubscriptionList';

function calcNextRenewal(firstBillDate, billingCycle) {
  const now = new Date();
  let next = new Date(firstBillDate);
  while (next < now) {
    if (billingCycle === 'Monthly') next.setMonth(next.getMonth() + 1);
    else if (billingCycle === 'Annually') next.setFullYear(next.getFullYear() + 1);
    else if (billingCycle === 'Quarterly') next.setMonth(next.getMonth() + 3);
    else if (billingCycle === 'Weekly') next.setDate(next.getDate() + 7);
    else break;
  }
  return next.toLocaleDateString();
}

function SubscriptionsPage() {
  const [subs, setSubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubs(data))
      .catch(() => setSubs([]));
  }, []);

  // Always fetch latest data after add/update/delete
  const refreshSubs = () => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubs(data))
      .catch(() => setSubs([]));
  };

  const handleSave = (sub) => {
    if (editIndex !== null) {
      fetch(`/api/subscriptions/${subs[editIndex].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      })
        .then(res => res.json())
        .then(() => {
          refreshSubs();
          setEditIndex(null);
        });
    } else {
      fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      })
        .then(res => res.json())
        .then(() => refreshSubs());
    }
    setShowForm(false);
  };

  const handleEdit = (i) => {
    setEditIndex(i);
    setShowForm(true);
  };

  const handleDelete = (i) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) return;
    fetch(`/api/subscriptions/${subs[i].id}`, { method: 'DELETE' })
      .then(() => refreshSubs());
  };

  // Add nextRenewal for each sub (no conversion)
  const subsWithRenewal = subs.map(sub => ({
    ...sub,
    nextRenewal: calcNextRenewal(sub.firstBillDate, sub.billingCycle)
  }));

  return (
    <div className="subscriptions-page">
      <h1>Subscriptions</h1>
      <button onClick={() => { setShowForm(true); setEditIndex(null); }} style={{ marginBottom: '1rem' }}>+ Add Subscription</button>
      <SubscriptionList
        subscriptions={subsWithRenewal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <SubscriptionForm
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditIndex(null); }}
          {...(editIndex !== null ? { ...subs[editIndex] } : {})}
        />
      )}
    </div>
  );
}

export default SubscriptionsPage;
