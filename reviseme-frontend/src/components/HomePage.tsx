import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';  // Ensure this package is installed
import 'react-calendar/dist/Calendar.css'; // CSS for calendar
import '../styles/HomePage.css';

// Flashcard type
type Flashcard = {
  question: string;
  answer: string;
};

// Notification schedule type
type Schedule = {
  time: Date;
  message: string;
};

// Type from 'react-calendar'
type Value = Date | Date[] | null;

const Homepage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());

  // Add a new flashcard
  const addFlashcard = () => {
    if (newFlashcard.question && newFlashcard.answer) {
      setFlashcards([...flashcards, newFlashcard]);
      setNewFlashcard({ question: '', answer: '' });
    }
  };

  // Handle profile picture upload
  const handleProfilePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a study session to the schedule
  const addToSchedule = (time: Date, message: string) => {
    setSchedule([...schedule, { time, message }]);
  };

  // Handle notifications (mock functionality)
  useEffect(() => {
    const interval = setInterval(() => {
      schedule.forEach(item => {
        if (new Date().getTime() >= new Date(item.time).getTime()) {
          alert(`Study reminder: ${item.message}`);
        }
      });
    }, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [schedule]);

  // Calendar onChange function that handles the event parameter as well
  const handleCalendarChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setCalendarDate(value);
    } else if (Array.isArray(value) && value.length > 0) {
      setCalendarDate(value[0]); // Handling the case where it could be an array of Dates
    } else {
      setCalendarDate(null); // In case of null
    }
  };

  return (
    <div className="homepage">
      <h1>Study Planner & Flashcards</h1>

      {/* Profile section */}
      <div className="profile-section">
        <h2>Profile</h2>
        <input type="file" onChange={handleProfilePicture} />
        {profilePicture && <img src={profilePicture as string} alt="Profile" className="profile-pic" />}
      </div>

      {/* Flashcards section */}
      <div className="flashcards-section">
        <h2>Create Flashcards</h2>
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
        />
        <button onClick={addFlashcard}>Add Flashcard</button>

        <div className="flashcard-list">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <p><strong>Q:</strong> {card.question}</p>
              <p><strong>A:</strong> {card.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule & Notification section */}
      <div className="schedule-section">
        <h2>Study Schedule</h2>
        {/* Pass the updated handler */}
        <Calendar onChange={handleCalendarChange} value={calendarDate} />
        <button onClick={() => addToSchedule(calendarDate!, 'Time to study your flashcards!')}>
          Schedule Study Session
        </button>

        <div className="schedule-list">
          <h3>Upcoming Sessions</h3>
          {schedule.map((item, index) => (
            <div key={index}>
              <p>{item.message} at {item.time.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz section */}
      <div className="quiz-section">
        <h2>Quizzes</h2>
        <p>Quizzes will be generated based on your flashcards.</p>
        <button onClick={() => alert('Quiz functionality to be implemented')}>Take a Quiz</button>
      </div>
    </div>
  );
};

export default Homepage;
