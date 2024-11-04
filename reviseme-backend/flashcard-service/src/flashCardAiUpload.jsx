import React, { useState } from 'react';

const FlashcardUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        setSelectedFiles(files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFiles) {
            // Prepare form data to send to the server
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files', selectedFiles[i]);
            }
            // Send the files to your API endpoint
            await fetch('/flashcards/upload', {
                method: 'POST',
                body: formData,
            });
        }
    };

    return (
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} style={{ border: '2px dashed #ccc', padding: '20px' }}>
            <h3>Upload Flashcard Files</h3>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default FlashcardUpload;
