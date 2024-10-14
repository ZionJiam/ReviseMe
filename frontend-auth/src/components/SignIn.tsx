import React, { useState } from 'react';

export default function SignIn() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [email, setEmail] = useState('');

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

      <button onClick={() => window.location.href = '/homepage'}>Sign In</button>
    </div>
  );
}
