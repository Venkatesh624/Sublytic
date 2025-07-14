import React, { useState } from 'react';
import './SubscriptionForm.css';

function SubscriptionForm({ onSave, onClose, name: initialName = '', category: initialCategory = 'Entertainment', cost: initialCost = '', billingCycle: initialBillingCycle = 'Monthly', firstBillDate: initialFirstBillDate = '', notes: initialNotes = '' }) {
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState(initialCategory);
  const [cost, setCost] = useState(initialCost);
  const [billingCycle, setBillingCycle] = useState(initialBillingCycle);
  const [firstBillDate, setFirstBillDate] = useState(initialFirstBillDate);
  const [notes, setNotes] = useState(initialNotes);
  const [usage, setUsage] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, category, cost: parseFloat(cost), billingCycle, firstBillDate, notes, usage });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Subscription</h2>
        <form className="subscription-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name (e.g. Netflix)" value={name} onChange={e => setName(e.target.value)} required />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option>Entertainment</option>
            <option>Utilities</option>
            <option>Software</option>
            <option>Fitness</option>
            <option>Other</option>
          </select>
          <input type="number" placeholder="Cost" value={cost} onChange={e => setCost(e.target.value)} required min="0" step="0.01" />
          <select value={billingCycle} onChange={e => setBillingCycle(e.target.value)}>
            <option>Monthly</option>
            <option>Annually</option>
          </select>
          <input type="date" value={firstBillDate} onChange={e => setFirstBillDate(e.target.value)} required />
          <textarea placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
          <label>Usage Rating (1-10):
            <input type="range" min="1" max="10" value={usage} onChange={e => setUsage(e.target.value)} />
            <span>{usage}</span>
          </label>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionForm;
