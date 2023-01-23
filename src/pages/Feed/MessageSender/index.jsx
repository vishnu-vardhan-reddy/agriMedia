import { Avatar, IconButton, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import SendIcon from '@mui/icons-material/Send';
import storage, { db } from '../../../config/firebase.config';
import {
  ref as storageReff,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import './MessageSender.css';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';

const videoExtList = [];

const MessageSender = () => {
  const user = useSelector(selectUser);
  const [message, setMessage] = useState('');
  const [fileUploaded, setFileUploaded] = useState(null);
  const matches = useMediaQuery('(min-width:800px)');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.uid) {
      alert('login to upload post');
      return;
    }

    let fileName = `${nanoid()}_${fileUploaded.name}`;
    const storageRef = storageReff(storage, `files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, fileUploaded);

    let fileType = '';

    if (fileUploaded.type.split('/')[0] == 'image') {
      fileType = 'image';
    }

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const postsRef = doc(collection(db, 'posts'));
          const data = {
            userName: user.displayName,
            profilePic: user.photoURL,
            message: message,
            timestamp: serverTimestamp(),
            userId: user.uid,
          };
          if (fileType == 'image') {
            data.image = downloadURL;
          } else {
            data.videoUrl = downloadURL;
          }
          await setDoc(postsRef, data);
        });
      }
    );
    setMessage('');
    setFileUploaded(null);
    e.target.value = null;
  };

  return (
    <div className='messageSender'>
      <div className='messageSenderContainer'>
        <div className='messageSender__top'>
          {matches ? <Avatar /> : ''}

          <form onSubmit={handleSubmit}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='whats on your mind'
              type='text'
              className='messageSender__input'
            />
            <input
              placeholder='image URL (Optional)'
              type='file'
              onChange={(e) => setFileUploaded(e.target.files[0])}
            />

            <IconButton type='submit' onClick={() => handleSubmit()}>
              <SendIcon />
            </IconButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
