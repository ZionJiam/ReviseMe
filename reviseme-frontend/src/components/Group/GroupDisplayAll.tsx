import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './GroupDisplayAll.css';

const GroupDisplayAll = () => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
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

        fetchGroups();
    }, []);

    const handleClick = (groupId) => {
        navigate(`/groups/${groupId}`); // Use navigate to redirect
    };

    return (
        <div className="group-container">
            {groups.length > 0 ? (
                groups.map(group => (
                    <div className="group-card" key={group._id} onClick={() => handleClick(group._id)}>
                        <h3>{group.name}</h3>
                        <p>Owner ID: {group.ownerId}</p>
                        <p>Members Count: {group.members ? group.members.length : 0}</p>
                    </div>
                ))
            ) : (
                <p>No groups found.</p>
            )}
        </div>
    );
};

export default GroupDisplayAll;
