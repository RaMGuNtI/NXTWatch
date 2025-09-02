import { Component } from 'react';
import Cookies from 'js-cookie';
import { HiFire } from 'react-icons/hi';

import IndividualTrendingVideo from '../IndividualTrendingVideo';
import { PageSectionName, TrendingPageUI } from './styledComp';
import { AppContext } from '../../Context/ThemeSaveContext';
import Loader from '../Loader/Loader';
interface TrendingPageStates {
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
class TrendingPage extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  state: TrendingPageStates = {
    fetchedVideos: undefined,
    loader: true,
  };
  fetchData = (): void => {
    fetch(`https://apis.ccbp.in/videos/trending`, {
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
  renderTrendingPage = () => {
    const ctx = this.context;
    if (!ctx) return null;
    const { theme } = ctx;
    return (
      <TrendingPageUI
        style={{
          backgroundColor: theme === 'light' ? '#fff' : '#181818',
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <PageSectionName>
          <HiFire color="red" style={{ fontSize: '50px' }} />
          <h1>Trending</h1>
        </PageSectionName>
        <div>
          {this.state.fetchedVideos &&
            this.state.fetchedVideos.videos.map((each) => {
              console.log(each);
              return <IndividualTrendingVideo video={each} />;
            })}
        </div>
      </TrendingPageUI>
    );
  };
  render() {
    return this.state.loader ? <Loader /> : this.renderTrendingPage();
  }
}

export default TrendingPage;
