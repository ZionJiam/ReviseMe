import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Ensure you have the CSS linked

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use React Router's useNavigate hook
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login, redirect to homepage
        navigate('/Flashcard/Flashcard_Creator');
      } else {
        // Display error message
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Error logging in');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-page">
      {/* Logo */}
      <img src="/assets/images/cloud_logo.png" alt="Logo" className="logo" />

      {/* Form container */}
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
          <div className="password-container">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
            />

          </div>

          {/* Display error message */}
          {error && <p className="error-message">{error}</p>}


          <a href="/forgot-password" className="forgot-password">
            Forgot password?
          </a>

          {/* Login button redirects to WelcomePage */}
          <button type="button" className="login-button" onClick={handleLogin}>
            Login
          </button>

        </form>

        <p className="signup-text">
          New to the platform? <a href="/signin">Join now</a>
        </p>
      </div>
    </div>
  );
}
