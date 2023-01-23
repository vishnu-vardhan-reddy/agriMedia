import React from 'react';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import ChatContainer from '../pages/Chat/ChatContainer';
import Sidebar from '../pages/Chat/Sidebar/Sidebar';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import ErrorPage from './ErrorPage';
import PrivateRoute from './Private.route';
import Media from 'react-media';
import { Navbar } from '../components';
import '../pages/Chat/Chat.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <PrivateRoute>
      <HomePage />
      // </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/chat',
    element: (
      <Media query='(min-width:800px)'>
        {(matches) => {
          return matches ? (
            <div className='chat'>
              <Navbar home={false} />
              <div className='chatContainer'>
                <Sidebar /> <ChatContainer />{' '}
              </div>
            </div>
          ) : (
            <div className='chat'>
              <Navbar home={false} />
              <div className='chatContainer'>
                <Sidebar />
              </div>
            </div>
          );
        }}
      </Media>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':roomId',
        element: <ChatContainer />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/room/:roomId',
    element: (
      <Media query='(min-width:800px)'>
        {(matches) => {
          return matches ? (
            <div className='chat'>
              <Navbar home={false} />
              <div className='chatContainer'>
                <Sidebar />
                <ChatContainer />
              </div>
            </div>
          ) : (
            <div className='chat'>
              <Navbar home={false} />
              <div className='chatContainer'>
                <ChatContainer />
              </div>
            </div>
          );
        }}
      </Media>
    ),
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: ':roomId',
    //     element: <Chat />,
    //     errorElement: <ErrorPage />,
    //   },
    // ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;

  // return (
  //   <Routes>
  //     <Route path='login' element={<Login />} errorElement={<ErrorPage />} />
  //     <Route path='/rooms/:roomId'>
  //       <Media query='(min-width:800px)'>
  //         {(matches) => {
  //           return matches ? (
  //             <>
  //               {' '}
  //               <Sidebar /> <ChatContainer />{' '}
  //             </>
  //           ) : (
  //             <ChatContainer />
  //           );
  //         }}
  //       </Media>
  //     </Route>
  //     <Route path='/chat'>
  //       <Media query='(min-width:800px)'>
  //         {(matches) => {
  //           return matches ? (
  //             <>
  //               {' '}
  //               <Sidebar /> <ChatContainer />{' '}
  //             </>
  //           ) : (
  //             <Sidebar />
  //           );
  //         }}
  //       </Media>
  //     </Route>
  //   </Routes>
  // );
};

export default Routes;
