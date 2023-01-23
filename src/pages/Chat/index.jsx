import React from 'react';
import { Navbar } from '../../components';
import './Chat.css';
import ChatContainer from './ChatContainer';
import Sidebar from './Sidebar/Sidebar';
import Media from 'react-media'

const Chat = () => {
  return (
    <div className='chat'>
      <Navbar home={false} />
      <div className='chatContainer'>
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;
