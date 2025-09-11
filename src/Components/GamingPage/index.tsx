import { Component } from 'react';
import { IoGameController } from 'react-icons/io5';
import IndividualGaming from '../IndividualGaming';
import {
  DisplayGamingVideos,
  GamePageBox,
  PageSectionName,
} from './styledComp';
import Loader from '../Loader/Loader';
import { observer, inject } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import type { RootStore } from '../../Store/rootStore';

interface GamingPageProps {
  rootStore?: RootStore;
}

class GamingPage extends Component<GamingPageProps> {
  componentDidMount(): void {
    this.props.rootStore?.gameStore.getvideos();
  }

  renderDisplayVideos = () => {
    const { gameStore } = this.props.rootStore!;
    return (
      <DisplayGamingVideos>
        {gameStore.fetchedVideos?.videos.map((each, idx) => (
          <IndividualGaming key={idx} game={each} />
        ))}
      </DisplayGamingVideos>
    );
  };

  renderGamingPage = () => (
    <GamePageBox>
      <PageSectionName>
        <IoGameController style={{ fontSize: '50px', color: 'red' }} />
        <h1>Gaming</h1>
      </PageSectionName>
      {this.renderDisplayVideos()}
    </GamePageBox>
  );

  render() {
    const { gameStore, themeStore } = this.props.rootStore!;
    return (
      <ThemeProvider theme={{ mode: themeStore.theme }}>
        {gameStore.loader ? <Loader /> : this.renderGamingPage()}
      </ThemeProvider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootStore')(observer(GamingPage));
