import React from 'react';
import './Sidebar.css';
import { useState, useEffect } from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { Avatar, IconButton } from '@mui/material';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../config/firebase.config';
import { uid } from 'react-uid';
import SidebarChat from '../Sidebarchat/SidebarChat';

function Sidebar() {
  const user = useSelector(selectUser);

  const [rooms, setRooms] = useState([]);

  const q = query(collection(db, 'rooms'));
  useEffect(() => {
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      let res = [];
      querySnapshot.forEach((doc) =>
        res.push({
          id: doc.id,
          data: doc.data(),
        })
      );
      console.log(res);
      setRooms(res);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <p>Group chats</p>
      </div>
      <div className='sidebar__chats'>
        {/* <SidebarChat addNewChat /> */}
        {rooms.map((room) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={room.data.name}
            imageUrl={room.data.imageUrl}
          />
          // <p key={uid(room)}>{room.data.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
