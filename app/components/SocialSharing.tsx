"use client"
import React, { useState } from 'react';

function SocialSharing() {
  const [message, setMessage] = useState('');

  const handleShare = () => {
    // Logic to share message on social media platforms
    // This can be implemented using APIs provided by social media platforms or third-party libraries
    alert(Shared message: ${message});
    setMessage('');
  };

  return (
    <div>
      <h2>Social Sharing</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Write your achievement, goal, or progress..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleShare}>Share</button>
    </div>
  );
}

export default SocialSharing;