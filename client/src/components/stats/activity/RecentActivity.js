import React, { useEffect, useState } from 'react';
import './RecentActivity.css';

function RecentActivity() {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        fetch('/api/subscriptions')
            .then(res => res.json())
            .then(data => setSubs(data))
            .catch(() => setSubs([]));
    }, []);

    // Generate recent activity from subscription changes
    const activities = subs.slice(-4).reverse().map(sub => `Added or updated ${sub.name} subscription`);

    return (
        <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
                {activities.length === 0 ? <li>No recent activity</li> : activities.map((act, i) => (
                    <li key={i}>{act}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecentActivity;
