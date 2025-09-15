import { Component } from 'react';
import IndividualTrendingVideo from '../IndividualTrendingVideo';
import { NoSaveDiv, SavedVidUI } from './styledComp';
import { PageSectionName } from '../TrendingPage/styledComp';
import { HiFire } from 'react-icons/hi';
import { ThemeProvider } from 'styled-components';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from '../../Store/RootAppStore';

interface Props {
  rootAppStore?: RootAppStore;
}

class SavedVideos extends Component<Props> {
  render() {
    const { rootAppStore } = this.props!;
    const { themeStore, saveVideoStore } = rootAppStore!;
    const { theme } = themeStore;
    const { savedVideos } = saveVideoStore;
    return (
      <ThemeProvider theme={{ mode: theme }}>
        <SavedVidUI>
          <PageSectionName>
            <HiFire color="red" style={{ fontSize: '50px' }} />
            <h1>Saved Videos</h1>
          </PageSectionName>

          {savedVideos.length === 0 ? (
            <NoSaveDiv>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved"
              />
              <h1>No Saved Posts</h1>
            </NoSaveDiv>
          ) : (
            savedVideos.map((each) => (
              <IndividualTrendingVideo key={each.id} video={each} />
            ))
          )}
        </SavedVidUI>
      </ThemeProvider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(SavedVideos));
