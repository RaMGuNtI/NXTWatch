import React from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
  type Params,
} from 'react-router-dom';
export interface WithNavigationProps {
  navigate: (path: string) => void;
  location: ReturnType<typeof useLocation>;
  param: Readonly<Params<string>>;
}

export function withNavigation<P>(
  Component: React.ComponentType<P & WithNavigationProps>
) {
  return function WrappedComponent(props: P) {
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
