import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisplayAll.css'; // Ensure this CSS file includes all necessary styles

const DisplayAll = () => {
    const [groups, setGroups] = useState([]);
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [dueFlashcardSets, setDueFlashcardSets] = useState([]); // New state for flashcards due today
    const navigate = useNavigate();

    useEffect(() => {
        fetchGroups();
        fetchFlashcardSets();
        fetchDueFlashcardSets(); // Fetch flashcards due today
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:5001/groups', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const fetchFlashcardSets = async () => {
        const userId = sessionStorage.getItem('userId');
        try {
            const response = await fetch(`http://localhost:5001/flashcardsSets/user/${userId}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setFlashcardSets(data);
        } catch (error) {
            console.error('Error fetching flashcard sets:', error);
        }
    };

    const fetchDueFlashcardSets = async () => {
        const userId = sessionStorage.getItem('userId');
        try {
            const response = await fetch(`http://localhost:5001/review/today/flashCardSet/`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setDueFlashcardSets(data); // Update state with flashcard sets due for review
        } catch (error) {
            console.error('Error fetching flashcard sets due for review today:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/users/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/login');
            } else {
                console.error('Error logging out:', await response.text());
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="display-all-container">
            <div className="top-controls-container">
                <div className="button create-flashcard" onClick={() => navigate('/Flashcard/FlashcardCreator')}>Create Flashcard Set</div>
                <div className="button create-flashcard-ai" onClick={() => navigate('/Flashcard/FlashcardCreatorAI')}>Create Flashcard Set Using AI</div>
                <div className="button create-group" onClick={() => navigate('/Group/GroupCreator')}>Create Group</div>
                <div className="button logout" onClick={handleLogout}>Logout</div>
            </div>

            <div className="section">
                <div className="section-title">All Groups</div>
                <div className="items-container">
                    {groups.map(group => (
                        <div key={group._id} className="item-card" onClick={() => navigate(`/groups/${group._id}`)}>
                            <div className="item-title">{group.name}</div>
                            <div className="item-detail">Owner: {group.ownerId}</div>
                            <div className="item-detail">Members: {group.members.length}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <div className="section-title">All Flashcard Sets by User</div>
                <div className="items-container">
                    {flashcardSets.map(set => (
                        <div key={set._id} className="item-card" onClick={() => navigate(`/flashcards/${set._id}`)}>
                            <div className="item-title">{set.name}</div>
                            <div className="item-detail">Description: {set.description}</div>
                            <div className="item-detail">Flashcards: {set.flashcards.length}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New Section for Flashcard Sets Due for Review */}
            <div className="section">
                <div className="section-title">Flashcard Sets Due for Review Today</div>
                <div className="items-container">
                    {dueFlashcardSets.length > 0 ? (
                        dueFlashcardSets.map(set => (
                            <div key={set._id} className="item-card" onClick={() => navigate(`/flashcards/${set._id}`)}>
                                <div className="item-title">{set.name}</div>
                                <div className="item-detail">Description: {set.description}</div>
                                <div className="item-detail">Flashcards Due: {set.flashcards.length}</div>
                            </div>
                        ))
                    ) : (
                        <div className="no-items-message">No flashcard sets due for review today.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisplayAll;
