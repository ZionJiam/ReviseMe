import React, { useState } from 'react';
import './GroupCreator.css';


const GroupCreator = () => {
    const [groupName, setGroupName] = useState('');
    const [status, setStatus] = useState('');

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="groupName">Group Name:</label>
                <input
                    type="text"
                    id="groupName"
                    value={groupName}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Create Group</button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default GroupCreator;
