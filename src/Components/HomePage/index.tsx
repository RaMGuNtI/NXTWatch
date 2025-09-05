import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BannerAd from '../BannerAd';
import {
  DisplayVideos,
  HomePageBox,
  InputSection,
  NotFound,
  VideosSection,
} from './styledComp';
import Loader from '../Loader/Loader';
import IndividualVideo from '../IndividualVideo';
import { AppContext } from '../../Context/ThemeSaveContext';
interface Video {
  channel: { name: string; profile_image_url: string };
  id: string;
  published_at: string;
  thumbnail_url: string;
  title: string;
  view_count: string;
}

interface FetchedVideos {
  videos: Video[];
}

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [fetchedVideos, setFetchedVideos] = useState<FetchedVideos | null>(
    null
  );
  const [loader, setLoader] = useState(true);
  const ctx = useContext(AppContext);

  const fetchVideos = () => {
    setLoader(true);
    fetch(`https://apis.ccbp.in/videos/all?search=${searchInput}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchedVideos(res);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const renderNotFound = () => (
    <NotFound>
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
      <h1>No Results Found</h1>
    </NotFound>
  );

  const renderDisplayVideos = () => (
    <DisplayVideos>
      {fetchedVideos?.videos.map((video) => (
        <IndividualVideo key={video.id} video={video} />
      ))}
    </DisplayVideos>
  );

  const renderHomePage = () => {
    if (!ctx) return null;
    const { theme } = ctx;
    return (
      <HomePageBox>
        <BannerAd />
        <VideosSection
          style={{
            backgroundColor: theme === 'light' ? '' : '#181818',
            color: theme === 'light' ? '#000' : '#fff',
          }}
        >
          <InputSection>
            <input
              placeholder="Search"
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
            />
            <button onClick={() => fetchVideos()}>🔍</button>
          </InputSection>
          <div>
            {fetchedVideos?.videos.length === 0
              ? renderNotFound()
              : renderDisplayVideos()}
          </div>
        </VideosSection>
      </HomePageBox>
    );
  };

  return loader ? <Loader /> : renderHomePage();
};

export default HomePage;

// import { observer } from 'mobx-react';
// import { Component } from 'react';
// import { AppContext } from '../../Context/ThemeSaveContext';
// import { homeStore } from '../../Store/homeStore';
// // @observer
// class HomePage extends Component {
//   static contextType = AppContext;
//   declare context: React.ContextType<typeof AppContext>;

//   // fetchData = (): void => {
//   //   homeStore.setLoader(true);
//   //   fetch(`https://apis.ccbp.in/videos/all?search=${homeStore.searchInput}`, {
//   //     method: 'GET',
//   //     headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
//   //   })
//   //     .then((res) => res.json())
//   //     .then((res) => {
//   //       homeStore.setFetchedVideos(res);
//   //       homeStore.setLoader(false);
//   //     });
//   // };

//   componentDidMount(): void {
//     // this.fetchData();
//     homeStore.getvideos();
//   }

//   renderNotFound = () => (
//     <NotFound>
//       <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
//       <h1>No Results Found</h1>
//     </NotFound>
//   );

//   renderDisplayVideos = () => (
//     <DisplayVideos>
//       {homeStore.fetchedVideos?.videos.map((video) => (
//         <IndividualVideo key={video.id} video={video} />
//       ))}
//     </DisplayVideos>
//   );

//   renderHomePage = () => {
//     const ctx = this.context;
//     if (!ctx) return null;
//     const { theme } = ctx;
//     return (
//       <HomePageBox>
//         <BannerAd />
//         <VideosSection
//           style={{
//             backgroundColor: theme === 'light' ? '' : '#181818',
//             color: theme === 'light' ? '#000' : '#fff',
//           }}
//         >
//           <InputSection>
//             <input
//               placeholder="Search"
//               value={homeStore.searchInput}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 homeStore.setSearchInput(e.target.value)
//               }
//             />
//             <button onClick={() => homeStore.getvideos()}>🔍</button>
//           </InputSection>
//           <div>
//             {homeStore.fetchedVideos?.videos.length === 0
//               ? this.renderNotFound()
//               : this.renderDisplayVideos()}
//           </div>
//         </VideosSection>
//       </HomePageBox>
//     );
//   };

//   render() {
//     return homeStore.loader ? <Loader /> : this.renderHomePage();
//   }
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export default observer(HomePage);
