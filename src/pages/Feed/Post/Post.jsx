import React, { useState } from 'react';
import './Post.css';
import { Avatar, Modal } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase.config';
import Comments from '../../Chat/Comments';
import { Box } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#fff',
  // border: '2px solid #000',
  outerWidth: 'none',
  boxShadow: 24,
  p: 4,
};

const Post = ({
  profilePic,
  image,
  userName,
  timestamp,
  message,
  videoUrl,
  postId,
}) => {
  const user = useSelector(selectUser);
  const [openComment, setOpenComment] = useState(false);

  const handleDelete = async (postId) => {
    let isconfirm = window.confirm('Are you sure you want to delete');
    if (!isconfirm) return;
    await deleteDoc(doc(db, 'posts', postId));
  };

  return (
    <div className='post'>
      <div className='post__top'>
        {user.displayName == userName ? (
          <IconButton onClick={() => handleDelete(postId)}>
            <DeleteIcon />
          </IconButton>
        ) : (
          ''
        )}
        <Avatar src={profilePic} className='post__avatar' />
        <div className='post__topInfo'>
          <h3>{userName}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>

      <div className='post__bottom'>
        <p>{message}</p>
      </div>
      {image ? (
        <div className='post__image'>
          <img src={image} alt='' />
        </div>
      ) : (
        ''
      )}

      {videoUrl ? (
        <div className='post__image'>
          <video
            src={videoUrl}
            width='100%'
            height='500px'
            controls
            controlsList='nodownload'
          />
        </div>
      ) : (
        ''
      )}
      <div className='post__options'>
        <div className='post__option' onClick={() => setOpenComment(true)}>
          <CommentIcon />
          <p>Comments</p>
        </div>
        {openComment ? (
          <Modal
            open={openComment}
            onClose={() => setOpenComment(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Comments postId={postId} />
            </Box>
          </Modal>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Post;
