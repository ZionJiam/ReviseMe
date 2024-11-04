
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './GroupCreator.css';

const GroupCreator = () => {
    const [groupName, setGroupName] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5001/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: groupName,
                }),
                credentials: 'include', // Automatically include cookies
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setStatus('Group Created Successfully! Group ID: ' + data._id);
        } catch (error) {
            console.error('Failed to create group:', error);
            setStatus('Failed to create group');
        }
    };

    // Handle going back to the previous page
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="group-creator-container">
            <button onClick={handleBackClick} className="back-button">Back</button> {/* Back Button */}
            <form onSubmit={handleSubmit} className="group-creator-form">
                <label htmlFor="groupName" className="group-creator-label">Group Name:</label>
                <input
                    type="text"
                    id="groupName"
                    value={groupName}
                    onChange={handleInputChange}
                    className="group-creator-input"
                    required
                />
                <button type="submit" className="group-creator-button">Create Group</button>
            </form>
            <p className="group-creator-status">{status}</p>
        </div>
    );
};

export default GroupCreator;
