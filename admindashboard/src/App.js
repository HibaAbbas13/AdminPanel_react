import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import UserAccounts from './components/UserAccounts';
import Donations from './components/Donations';
import ForgotPassword from './components/ForgotPassword';
import './Style.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn ? (
        <div className="grid-container">
          <header className="header">Admin Dashboard</header>
          <nav className="sidebar">
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <Link to="/user-accounts">User Accounts</Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/donations">All Donations</Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/donations/verified">Verified Donations</Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/donations/unverified">Unverified Donations</Link>
              </li>
            </ul>
          </nav>
          <main className="main-container">
            <Routes>
              <Route path="/user-accounts" element={<UserAccounts />} />
              <Route path="/donations" element={<Donations status="all" />} />
              <Route path="/donations/verified" element={<Donations status="verified" />} />
              <Route path="/donations/unverified" element={<Donations status="unverified" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
