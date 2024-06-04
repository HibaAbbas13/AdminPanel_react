import React, { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Donations = ({ status }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch donations from backend based on status
    const statusQuery = status === 'all' ? '' : `?status=${status}`;
    fetch(`/api/donations${statusQuery}`)
      .then(response => response.json())
      .then(data => setDonations(data))
      .catch(error => console.error('Error fetching donations:', error));
  }, [status]);

  const handleStatusChange = (id, newStatus) => {
    // Update the donation status in the backend
    fetch(`/api/donations/${id}/${newStatus}`, { method: 'POST' })
      .then(response => response.json())
      .then(updatedDonation => {
        setDonations(donations.filter(donation => donation.id !== id));
        // Send push notification
        const message = newStatus === 'verify' 
          ? 'Your donation has been verified.' 
          : 'Your donation has been unverified.';
        sendPushNotification(updatedDonation.user, message);
      })
      .catch(error => console.error(`Error ${newStatus} donation:`, error));
  };

  const sendPushNotification = (user, message) => {
    fetch(`/api/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, message })
    })
      .then(response => response.json())
      .catch(error => console.error('Error sending push notification:', error));
  };

  return (
    <div className="dashboard-container">
      <h1>{status === 'verified' ? 'Verified' : status === 'unverified' ? 'Unverified' : 'All'} Donations</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>
            <p>ID: {donation.id}</p>
            <p>User: {donation.user}</p>
            <p>Amount: ${donation.amount}</p>
            <Zoom>
              <img src={donation.screenshot} alt="Screenshot" />
            </Zoom>
            {donation.status === 'unverified' && (
              <div>
                <button onClick={() => handleStatusChange(donation.id, 'verify')}>Verify</button>
                <input type="checkbox" />
              </div>
            )}
            {donation.status === 'verified' && (
              <div>
                <button onClick={() => handleStatusChange(donation.id, 'unverify')}>Unverify</button>
                <input type="checkbox" checked readOnly />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donations;
