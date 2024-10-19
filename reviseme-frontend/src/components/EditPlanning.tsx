import React, { useState } from 'react';

export default function EditPlanning() {
  const [planning, setPlanning] = useState('');

  return (
    <div className="container">
      <h3>Edit your revision schedule</h3>
      <textarea value={planning} onChange={(e) => setPlanning(e.target.value)} />
      <button onClick={() => {}}>Save</button>
    </div>
  );
}
