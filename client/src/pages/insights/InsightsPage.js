
import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

function InsightsPage() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubs(data))
      .catch(() => setSubs([]));
  }, []);


  // Defensive: ensure subs is always an array
  const safeSubs = Array.isArray(subs) ? subs : [];
  // Calculate total cost in dollars (no conversion)
  const totalCost = safeSubs.reduce((sum, sub) => sum + Number(sub.cost), 0).toFixed(2);

  // Pie chart data: spend by subscription
  const pieData = safeSubs.map(sub => ({ name: sub.name, value: Number(sub.cost) }));

  // Bar chart data: spend by billing cycle
  const billingCycles = Array.from(new Set(safeSubs.map(sub => sub.billingCycle)));
  const barData = billingCycles.map(cycle => ({
    billingCycle: cycle,
    total: safeSubs.filter(sub => sub.billingCycle === cycle).reduce((sum, sub) => sum + Number(sub.cost), 0)
  }));

  // Leaderboard: top 3 most expensive subscriptions
  const leaderboard = [...safeSubs].sort((a, b) => Number(b.cost) - Number(a.cost)).slice(0, 3);

  // Suggestions: highlight subscriptions over $20/month
  const suggestions = safeSubs.filter(sub => Number(sub.cost) > 20);

  return (
    <div className="insights-page">
      <h1>Insights</h1>
      <h2>Total Monthly Spend: ${totalCost} USD</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Spend by Subscription</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"][idx % 5]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Spend by Billing Cycle</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="billingCycle" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Top Subscriptions (Leaderboard)</h3>
        <ol>
          {leaderboard.map(sub => (
            <li key={sub.id}><strong>{sub.name}</strong>: ${sub.cost} / {sub.billingCycle}</li>
          ))}
        </ol>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Suggestions</h3>
        {suggestions.length === 0 ? (
          <p>All subscriptions are under $20/month.</p>
        ) : (
          <ul>
            {suggestions.map(sub => (
              <li key={sub.id}>
                Consider reviewing <strong>{sub.name}</strong> (${sub.cost} / {sub.billingCycle}) for possible savings.
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default InsightsPage;
