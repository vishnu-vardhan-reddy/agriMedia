import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import MessageSender from './MessageSender';
import Post from './Post/Post';
import './Feed.css';
import { db } from '../../config/firebase.config';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import Iframe from 'react-iframe';
import { useMediaQuery } from '@mui/material';
import { Chart } from 'react-google-charts';
import {
  barData,
  barOptions,
  lineData,
  lineOptions,
  pieData,
  pieOptions,
} from './chartData';

const Feed = () => {
  const matches = useMediaQuery('(min-width:800px)');
  const [posts, setPosts] = useState([]);

  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      let res = [];
      querySnapshot.forEach((doc) =>
        res.push({ id: doc.id, data: doc.data() })
      );
      console.log(res);
      setPosts(res);
    });
  }, []);

  useEffect(() => {
    const script = document.createElement('script');

    const element = document.getElementById('64edac1f_1671339705');

    if (element) {
      script.async = true;
      script.src = 'https://www.powr.io/powr.js?platform=html';
      element.appendChild(script);
    }

    return () => {
      if (element) element.removeChild(script);
    };
  }, []);

  return (
    <div className='feed'>
      <div className='feedContainer'>
        <div className='feedContainerLeft'>
          {matches ? (
            <>
              <div className='powr-weather' id='64edac1f_1671339705'></div>
              <script src='https://www.powr.io/powr.js?platform=html'></script>
            </>
          ) : (
            ''
          )}
        </div>
        <div className='feedContainerMiddle'>
          <MessageSender />
          {posts.map((post) => (
            <Post
              key={uid(post)}
              postId={post.id}
              profilePic={post.data.profilePic}
              message={post.data.message}
              timestamp={post.data.timestamp}
              userName={post.data.userName}
              image={post.data?.image || ''}
              videoUrl={post.data.videoUrl || ''}
            />
          ))}
        </div>
        <div className='feedContainerRight'>
          <div className='feedContainerRight__card'>
            <Chart
              chartType='ScatterChart'
              data={[
                ['Age', 'Weight'],
                [4, 5.5],
                [8, 12],
              ]}
              width='100%'
              height='100%'
              legendToggle
            />
          </div>
          <div className='feedContainerRight__card'>
            <Chart
              chartType='Bar'
              width='100%'
              height='100%'
              data={barData}
              options={barOptions}
            />
          </div>
          <div className='feedContainerRight__card'>
            <Chart
              chartType='PieChart'
              data={pieData}
              options={pieOptions}
              width={'100%'}
              height={'100%'}
            />
          </div>
          <div className='feedContainerRight__card'>
            <Chart
              chartType='Line'
              width='100%'
              height='100%'
              data={lineData}
              options={lineOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
