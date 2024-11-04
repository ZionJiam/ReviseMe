import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Flashcard_Creator.css'; // Assuming you have CSS for styling

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

const FlashcardCreatorAI: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [prompt, setPrompt] = useState<string>(''); // New prompt field
  const [subject, setSubject] = useState<string>(''); // Subject for the flashcards
  const [tags, setTags] = useState<string>(''); // Tags (comma-separated)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // React Router's useNavigate hook
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Sending the prompt to AI backend service to generate flashcards
    try {
      const response = await fetch('http://localhost:5010/flashcardsAI/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, name, description }),
        credentials: 'include', // Automatically include cookies if needed
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const result = await response.json();
      console.log("AI RESULT: " + result);

      setFlashcards(result); // Set the generated flashcards from AI service
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save flashcards and flashcard set to the backend
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    const flashcardSet: FlashcardSet = {
      name,
      description,
      flashcards,
    };

    try {
      const response = await fetch('http://localhost:5001/flashcardsSets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flashcardSet),
        credentials: 'include', // Automatically include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to save flashcard set');
      }

      const result = await response.json();
      console.log('Flashcard set saved:', result);
      alert('Flashcard set created successfully!');
      // Reset form after successful creation
      setName('');
      setDescription('');
      setFlashcards([]);
      setPrompt('');
      setSubject('');
      setTags('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear the generated flashcards
  const handleClear = () => {
    setFlashcards([]);
  };

  // Go back to the previous page
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="flashcard-creator">
      <button onClick={handleBackButtonClick}>Back</button>
      <h2>Create Flashcard Set Using AI</h2>

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

          <label htmlFor="prompt">Enter a Prompt to Generate Flashcards</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="E.g., 'Generate flashcards about JavaScript basics.'"
            required
          />
        </div>

        <button type="submit" className="generate-button" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>

      {flashcards.length > 0 && (
        <div className="flashcards-preview">
          <h3>Generated Flashcards</h3>
          {flashcards.map((flashcard, index) => (
            <div key={index} className="flashcard-preview">
              <p><strong>Question {index + 1}:</strong> {flashcard.question}</p>
              <p><strong>Answer {index + 1}:</strong> {flashcard.answer}</p>
            </div>
          ))}

          <button onClick={handleSave} className="save-button" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Flashcard Set'}
          </button>
          <button onClick={handleClear} className="clear-button" disabled={isLoading}>
            Clear Flashcards
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardCreatorAI;
