import BannerAd from '../BannerAd';
import {
  DisplayVideos,
  HomePageBox,
  NotFound,
  VideosSection,
} from './styledComp';
import Loader from '../Loader/Loader';
import IndividualVideo from '../IndividualVideo';
// import { observer } from 'mobx-react';
// import { Component } from 'react';
import { AppContext } from '../../Context/ThemeSaveContext';
// import { homeStore } from '../../Store/homeStore';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import InputElement from '../InputBox';
interface Video {
  channel: { name: string; profile_image_url: string };
  id: string;
  published_at: string;
  thumbnail_url: string;
  title: string;
  view_count: string;
}

interface FetchedVideos {
  videos: Video[];
}

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [fetchedVideos, setFetchedVideos] = useState<FetchedVideos | null>(
    null
  );
  const [loader, setLoader] = useState(true);
  const ctx = useContext(AppContext);

  const fetchVideos = () => {
    setLoader(true);
    fetch(`https://apis.ccbp.in/videos/all?search=${searchInput}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchedVideos(res);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchVideos();
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
    if (!ctx) return <div data-testid="ctx">theme not defined</div>;
    const { theme } = ctx;
    return (
      <HomePageBox>
        <BannerAd data-testid="banner" />
        <ThemeProvider theme={{ mode: theme }}>
          <VideosSection>
            <InputElement
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              fetchVideos={fetchVideos}
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
    <div data-testid="loaderdiv">
      <Loader />
    </div>
  ) : (
    <div data-testid="homepage">{renderHomePage()}</div>
  );
};

export default HomePage;
