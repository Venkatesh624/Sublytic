import React, { useEffect, useState } from 'react';
import './QuickStats.css';

function QuickStats() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubs(data))
      .catch(() => setSubs([]));
  }, []);

  const monthlySpend = subs.reduce((sum, sub) => sum + Number(sub.cost), 0).toFixed(2);
  const activeCount = subs.length;
  // Find next renewal date
  const nextRenewal = subs.length > 0 ? subs.reduce((min, sub) => {
    const date = new Date(sub.firstBillDate);
    return (!min || date < min) ? date : min;
  }, null) : null;
  // Find top value score (placeholder: highest cost)
  const topValue = subs.length > 0 ? subs.reduce((max, sub) => Number(sub.cost) > Number(max.cost) ? sub : max, subs[0]) : null;

  const stats = [
    { label: 'Monthly Spend', value: `$${monthlySpend}` },
    { label: 'Active Subscriptions', value: activeCount },
    { label: 'Next Renewal', value: nextRenewal ? nextRenewal.toLocaleDateString() : 'N/A' },
    { label: 'Top Value Score', value: topValue ? `${topValue.name} ($${topValue.cost})` : 'N/A' }
  ];
  return (
    <div className="quick-stats">
      {stats.map((stat, i) => (
        <div className="stat-card" key={i}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;
