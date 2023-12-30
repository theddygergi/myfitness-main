import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './global/Header';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/exongoal');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div className='plans'>
      <Header ofPage="plans" />
      <ul>
        {plans.map((item, index) => (
          <li key={index}>{item.exercisename}</li>
        ))}
      </ul>
    </div>
  );
}
