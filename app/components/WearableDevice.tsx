"use client"
import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const App = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Fetch activity data from the mock API when component mounts
    fetchActivityData();
  }, []);

  const fetchActivityData = async () => {
    try {
      // Make a GET request to fetch activity data from the mock API
      const response = await fetch('https://mockapi.com/activity');
      const data = await response.json();
      // Set the activity data in state
      setActivityData(data);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  };

  return (
    <div>
      <h1>Wearable Device Integration</h1>
      <h2>Activity Data</h2>
      <ul>
        {activityData.map((activity, index) => (
          <li key={index}>
            <strong>Date:</strong> {activity.date}, <strong>Steps:</strong> {activity.steps}, <strong>Distance:</strong> {activity.distance} km
          </li>
        ))}
        </ul>
    </div>
  );
};

export default App;