import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './global/Header';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const goalID = localStorage.getItem('goalID');

  const fetchMealData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/mealplan/${goalID}`);
      const mealsData = response.data.data || [];
      setMeals(mealsData);
    } catch (error) {
      console.error('Error fetching meal data: ', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/exongoal/${goalID}`);
      setPlans(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMealData();
  }, []); 

  return (
    <div>
      <div className='plans'>
        <Header ofPage="plans" />
        <ul>
          {plans.map((item, index) => (
            <li key={index}>{item.exercisename} {item.exercisenbofsets}</li>
          ))}
        </ul>
      </div>
      <br/>
      <div>
        <ul>
          {meals.map((item, index) => (
            <li key={index}>{item.foodname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
