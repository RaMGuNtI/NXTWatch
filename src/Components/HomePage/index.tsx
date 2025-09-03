import { observer } from 'mobx-react';
import { Component } from 'react';
import BannerAd from '../BannerAd';
import {
  DisplayVideos,
  HomePageBox,
  InputSection,
  NotFound,
  VideosSection,
} from './styledComp';
import Cookies from 'js-cookie';
import IndividualVideo from '../IndividualVideo';
import { AppContext } from '../../Context/ThemeSaveContext';
import Loader from '../Loader/Loader';

import { homeStore } from '../../Store/homeStore';

// @observer
class HomePage extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  fetchData = (): void => {
    homeStore.setLoader(true);
    fetch(`https://apis.ccbp.in/videos/all?search=${homeStore.searchInput}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    })
      .then((res) => res.json())
      .then((res) => {
        homeStore.setFetchedVideos(res);
        homeStore.setLoader(false);
      });
  };

  componentDidMount(): void {
    this.fetchData();
  }

  renderHomePage = () => {
    const ctx = this.context;
    if (!ctx) return null;
    const { theme } = ctx;

    return (
      <HomePageBox>
        <BannerAd />
        <VideosSection
          style={{
            backgroundColor: theme === 'light' ? '' : '#181818',
            color: theme === 'light' ? '#000' : '#fff',
          }}
        >
          <InputSection>
            <input
              placeholder="Search"
              value={homeStore.searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                homeStore.setSearchInput(e.target.value)
              }
            />
            <button onClick={this.fetchData}>🔍</button>
          </InputSection>
          <div>
            {homeStore.fetchedVideos?.videos.length === 0 ? (
              <NotFound>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
                <h1>No Results Found</h1>
              </NotFound>
            ) : (
              <DisplayVideos>
                {homeStore.fetchedVideos?.videos.map((video) => (
                  <IndividualVideo key={video.id} video={video} />
                ))}
              </DisplayVideos>
            )}
          </div>
        </VideosSection>
      </HomePageBox>
    );
  };

  render() {
    return homeStore.loader ? <Loader /> : this.renderHomePage();
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(HomePage);
