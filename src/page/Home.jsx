import React, { useEffect, useState } from 'react';
import Header from './global/Header';
import Footer from './global/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className='home-page'>
      <Header ofPage="home" />
      <div>
        Hello, {username}, welcome!
      </div>
      <Footer />
    </div>
  );
};

export default Home;
