import { Component } from 'react';
import { HiFire } from 'react-icons/hi';
import IndividualTrendingVideo from '../IndividualTrendingVideo';
import { PageSectionName, TrendingPageUI } from './styledComp';
import Loader from '../Loader/Loader';
import { inject, observer } from 'mobx-react';
import type { RootStore } from '../../Store/rootStore';
import { ThemeProvider } from 'styled-components';

interface Props {
  rootStore?: RootStore;
}

class TrendingPage extends Component<Props> {
  componentDidMount(): void {
    this.props.rootStore?.trendStore.getvideos();
  }

  renderTrendingPage = () => {
    const { trendStore } = this.props.rootStore!;
    return (
      <TrendingPageUI>
        <PageSectionName>
          <HiFire color="red" style={{ fontSize: '50px' }} />
          <h1>Trending</h1>
        </PageSectionName>
        <div>
          {trendStore.fetchedVideos?.videos.map((each) => (
            <IndividualTrendingVideo key={each.id} video={each} />
          ))}
        </div>
      </TrendingPageUI>
    );
  };

  render() {
    const { rootStore } = this.props;
    if (!rootStore) return null;
    const { themeStore, trendStore } = rootStore;
    const theme = themeStore.theme;

    return (
      <ThemeProvider theme={{ mode: theme }}>
        {trendStore.loader ? <Loader /> : this.renderTrendingPage()}
      </ThemeProvider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootStore')(observer(TrendingPage));
