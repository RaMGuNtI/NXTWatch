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
import { gameStore } from '../../Store/gamingStore';
import { observer } from 'mobx-react';

class GamingPage extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  fetchData = (): void => {
    gameStore.setLoader(true);
    fetch(`https://apis.ccbp.in/videos/gaming`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    })
      .then((res) => res.json())
      .then((res) => {
        gameStore.setFetchedVideos(res);
        gameStore.setLoader(false);
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
          {gameStore.fetchedVideos &&
            gameStore.fetchedVideos.videos.map((each) => {
              return <IndividualGaming game={each} />;
            })}
        </DisplayGamingVideos>
      </GamePageBox>
    );
  };

  render() {
    return gameStore.loader ? <Loader /> : this.renderGamingPage();
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(GamingPage);
