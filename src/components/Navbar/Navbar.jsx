import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { selectUser, setLogout, setUser } from '../../features/userSlice';
import appLogo from '../../assets/images/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, IconButton } from '@mui/material';
import loginWithGoogle from '../../apis/login.api';

function Navbar({ home = true }) {
  const user = useSelector(selectUser);
  const matches = useMediaQuery('(min-width:800px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('AGRIMEDIA_ACCESS_TOKEN');
    dispatch(setLogout({}));
    // navigate('/login');
  };

  const handleGoogleLogin = async () => {
    const { result, credential } = await loginWithGoogle();
    localStorage.setItem(
      'AGRIMEDIA_ACCESS_TOKEN',
      JSON.stringify(result.user.accessToken)
    );
    console.log(result, credential);
    if (result) {
      dispatch(setUser(result.user));
    }
  };

  return (
    <nav className='navbar'>
      <div className='navbarContainer'>
        <div className='navbarContainer-logo'>
          <Link to='/' className='navbar-logo'>
            <img src={appLogo} alt='logo' />
          </Link>
        </div>
        <div className='navbarContainer-action'>
          <div
            className={`navbarContainer-actionItem ${home ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            {matches ? (
              <>
                <HomeIcon />
                <p>Home</p>
              </>
            ) : (
              <HomeIcon />
            )}
          </div>
          <div
            className={`navbarContainer-actionItem ${home ? '' : 'active'}`}
            onClick={() => navigate('/chat')}
          >
            {matches ? (
              <>
                <ForumIcon />
                <p>chat</p>
              </>
            ) : (
              <ForumIcon />
            )}
          </div>
        </div>
        {user.uid ? (
          <div className='navbarContainer-profile'>
            {matches ? (
              <>
                <img
                  alt='profile'
                  src={user.photoURL}
                  referrerPolicy='no-referrer'
                />
                <p>{user.displayName}</p>
                <IconButton onClick={() => handleLogout()}>
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <img
                  alt='profile'
                  src={user.photoURL}
                  referrerPolicy='no-referrer'
                />
                <IconButton onClick={() => handleLogout()}>
                  <LogoutIcon />
                </IconButton>
              </>
            )}
          </div>
        ) : (
          <div className='navbarContainer-profile'>
            <Button variant='outlined' onClick={() => handleGoogleLogin()}>
              SignIn
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

