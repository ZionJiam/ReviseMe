import React from 'react';

export default function ProfilePicture() {
  return (
    <div className="container">
      <h3>Change Profile Picture</h3>
      <img src="/assets/images/cloud_logo.png" alt="Profile" className="profile-pic" />
      <button onClick={() => {}}>Upload New Picture</button>
    </div>
  );
}
