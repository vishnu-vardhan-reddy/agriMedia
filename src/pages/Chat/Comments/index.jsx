import React, { useEffect, useRef, useState } from 'react';
import './Comments.css';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../../config/firebase.config';
import Comment from '../Comment';
import { uid } from 'react-uid';

const Comments = ({ postId }) => {
  const user = useSelector(selectUser);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const commentsQuery = query(
      collection(db, `posts/${postId}/comments`),
      orderBy('timestamp', 'asc')
    );

    onSnapshot(commentsQuery, (querySnapshot) => {
      let res = [];
      querySnapshot.forEach((doc) => res.push(doc.data()));
      setComments(res);
    });
  }, []);

  const addComment = async (e) => {
    e.preventDefault();

    if (!user.uid) {
      alert('login to upload post');
      return;
    }

    const data = {
      userName: user.displayName,
      profilePic: user.photoURL,
      comment,
      timestamp: serverTimestamp(),
      userId: user.uid,
    };
    const ref = doc(collection(db, `posts/${postId}/comments`));
    await setDoc(ref, data);
    setComment('');
  };

  const commentsEndRef = useRef(null);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className='comments'>
      <h1>comments</h1>
      <div className='commentsContainer'>
        {comments.length ? (
          comments.map((comment) => (
            <Comment
              key={uid(comment)}
              comment={comment.comment}
              profilePic={comment.profilePic}
              timestamp={comment.timestamp}
              userName={comment.userName}
            />
          ))
        ) : (
          <div className='noCommentsContainer'>No Comments</div>
        )}
        <div ref={commentsEndRef} />
      </div>
      <div className='commentsContainer__bottom'>
        <form onSubmit={addComment}>
          <input
            placeholder='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton onClick={addComment} type='submit'>
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Comments;
