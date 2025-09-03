import { Component } from 'react';
import IndividualTrendingVideo from '../IndividualTrendingVideo';
import { AppContext } from '../../Context/ThemeSaveContext';
import { NoSaveDiv, SavedVidUI } from './styledComp';
import { PageSectionName } from '../TrendingPage/styledComp';
import { HiFire } from 'react-icons/hi';
class SavedVideos extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  render() {
    const ctx = this.context;
    if (!ctx) return null;
    const { theme, savedVideos } = ctx;
    return (
      <SavedVidUI
        style={{
          backgroundColor: theme === 'light' ? '' : '#272424',
          color: theme === 'light' ? '#000000' : '#ffffff',
        }}
      >
        <PageSectionName>
          <HiFire color="red" style={{ fontSize: '50px' }} />
          <h1>Saved Videos</h1>
        </PageSectionName>

        {savedVideos.length === 0 ? (
          <NoSaveDiv>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" />
            <h1>No Saved Posts</h1>
          </NoSaveDiv>
        ) : (
          savedVideos.map((each) => <IndividualTrendingVideo video={each} />)
        )}
      </SavedVidUI>
    );
  }
}

export default SavedVideos;
