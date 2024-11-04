import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import Login from './Login.tsx';
import SignIn from './SignIn.tsx';
import ProfilePicture from './ProfilePicture.tsx';
import AddDeck from './AddDeck.tsx';
import EditPlanning from './EditPlanning.tsx';
import WelcomePage from './WelcomePage.tsx'; // Import WelcomePage

import DisplayAll from './General/DisplayAll.tsx';


import FlashcardCreator from './Flashcard/FlashcardCreator.tsx';
import FlashcardCreatorAI from './Flashcard/FlashcardCreatorAI.tsx';
import FlashcardDisplay from './Flashcard/FlashcardDisplay.tsx';
import FlashcardSetDisplay from './Flashcard/FlashcardSetDisplay.tsx';

import GroupCreator from './Group/GroupCreator.tsx';
import GroupDisplayAll from './Group/GroupDisplayAll.tsx';
import GroupDetail from './Group/GroupDetail.tsx';




import BackButton from './BackButton.tsx';




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

        <Route path="/General/DisplayAll" element={<DisplayAll />} />


        <Route path="/Flashcard/FlashcardCreator" element={<FlashcardCreator />} />
        <Route path="/Flashcard/FlashcardCreatorAI" element={<FlashcardCreatorAI />} />
        <Route path="/Flashcard/FlashcardSetDisplay" element={<FlashcardSetDisplay />} />
        <Route path="/flashcards/:setId" element={<FlashcardDisplay />} />


        <Route path="/Group/GroupCreator" element={<GroupCreator />} />
        <Route path="/Group/GroupDisplayAll" element={<GroupDisplayAll />} />
        <Route path="/groups/:groupId" element={<GroupDetail />} />



      </Routes>
    </Router>
  );
}
