import { Component } from 'react';
// import Cookies from 'js-cookie';
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
import { ThemeProvider } from 'styled-components';
class GamingPage extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  // fetchData = (): void => {
  //   gameStore.setLoader(true);
  //   fetch(`https://apis.ccbp.in/videos/gaming`, {
  //     method: 'GET',
  //     headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       gameStore.setFetchedVideos(res);
  //       gameStore.setLoader(false);
  //     });
  // };

  componentDidMount(): void {
    // this.fetchData();
    gameStore.getvideos();
  }

  renderDisplayVideos = () => (
    <DisplayGamingVideos>
      {gameStore.fetchedVideos &&
        gameStore.fetchedVideos.videos.map((each, idx) => {
          return <IndividualGaming key={idx} game={each} />;
        })}
    </DisplayGamingVideos>
  );

  renderGamingPage = () => {
    return (
      <GamePageBox>
        <PageSectionName>
          <IoGameController style={{ fontSize: '50px', color: 'red' }} />
          <h1>Gaming</h1>
        </PageSectionName>
        {this.renderDisplayVideos()}
      </GamePageBox>
    );
  };

  render() {
    const ctx = this.context;
    if (!ctx) return null;
    return (
      <ThemeProvider theme={{ mode: ctx?.theme }}>
        {gameStore.loader ? <Loader /> : this.renderGamingPage()}
      </ThemeProvider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(GamingPage);
