import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginWithGoogle from '../../apis/login.api';
import { selectUser, setUser } from '../../features/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user.email) {
      navigate('/');
    }
  });

  const handleGoogleLogin = async () => {
    const { result, credential } = await loginWithGoogle();
    localStorage.setItem(
      'AGRIMEDIA_ACCESS_TOKEN',
      JSON.stringify(result.user.accessToken)
    );
    console.log(result, credential);
    if (result) {
      dispatch(setUser(result.user));
      navigate('/');
    }
  };

  return (
    <div className='login'>
      <div className='loginContainer'>
        <button onClick={() => handleGoogleLogin()}>Login with google</button>
      </div>
    </div>
  );
};

export default Login;
