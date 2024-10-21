import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Flashcard_Creator.css';

interface Flashcard {
  question: string;
  answer: string;
  subject: string;
  tags: string[];
}

interface FlashcardSet {
  name: string;
  description: string;
  flashcards: Flashcard[];
}



const FlashcardCreator: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([{ question: '', answer: '', subject: '', tags: [] }]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { question: '', answer: '', subject: '', tags: [] }]);
  };

  // Use React Router's useNavigate hook
  const navigate = useNavigate();


  const handleFlashcardChange = (index: number, field: keyof Flashcard, value: string) => {
    const newFlashcards = [...flashcards];
    if (field === 'tags') {
      newFlashcards[index][field] = value.split(',').map(tag => tag.trim());
    } else {
      (newFlashcards[index] as any)[field] = value;
    }
    setFlashcards(newFlashcards);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const flashcardSet: FlashcardSet = {
      name,
      description,
      flashcards
    };

    try {
      const response = await fetch('http://localhost:5001/flashcards/sets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flashcardSet),
        credentials: 'include', // Automatically include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to create flashcard set');
      }

      const result = await response.json();
      console.log('Flashcard set created:', result);
      alert('Flashcard set created successfully!');
      // Reset form after successful creation
      setName('');
      setDescription('');
      setFlashcards([{ question: '', answer: '', subject: '', tags: [] }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flashcard-creator">
      <button onClick={handleBackButtonClick}>Back</button>
      <h2>Create New Flashcard Set</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="set-info">
          <label htmlFor="name">Name of the Flashcard Set</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="description">Description of the Flashcard Set</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="flashcards">
          <h3>Flashcards</h3>
          {flashcards.map((flashcard, index) => (
            <div key={index} className="flashcard-form">
              <label htmlFor={`question-${index}`}>Question {index + 1}</label>
              <input
                id={`question-${index}`}
                type="text"
                value={flashcard.question}
                onChange={(e) =>
                  handleFlashcardChange(index, 'question', e.target.value)
                }
                required
              />
              <label htmlFor={`answer-${index}`}>Answer {index + 1}</label>
              <input
                id={`answer-${index}`}
                type="text"
                value={flashcard.answer}
                onChange={(e) =>
                  handleFlashcardChange(index, 'answer', e.target.value)
                }
                required
              />
              <label htmlFor={`subject-${index}`}>Subject {index + 1}</label>
              <input
                id={`subject-${index}`}
                type="text"
                value={flashcard.subject}
                onChange={(e) =>
                  handleFlashcardChange(index, 'subject', e.target.value)
                }
                required
              />
              <label htmlFor={`tags-${index}`}>Tags {index + 1} (comma-separated)</label>
              <input
                id={`tags-${index}`}
                type="text"
                value={flashcard.tags.join(', ')}
                onChange={(e) =>
                  handleFlashcardChange(index, 'tags', e.target.value)
                }
              />
            </div>
          ))}

          <button type="button" onClick={addFlashcard} className="add-button">
            + Add More Flashcards
          </button>
        </div>

        <div className="action-buttons">
          <button type="submit" className="save-button" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Flashcard Set'}
          </button>
          <button type="reset" className="reset-button" disabled={isLoading}>Reset Form</button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardCreator;