import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import QuickStats from '../components/QuickStats';
import RecentActivity from '../components/RecentActivity';
import SearchBar from '../components/SearchBar';
import AddSubscriptionButton from '../components/AddSubscriptionButton';
import SubscriptionForm from '../components/subscriptions/forms/SubscriptionForm';
import SubscriptionList from '../components/subscriptions/list/SubscriptionList';
import UpcomingRenewals from '../components/UpcomingRenewals';
import HelpTooltip from '../components/HelpTooltip';
import NotificationBanner from '../components/NotificationBanner';

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubscriptions(data))
      .catch(() => setSubscriptions([]));
  }, []);

  // Always fetch latest data after add/update/delete
  const refreshSubs = () => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubscriptions(data))
      .catch(() => setSubscriptions([]));
  };

  const handleSave = (sub) => {
    if (editIndex !== null) {
      fetch(`/api/subscriptions/${subscriptions[editIndex].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      })
        .then(res => res.json())
        .then(() => {
          refreshSubs();
          setEditIndex(null);
          setNotification('Subscription updated successfully!');
        });
    } else {
      fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      })
        .then(res => res.json())
        .then(() => {
          refreshSubs();
          setNotification('Subscription added successfully!');
        });
    }
    setShowForm(false);
  };
  const handleEdit = (i) => {
    setEditIndex(i);
    setShowForm(true);
  };
  const handleDelete = (i) => {
    fetch(`/api/subscriptions/${subscriptions[i].id}`, { method: 'DELETE' })
      .then(() => refreshSubs());
  };
  const filteredSubs = subscriptions.filter(sub => sub.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="home-page">
      <NotificationBanner message={notification} onClose={() => setNotification('')} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome to SubTracker AI</h1>
        <HelpTooltip />
      </div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <SearchBar onSearch={setSearch} />
        <AddSubscriptionButton onClick={() => { setShowForm(true); setEditIndex(null); }} />
      </div>
      <QuickStats />
      <div style={{ display: 'flex', gap: '2rem', margin: '2rem 0' }}>
        <UpcomingRenewals />
        <RecentActivity />
      </div>
      <SubscriptionList
        subscriptions={filteredSubs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <SubscriptionForm
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditIndex(null); }}
          {...(editIndex !== null ? { ...filteredSubs[editIndex] } : {})}
        />
      )}
    </div>
  );
}

export default Home;
