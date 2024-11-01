import React, { useState } from 'react';

const Signin: React.FC = () => {
  // State variables for form inputs
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation to check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    // Prepare the payload for the API
    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5002/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful! You can now log in.');
        setErrorMessage(null); // Clear any previous errors
      } else {
        setErrorMessage(data.message || 'Failed to register');
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Username:</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signin;
