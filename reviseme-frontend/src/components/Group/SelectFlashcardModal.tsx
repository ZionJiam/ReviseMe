import React, { useEffect } from 'react';
import './SelectFlashcardModal.css';
import { useNavigate } from 'react-router-dom';


const SelectFlashcardModal = ({ closeModal, flashcardSets, groupId }) => {
    const navigate = useNavigate();

    // Function to close the modal if the click is outside the modal content
    const handleBackdropClick = (event) => {
        if (event.target.className.includes('modal')) { // Check if the click is on the modal backdrop
            closeModal();
        }
    };

    const addDeckToGroup = async (deckId) => {
        try {
            const response = await fetch(`http://localhost:5001/groups/${groupId}/decks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ deckId })
            });
            if (!response.ok) {
                throw new Error('Failed to add deck to group');
            }
            const data = await response.json();
            closeModal(); // Close the modal on successful addition
        } catch (error) {
            console.error('Error adding deck to group:', error);
            alert('Error adding deck to group');
        }
    };

    return (
        <div className="modal" onClick={handleBackdropClick}>
            <div className="modal-content" onClick={e => e.stopPropagation()}> 
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Select a Flashcard Set to Add</h2>
                <ul>
                    {flashcardSets.map(set => (
                        <li key={set._id} onClick={() => addDeckToGroup(set._id)}>
                            {set.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectFlashcardModal;
