import { Component } from 'react';
// import Cookies from 'js-cookie';
import { HiFire } from 'react-icons/hi';
import IndividualTrendingVideo from '../IndividualTrendingVideo';
import { PageSectionName, TrendingPageUI } from './styledComp';
import { AppContext } from '../../Context/ThemeSaveContext';
import Loader from '../Loader/Loader';
import { trendStore } from '../../Store/trendStore';
import { observer } from 'mobx-react';

class TrendingPage extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  // fetchData = (): void => {
  //   trendStore.setLoader(true);
  //   fetch(`https://apis.ccbp.in/videos/trending`, {
  //     method: 'GET',
  //     headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       trendStore.setFetchedVideos(res);
  //       trendStore.setLoader(false);
  //     });
  // };

  componentDidMount(): void {
    // this.fetchData();
    trendStore.getvideos();
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
          {trendStore.fetchedVideos &&
            trendStore.fetchedVideos.videos.map((each) => {
              return <IndividualTrendingVideo video={each} />;
            })}
        </div>
      </TrendingPageUI>
    );
  };
  render() {
    return trendStore.loader ? <Loader /> : this.renderTrendingPage();
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(TrendingPage);
