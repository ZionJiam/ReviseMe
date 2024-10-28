import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Response is: " + data);
        navigate('/Flashcard/FlashcardSetDisplay');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Error logging in');
      console.error('Error:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5003/auth/google';
  };

  return (
    <div className="login-page">
      <img src="/assets/images/cloud_logo.png" alt="Logo" className="logo" />
      <div className="login-container">
        <form className="login-form">
          <label>Email or Phone</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email or Phone" />
          <label>Password</label>
          <div className="password-container">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          {error && <p className="error-message">{error}</p>}
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          <button type="button" className="login-button" onClick={handleLogin}>Login</button>
          <button type="button" onClick={handleGoogleLogin} className="google-login-btn">Login with Google</button>
        </form>
        <p className="signup-text">New to the platform? <a href="/signin">Join now</a></p>
      </div>
    </div>
  );
}
