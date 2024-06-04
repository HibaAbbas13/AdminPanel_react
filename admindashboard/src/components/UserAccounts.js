import React, { useState, useEffect } from 'react';

const UserAccounts = () => {
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    // Fetch user accounts from backend
    fetch('//api/user/users')
      .then(response => response.json())
      .then(data => setUserAccounts(data))
      .catch(error => console.error('Error fetching user accounts:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>User Accounts</h1>
      <ul className="user-accounts-list">
        {userAccounts.map((user) => (
          <li key={user.id} className="user-account-item">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Donations:</strong> ${user.totalDonations}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAccounts;
