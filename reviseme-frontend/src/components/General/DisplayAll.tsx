import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisplayAll.css'; // Ensure this CSS file includes all necessary styles

const DisplayAll = () => {
    const [groups, setGroups] = useState([]);
    const [flashcardSets, setFlashcardSets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGroups();
        fetchFlashcardSets();
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
        <div className="display-all">
            <div className="top-controls">
                <button onClick={() => navigate('/Flashcard/FlashcardCreator')}>Create Flashcard Set</button>
                <button onClick={() => navigate('/Group/GroupCreator')}>Create Group</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="section">
                <h2>All Groups</h2>
                <div className="items-container">
                    {groups.map(group => (
                        <div key={group._id} className="item-card" onClick={() => navigate(`/groups/${group._id}`)}>
                            <h3>{group.name}</h3>
                            <p>Owner: {group.ownerId}</p>
                            <p>Members: {group.members.length}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="section">
                <h2>All Flashcard Sets by User</h2>
                <div className="items-container">
                    {flashcardSets.map(set => (
                        <div key={set._id} className="item-card" onClick={() => navigate(`/flashcards/${set._id}`)}>
                            <h3>{set.name}</h3>
                            <p>Description: {set.description}</p>
                            <p>Flashcards: {set.flashcards.length}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayAll;
