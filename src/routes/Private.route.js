/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  if (localStorage.getItem('AGRIMEDIA_ACCESS_TOKEN')) {
    return children;
  }

  return <Navigate to='/login' replace />;
}

export default PrivateRoute;

