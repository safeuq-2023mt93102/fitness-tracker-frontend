"use client"
import React, { useState } from 'react';

function NutritionTracker() {
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [mealsLog, setMealsLog] = useState([]);

  const handleAddMeal = () => {
    const newMeal = {
      meal: meal,
      calories: calories,
      protein: protein,
      carbs: carbs,
      fat: fat
    };

    setMealsLog([...mealsLog, newMeal]);
    setMeal('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

return (
    <div>
      <h2>Nutrition Tracker</h2>
      <input
        type="text"
        placeholder="Meal Name"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <input
        type="number"
        placeholder="Protein (g)"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
      />
      <input
        type="number"
        placeholder="Carbs (g)"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
      />
      <input
        type="number"
        placeholder="Fat (g)"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
      />
      <button onClick={handleAddMeal}>Add Meal</button>
      <div>
        <h3>Meals Log</h3>
        <ul>
          {mealsLog.map((item, index) => (
            <li key={index}>
              <strong>{item.meal}</strong> - Calories: {item.calories}, Protein: {item.protein}g, Carbs: {item.carbs}g, Fat: {item.fat}g
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NutritionTracker;