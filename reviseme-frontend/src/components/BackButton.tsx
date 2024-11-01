import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyComponent() {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div>
      {/* ... your component content */}
      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}