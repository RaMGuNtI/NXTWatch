import React, { useContext } from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
  type Params,
} from 'react-router-dom';
import { AppContext } from './Context/ThemeSaveContext';
export interface WithNavigationProps {
  navigate: (path: string) => void;
  location: ReturnType<typeof useLocation>;
  param: Readonly<Params<string>>;
}

export function withNavigation<P extends object>(
  Component: React.ComponentType<P & WithNavigationProps>
) {
  return function WrappedComponent(props: P) {
    console.log(useContext(AppContext));
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();
    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        param={param}
      />
    );
  };
}
