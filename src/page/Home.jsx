import React, { useEffect, useState } from 'react';
import Header from './global/Header';
import Footer from './global/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => { 
  const goalID = localStorage.getItem('goalID');
  let goalType = '';
  if(goalID == 1){
    goalType = 'lose weight';
  }
  if(goalID == 2){
    goalType = 'gain weight';
  }
  if(goalID == 3){
    goalType = 'gain muscle';
  }
  const name = localStorage.getItem('username');


  return (
    <div className='home-page'>
      <Header ofPage="home" />
      { <div>
        Hello, {name}, welcome! Your goal is to {goalType}
      </div>}
      <Footer />
    </div>
  );
};

export default Home;
