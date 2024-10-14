import React, { useState } from 'react';

export default function AddDeck() {
  const [deckName, setDeckName] = useState('');

  return (
    <div className="container">
      <h3>Name your deck</h3>
      <input type="text" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
      <button onClick={() => {}}>Create Deck</button>
    </div>
  );
}
