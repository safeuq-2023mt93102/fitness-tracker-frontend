"use client"
import React, {useState} from 'react';


const ActivityLogger = () => {
  const [goals, setGoals] = useState({
    weightLoss: '',
    endurance: '',
    muscleGain: '',
    performanceTarget: ''
  });


  const handleChange = (event) => {
    const {name, value} = event.target;
    setGoals(prevGoals => ({
      ...prevGoals,
      [name]: value
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Goals submitted:', goals);
    // You can perform further actions like sending the goals to a server
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Weight Loss Goal:
        <input
          type="text"
          name="weightLoss"
          value={goals.weightLoss}
          onChange={handleChange}
        />
      </label>
      <br/>
      <label>
        Endurance Importance:
        <input
          type="text"
          name="endurance"
          value={goals.endurance}
          onChange={handleChange}
        />
      </label>
      <br/>
      <label>
        Muscle Gain Goal:
        <input
          type="text"
          name="muscleGain"
          value={goals.muscleGain}
          onChange={handleChange}
        />
      </label>
      <br/>
      <label>
        Performance Target:
        <input
          type="text"
          name="performanceTarget"
          value={goals.performanceTarget}
          onChange={handleChange}
        />
      </label>
      <br/>
      <button type="submit">Set Goals</button>
    </form>
  );
};


export default ActivityLogger;