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
interface HomePageStates {
  searchInput: string;
  fetchedVideos:
    | {
        videos: {
          channel: { name: string; profile_image_url: string };
          id: string;
          published_at: string;
          thumbnail_url: string;
          title: string;
          view_count: string;
        }[];
      }
    | undefined;
  loader: boolean;
}

class HomePage extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  state: HomePageStates = {
    searchInput: '',
    fetchedVideos: undefined,
    loader: true,
  };

  fetchData = (): void => {
    fetch(`https://apis.ccbp.in/videos/all?search=${this.state.searchInput}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ fetchedVideos: res, loader: false });
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
              value={this.state.searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ searchInput: e.target.value })
              }
            />
            <button onClick={this.fetchData}>🔍</button>
          </InputSection>
          <div>
            {this.state.fetchedVideos?.videos.length == 0 ? (
              <NotFound>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
                <h1>No Results Found</h1>
              </NotFound>
            ) : (
              <DisplayVideos>
                {this.state.fetchedVideos &&
                  this.state.fetchedVideos.videos.map((video) => {
                    return <IndividualVideo key={video.id} video={video} />;
                  })}
              </DisplayVideos>
            )}
          </div>
        </VideosSection>
      </HomePageBox>
    );
  };

  render() {
    return this.state.loader ? <Loader /> : this.renderHomePage();
  }
}

export default HomePage;
