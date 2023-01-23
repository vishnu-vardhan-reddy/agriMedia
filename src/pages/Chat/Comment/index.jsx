import React from 'react';
import { Avatar } from '@mui/material';
import './Comment.css';

const Comment = ({ comment, profilePic, timestamp, userName }) => {
  return (
    <div className='comment'>
      <Avatar src={profilePic} />
      <div className='commentContainer'>
        <div className='commentContainer-top'>
          <p>{userName}</p>
          <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
