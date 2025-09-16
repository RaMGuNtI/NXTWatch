import { Component } from 'react';
import { HiFire } from 'react-icons/hi';
import IndividualTrendingVideo from '../IndividualTrendingVideo';
import { PageSectionName, TrendingPageUI } from './styledComp';
import Loader from '../Loader/Loader';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from '../../Store/rootAppStore';
import { ThemeProvider } from 'styled-components';

interface Props {
  rootAppStore?: RootAppStore;
}

class TrendingPage extends Component<Props> {
  componentDidMount(): void {
    this.props.rootAppStore?.videoStore.fetchTrendingVideos();
  }

  renderTrendingPage = () => {
    const { fetchedVideos } = this.props.rootAppStore!.videoStore;
    return (
      <TrendingPageUI>
        <PageSectionName>
          <HiFire color="red" style={{ fontSize: '50px' }} />
          <h1>Trending</h1>
        </PageSectionName>
        <div>
          {fetchedVideos?.videos.map((each) => (
            <IndividualTrendingVideo key={each.id} video={each} />
          ))}
        </div>
      </TrendingPageUI>
    );
  };

  render() {
    const { rootAppStore } = this.props;
    if (!rootAppStore) return null;
    const { themeStore, videoStore } = rootAppStore;
    const theme = themeStore.theme;

    return (
      <ThemeProvider theme={{ mode: theme }}>
        {videoStore.apiStatus === 'pending' ? (
          <Loader />
        ) : (
          this.renderTrendingPage()
        )}
      </ThemeProvider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(TrendingPage));
