import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, imageUrl }) {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/room/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={imageUrl} />
        <h2>{name}</h2>
      </div>
    </Link>
  );
}

export default SidebarChat;
