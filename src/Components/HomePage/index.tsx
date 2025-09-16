import BannerAd from '../BannerAd';
import {
  DisplayVideos,
  HomePageBox,
  NotFound,
  VideosSection,
} from './styledComp';
import Loader from '../Loader/Loader';
import IndividualVideo from '../IndividualVideo';
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import InputElement from '../InputBox';
import { observer, inject } from 'mobx-react';
import type { RootAppStore } from '../../Store/RootAppStore';
interface Props {
  rootAppStore?: RootAppStore | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
const HomePage: React.FC<Props> = ({ rootAppStore }) => {
  const { videoStore, themeStore } = rootAppStore!;
  const { theme } = themeStore;
  const {
    fetchHomepageVideos,
    searchInput,
    fetchedVideos,
    setSearchInput,
    apiStatus,
  } = videoStore;
  useEffect(() => {
    fetchHomepageVideos();
  }, []);

  const renderNotFound = () => (
    <NotFound>
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
      <h1>No Results Found</h1>
    </NotFound>
  );

  const renderDisplayVideos = () => (
    <DisplayVideos>
      {fetchedVideos?.videos.map((video) => (
        <IndividualVideo key={video.id} video={video} />
      ))}
    </DisplayVideos>
  );

  const renderHomePage = () => {
    return (
      <HomePageBox>
        <BannerAd data-testid="banner" />
        <ThemeProvider theme={{ mode: theme }}>
          <VideosSection>
            <InputElement
              searchInput={searchInput}
              setterInput={setSearchInput}
              fetchVideos={fetchHomepageVideos}
            />
            <div>
              {fetchedVideos?.videos.length === 0
                ? renderNotFound()
                : renderDisplayVideos()}
            </div>
          </VideosSection>
        </ThemeProvider>
      </HomePageBox>
    );
  };

  return apiStatus === 'pending' ? (
    <HomePageBox data-testid="loaderdiv">
      <Loader />
    </HomePageBox>
  ) : (
    <div data-testid="homepage">{renderHomePage()}</div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(HomePage));
