import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import Login from './Login.tsx';
import SignIn from './SignIn.tsx';
import ProfilePicture from './ProfilePicture.tsx';
import AddDeck from './AddDeck.tsx';
import EditPlanning from './EditPlanning.tsx';
import WelcomePage from './WelcomePage.tsx'; // Import WelcomePage
import React from 'react';

export default function AppNavigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} /> {/* Set WelcomePage as default */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile-picture" element={<ProfilePicture />} />
        <Route path="/add-deck" element={<AddDeck />} />
        <Route path="/edit-planning" element={<EditPlanning />} />
      </Routes>
    </Router>
  );
}
