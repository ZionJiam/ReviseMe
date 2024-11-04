import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SelectFlashcardModal from './SelectFlashcardModal.tsx'; // Ensure correct import path
import './GroupDetail.css'; // Make sure the CSS path is correct

const GroupDetails = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flashcardSets, setFlashcardSets] = useState([]);

    useEffect(() => {
        fetchGroupDetails();
    }, [groupId]);

    const fetchGroupDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5001/groups/${groupId}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Group not found');
            }
            const data = await response.json();
            setGroup(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFlashcardSetClick = (setId) => {
        navigate(`/flashcards/${setId}`);
    };

    const handleJoinGroup = async () => {
        try {
            const response = await fetch(`http://localhost:5001/groups/${groupId}/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId: sessionStorage.getItem('userId') })
            });
            if (!response.ok) {
                throw new Error('Failed to join group');
            }
            const result = await response.json();
            alert('Joined group successfully!');
            console.log(result);
        } catch (error) {
            console.error('Error joining group:', error);
            alert('Error joining group');
        }
    };

    const openModal = async () => {
        setIsModalOpen(true);
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:5001/flashcardsSets/user/${userId}`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        setFlashcardSets(data);
    };

    const closeModalAndRefresh = () => {
        setIsModalOpen(false);
        fetchGroupDetails(); // Refresh group details when modal is closed
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!group) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="group-details">
            <div className="group-title">{group.name}</div>
            <div className="group-info">Owner ID: {group.ownerId}</div>
            <div className="group-info">Members: {group.members.join(', ')}</div>
            <div className="action-buttons">
                <div className="add-btn" onClick={openModal}>+ Add Flashcard Set</div>
                <div className="join-btn" onClick={handleJoinGroup}>Join Group</div>
                <div className="back-btn" onClick={handleBackClick}>Back</div>
            </div>
            {isModalOpen && (
                <SelectFlashcardModal
                    closeModal={closeModalAndRefresh}
                    flashcardSets={flashcardSets}
                    groupId={groupId}
                />
            )}
            <div className="flashcard-set-section">
                <div className="section-title">Flashcard Sets:</div>
                <ul className="flashcard-set-list">
                    {group.decks.map((deck) => (
                        <li key={deck._id} className="flashcard-set-item" onClick={() => handleFlashcardSetClick(deck._id)}>
                            {deck.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupDetails;
