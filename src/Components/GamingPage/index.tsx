import { Component } from 'react';
import Cookies from 'js-cookie';
import { IoGameController } from 'react-icons/io5';
import IndividualGaming from '../IndividualGaming';
import {
  DisplayGamingVideos,
  GamePageBox,
  PageSectionName,
} from './styledComp';
import { AppContext } from '../../Context/ThemeSaveContext';
import Loader from '../Loader/Loader';
interface GamingPageStates {
  fetchedVideos:
    | {
        videos: {
          id: string;
          thumbnail_url: string;
          title: string;
          view_count: string;
        }[];
      }
    | undefined;
  loader: boolean;
}

class GamingPage extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  state: GamingPageStates = {
    fetchedVideos: undefined,
    loader: true,
  };
  fetchData = (): void => {
    fetch(`https://apis.ccbp.in/videos/gaming`, {
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

  renderGamingPage = () => {
    const ctx = this.context;
    if (!ctx) return null;
    const { theme } = ctx;
    return (
      <GamePageBox
        style={{
          backgroundColor: theme === 'light' ? '#fff' : '#181818',
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <PageSectionName>
          <IoGameController style={{ fontSize: '50px', color: 'red' }} />
          <h1>Gaming</h1>
        </PageSectionName>
        <DisplayGamingVideos>
          {this.state.fetchedVideos &&
            this.state.fetchedVideos.videos.map((each) => {
              return <IndividualGaming game={each} />;
            })}
        </DisplayGamingVideos>
      </GamePageBox>
    );
  };

  render() {
    return this.state.loader ? <Loader /> : this.renderGamingPage();
  }
}

export default GamingPage;
