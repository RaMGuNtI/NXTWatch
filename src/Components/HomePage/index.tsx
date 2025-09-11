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
import type { RootStore } from '../../Store/rootStore';

interface Props {
  rootStore?: RootStore | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
const HomePage: React.FC<Props> = ({ rootStore }) => {
  const { homeStore, themeStore } = rootStore!;

  const { loader, searchInput, fetchedVideos, getvideos, setSearchInput } =
    homeStore;
  useEffect(() => {
    getvideos();
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
        <ThemeProvider theme={{ mode: themeStore.theme }}>
          <VideosSection>
            <InputElement
              searchInput={searchInput}
              setterInput={setSearchInput}
              fetchVideos={getvideos}
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

  return loader ? (
    <HomePageBox data-testid="loaderdiv">
      <Loader />
    </HomePageBox>
  ) : (
    <div data-testid="homepage">{renderHomePage()}</div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootStore')(observer(HomePage));
