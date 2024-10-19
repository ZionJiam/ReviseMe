// App.js
import React from 'react';
import AppNavigation from './components/AppNavigation.tsx'; // Fixed import statement
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavigation /> {/* Render your navigation component here */}
    </div>
  );
}

export default App;