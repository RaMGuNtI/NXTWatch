import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { type JSX } from 'react';
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  if (Cookies.get('Token') === undefined) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
