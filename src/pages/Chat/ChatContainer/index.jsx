import React, { useState, useEffect, useRef } from 'react';
import './ChatContainer.css';

import { Avatar, IconButton } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Media from 'react-media';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import storage, { db } from '../../../config/firebase.config';
import {
  ref as storageReff,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import { uid } from 'react-uid';

function ChatContainer() {
  const user = useSelector(selectUser);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, `rooms/${roomId}`);
      (async () => {
        try {
          const docSnap = await getDoc(docRef);

          setRoomDetails(docSnap.data());
        } catch (e) {
          console.log('Error getting cached document:', e);
        }
      })();

      const messagesQuery = query(
        collection(db, `rooms/${roomId}/messages`),
        orderBy('timestamp', 'asc')
      );
      onSnapshot(messagesQuery, (querySnapshot) => {
        let res = [];
        querySnapshot.forEach((doc) => res.push(doc.data()));
        setMessages(res);
      });
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (roomId) {
      if (input) {
        if (file) {
          let fileName = `${nanoid()}_${file.name}`;
          const storageRef = storageReff(storage, `files/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          let fileType = '';

          if (file.type.split('/')[0] == 'image') {
            fileType = 'image';
          }

          uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              alert(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  const ref = doc(collection(db, `rooms/${roomId}/messages`));
                  const data = {
                    name: user.displayName,
                    profilePic: user.photoURL,
                    message: input,
                    timestamp: serverTimestamp(),
                    userId: user.uid,
                  };
                  if (fileType == 'image') {
                    data.image = downloadURL;
                  } else {
                    data.videoUrl = downloadURL;
                  }
                  await setDoc(ref, data);
                  setFile(null);
                  setInput('');
                }
              );
            }
          );
        } else {
          const ref = doc(collection(db, `rooms/${roomId}/messages`));
          const data = {
            name: user.displayName,
            profilePic: user.photoURL,
            message: input,
            timestamp: serverTimestamp(),
            userId: user.uid,
          };
          await setDoc(ref, data);
        }
      }
    } else {
      alert('select Room name');
    }
    setInput('');
  };

  const commentsEndRef = useRef(null);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return roomId ? (
    <div className='chatbox'>
      <div className='header'>
        <div className='chat__header'>
          <Media query='(max-width:800px)'>
            {(matches) => {
              return matches ? (
                <IconButton
                  onClick={() => {
                    navigate('/chat');
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                ' '
              );
            }}
          </Media>
          <Avatar src={roomDetails.imageUrl} />
          <div className='chat__headerInfo'>
            <h3>{roomDetails.name}</h3>
          </div>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map((message) => (
          <div
            key={uid(message)}
            className={`chat__message ${
              message.name == user.displayName && 'chat__reciever'
            }`}
          >
            <Avatar src={message.profilePic} />
            <div className='chat__messageContainer'>
              <span className='chat__sender'> {message.name} </span>
              <div className='text__ellipsis'>
                {message.image || message.videoUrl ? (
                  <div
                    className={
                      message.image || message.videoUrl
                        ? 'message__mediabox'
                        : ''
                    }
                  >
                    {message.image ? (
                      <img src={message.image} alt='uploaded image' />
                    ) : (
                      ''
                    )}
                    {message.videoUrl ? (
                      <video
                        src={message.videoUrl}
                        width='100%'
                        height='300px'
                        controls
                        controlsList='nodownload'
                      />
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )}
                <span className='chat__messageLength'> {message.message}</span>
                {/* <ExpandMoreIcon className='chat__expandMore' /> */}
              </div>
              <span className='chat__timestamp'>
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>
      <div className='chat__footer'>
        {user.uid ? (
          <form onSubmit={sendMessage}>
            <IconButton>
              <input
                id='file-input'
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor='file-input'>
                <AttachFileOutlinedIcon />
              </label>
            </IconButton>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type a message'
            />
            <IconButton className='button' onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </form>
        ) : (
          <div className='loginMessage'>Login to send messages</div>
        )}
      </div>
    </div>
  ) : (
    <div className='chatbox__noroom'>
      <p>Group Chat</p>
      <p>Get answered your questions in group chat</p>
    </div>
  );
}

export default ChatContainer;
