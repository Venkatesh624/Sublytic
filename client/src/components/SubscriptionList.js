import React from 'react';

function SubscriptionList({ subscriptions, onEdit, onDelete }) {
  return (
    <div className="subscription-list">
      <h2>Your Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <ul>
          {subscriptions.map((sub, idx) => (
            <li key={sub.id || idx}>
              <strong>{sub.name}</strong> ({sub.category}) - ${sub.cost} / {sub.billingCycle}<br />
              Next Renewal: {sub.nextRenewal}<br />
              <button onClick={() => onEdit(idx)}>Edit</button>
              <button onClick={() => onDelete(idx)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubscriptionList;
