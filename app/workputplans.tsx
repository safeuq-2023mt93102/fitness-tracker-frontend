import React, { useState } from 'react';

function WorkoutPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customRoutine, setCustomRoutine] = useState([]);

  const preDesignedPlans = [
    { id: 1, name: 'Beginner Full Body Workout' },
    { id: 2, name: 'Intermediate Cardio Blast' },
    { id: 3, name: 'Advanced Strength Training' },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setCustomRoutine([]); // Reset custom routine when a pre-designed plan is selected
  };

  const handleAddExercise = (exercise) => {
    setCustomRoutine([...customRoutine, exercise]);
  };

  return (
    <div>
      <h1>Workout Plans</h1>
      
      <h2>Pre-Designed Plans</h2>
      <ul>
        {preDesignedPlans.map(plan => (
          <li key={plan.id}>
            <button onClick={() => handleSelectPlan(plan)}>
              {plan.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedPlan && (
        <div>
          <h3>Selected Plan: {selectedPlan.name}</h3>
          <p>Description: {/* Add description here */}</p>
        </div>
      )}

      <h2>Custom Routine</h2>
      <ul>
        {customRoutine.map((exercise, index) => (
          <li key={index}>{exercise}</li>
        ))}
      </ul>

      {/* Here you can include a list of exercises to choose from */}
      {/* <ExerciseList onAddExercise={handleAddExercise} /> */}
    </div>
  );
}

export default WorkoutPlans;

