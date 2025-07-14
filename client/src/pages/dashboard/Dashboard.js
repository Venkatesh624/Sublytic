import React from 'react';
import SubscriptionList from '../../components/subscriptions/list/SubscriptionList';
import RenewalCalendar from '../../components/RenewalCalendar';
import ExpenseChart from '../../components/ExpenseChart';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>SubTracker AI Dashboard</h1>
      <SubscriptionList />
      <RenewalCalendar />
      <ExpenseChart />
    </div>
  );
}

export default Dashboard;
