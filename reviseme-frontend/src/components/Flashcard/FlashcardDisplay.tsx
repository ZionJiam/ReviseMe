import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To extract the flashcard set ID from the URL
import './FlashcardDisplay.css';
import { useNavigate } from 'react-router-dom';


interface FlashcardSet {
  _id: string;
  name: string;
  description: string;
  flashcards: Flashcard[];
}

interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  subject: string;
  tags: string[];
}

const FlashcardDisplay: React.FC = () => {
  const { setId } = useParams<{ setId: string }>(); // Extract setId from URL
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null); // Changed initial value to null
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  // Use React Router's useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(`http://localhost:5001/flashcards/sets/${setId}`);
        const data: FlashcardSet = await response.json();
        setFlashcardSet(data || null); // Set the flashcardSet
        setFlashcards(data.flashcards || []); // Ensure the array is set correctly
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, [setId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };


  // Ensure the current flashcard is valid before rendering
  const currentFlashcard = flashcards.length > 0 ? flashcards[currentCardIndex] : null;

  if (!flashcardSet) {
    return <div>Loading flashcard set...</div>;
  }

  return (
    <div className="flashcard-container">
      <button onClick={handleBackButtonClick}>Back</button>
      {/* Add the name of the flashcard set as a header */}
      <h1>{flashcardSet.name}</h1> 

      {/* Flashcard display */}
      {currentFlashcard ? (
        <div>
          <div
            className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="front">
              {isFlipped ? currentFlashcard.answer : currentFlashcard.question}
            </div>
          </div>

          <div className="controls">
            <button onClick={handlePrevious} disabled={flashcards.length <= 1}>
              Previous
            </button>
            <button onClick={handleNext} disabled={flashcards.length <= 1}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>No flashcards available</div>
      )}
    </div>
  );
};

export default FlashcardDisplay;
