// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Ensure this path is correct
import AppNavigation from './components/AppNavigation.tsx'; // Import AppNavigation directly
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppNavigation /> {/* Render AppNavigation directly */}
  </React.StrictMode>
);

// Optional: For measuring performance in your app
reportWebVitals();