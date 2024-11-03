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

    const handleFlashcardSetClick = setId => {
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

    const handleBackClick = () => {
        navigate(-1);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div className="group-details">
            <h1>{group.name}</h1>
            <p>Owner ID: {group.ownerId}</p>
            <p>Members: {group.members.join(', ')}</p>
            <button onClick={openModal}>+Add Flashcard Set</button>
            <button onClick={handleJoinGroup}>Join Group</button>
            <button onClick={handleBackClick}>Back</button>
            {isModalOpen && (
                <SelectFlashcardModal
                    closeModal={() => setIsModalOpen(false)}
                    flashcardSets={flashcardSets}
                    groupId={groupId}
                />
            )}
            <div>
                <h2>Flashcard Sets:</h2>
                <ul>
                    {group.decks.map((deck) => (
                        <li key={deck._id} onClick={() => handleFlashcardSetClick(deck._id)}>
                            {deck.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupDetails;
