import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import { Routes, Route } from 'react-router-dom';
import SavedVideos from './Components/SavedVideos';
import TrendingPage from './Components/TrendingPage';
import GamingPage from './Components/GamingPage';
import PageNotFound from './Components/PageNotFound';
import NavBar from './Components/NavBar';
import { useLocation } from 'react-router-dom';
import LeftPanelWithNav from './Components/LeftPanel';
import './App.css';
import VideoPlay from './Components/VideoPlay';
import ProtectedRoute from './ProtectedRoute';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from './Store/RootAppStore';
interface Props {
  rootAppStore?: RootAppStore | undefined;
}
// eslint-disable-next-line react-refresh/only-export-components
const App: React.FC<Props> = ({ rootAppStore }) => {
  const location = useLocation();
  const { themeStore } = rootAppStore!;
  const theme = themeStore.theme;
  return (
    <div
      className="main"
      style={{
        backgroundColor: theme === 'light' ? '' : '#4a4a4a',
        color: theme === 'light' ? '#4a4a4a' : '#fff',
      }}
    >
      {location.pathname !== '/login' ? (
        <div className="main">
          <div>
            <NavBar />
          </div>
          <div className="main doSome">
            <LeftPanelWithNav />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/videos/:id"
                element={
                  <ProtectedRoute>
                    <VideoPlay />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-videos"
                element={
                  <ProtectedRoute>
                    <SavedVideos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trending"
                element={
                  <ProtectedRoute>
                    <TrendingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gaming"
                element={
                  <ProtectedRoute>
                    <GamingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/not-found"
                element={
                  <ProtectedRoute>
                    <PageNotFound />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <PageNotFound />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(App));
