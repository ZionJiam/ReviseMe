import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Ensure email and password are defined
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Save the token for future use
        navigate('/homepage');
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Show error message
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <img src="/assets/images/cloud_logo.png" alt="Logo" className="logo" />
      <div className="login-container">
        <form className="login-form">
          <label>Email or Phone</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Phone"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          <button type="button" className="login-button" onClick={handleLogin}>Login</button>
        </form>
        <p className="signup-text">
          New to the platform? <a href="/signin">Join now</a>
        </p>
      </div>
    </div>
  );
}
