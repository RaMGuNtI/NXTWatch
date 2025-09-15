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
import { RootAppStore } from '../../Store/RootAppStore';
interface GamingPageProps {
  rootAppStore?: RootAppStore;
}

class GamingPage extends Component<GamingPageProps> {
  componentDidMount(): void {
    this.props.rootAppStore?.videoStore.fetchGamingVideos();
  }

  renderDisplayVideos = () => {
    const { fetchedVideos } = this.props.rootAppStore!.videoStore;
    return (
      <DisplayGamingVideos>
        {fetchedVideos?.videos.map((each, idx) => (
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
    const { videoStore, themeStore } = this.props.rootAppStore!;
    return (
      <ThemeProvider theme={{ mode: themeStore.theme }}>
        {videoStore.apiStatus === 'pending' ? (
          <Loader />
        ) : (
          this.renderGamingPage()
        )}
      </ThemeProvider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(GamingPage));
