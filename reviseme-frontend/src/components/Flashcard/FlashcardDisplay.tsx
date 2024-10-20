import React, { useState, useEffect } from 'react';
import './Flashcard.css'; // Import CSS file for styling

function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('http://localhost:5001/flashcards/all');
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => {
      if (prevIndex < flashcards.length - 1) {
        return prevIndex + 1;
      }
      return 0; // Loop back to the beginning
    });
    setIsFlipped(false); // Reset flip state for the next card
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return flashcards.length - 1; // Loop to the last card
    });
    setIsFlipped(false); // Reset flip state for the previous card
  };

  const currentFlashcard = flashcards[currentCardIndex];

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="front">
          {currentFlashcard?.question}
        </div>
        <div className="back">
          {currentFlashcard?.answer}
        </div>
      </div>
      <div className="buttons">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleFlip}>Flip</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Flashcard;