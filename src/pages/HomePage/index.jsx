import React from 'react';
import { Navbar } from '../../components';
import Feed from '../Feed/Feed';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='home'>
      <div className='homeContainer'>
        <Navbar />
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
