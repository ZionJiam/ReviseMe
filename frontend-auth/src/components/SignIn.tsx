import React, { useState } from 'react';

export default function SignIn() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', { // Adjust the URL as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, education, email, password }),
      });

      if (response.ok) {
        alert('User registered successfully!');
        window.location.href = '/login'; // Redirect to login after sign-up
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Show error message
      }
    } catch (err) {
      console.error('Sign Up error:', err);
      alert('Sign Up failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Age</label>
      <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      <label>Education</label>
      <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign In</button>
    </div>
  );
}
