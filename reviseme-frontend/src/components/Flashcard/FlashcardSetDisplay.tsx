import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import './FlashcardSetDisplay.css'; // For styling the display

interface FlashcardSet {
  _id: string;
  name: string;
  description: string;
}

const FlashcardSetDisplay: React.FC = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const response = await fetch('http://localhost:5001/flashcards/sets/all', {
          credentials: 'include', // Automatically include cookies
        });
        const data: FlashcardSet[] = await response.json();
        setFlashcardSets(data);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };

    fetchFlashcardSets();
  }, []);

  const handleClick = (setId: string) => {
    // Navigate to the FlashcardDisplay page with the selected flashcard set ID
    navigate(`/flashcards/${setId}`);
  };

  return (
    <div className="flashcard-set-container">
      <h2>ALL Available Flashcard Sets</h2>
      <button onClick={() =>navigate('/Flashcard/FlashcardCreator')}>Create Flashcard Set</button>
      <div className="flashcard-set-row">
        {flashcardSets.length > 0 ? (
          flashcardSets.map((set) => (
            <div key={set._id} className="flashcard-set" onClick={() => handleClick(set._id)}>
              <h3>{set.name}</h3>
              <p>{set.description}</p>
            </div>
          ))
        ) : (
          <p>Loading flashcard sets...</p>
        )}
      </div>
    </div>
  );
};

export default FlashcardSetDisplay;
