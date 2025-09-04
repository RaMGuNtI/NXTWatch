import { Component, type ReactNode } from 'react';
import { type WithNavigationProps, withNavigation } from '../../withNavigation';
// import Cookies from 'js-cookie';
import { BiLike, BiDislike } from 'react-icons/bi';
import { HiOutlineSaveAs } from 'react-icons/hi';
import { LuDot } from 'react-icons/lu';
import {
  ChannelLogoBox,
  ChannelName,
  ChannelNameSubCountDes,
  ChannelSubCount,
  HorizontalLine,
  VideoChannelDescription,
  VideoCountLikeInfo,
  VideoCountPub,
  VideoDescription,
  VideoInfo,
  VideoLikeDisLikeSave,
  VideoPlayerUI,
  VideoTitle,
  YoutubeVideo,
} from './styledComp';
import { AppContext } from '../../Context/ThemeSaveContext';
import { videoPlayStore } from '../../Store/videoPlayStore';
import { observer } from 'mobx-react';

interface VideoDetails {
  channel: {
    name: string;
    profile_image_url: string;
    subscriber_count: string;
  };
  description: string;
  id: string;
  published_at: string;
  thumbnail_url: string;
  title: string;
  video_url: string;
  view_count: string;
}

interface VideoPlayerState {
  fetchedVideo?: VideoDetails;
  embedId: string;
}

class VideoPlayer extends Component<WithNavigationProps, VideoPlayerState> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  // state: VideoPlayerState = {
  //   fetchedVideo: undefined,
  //   embedId: '',
  // };

  // fetchData = (): void => {
  //   fetch(`https://apis.ccbp.in/videos/${this.props.param.id}`, {
  //     method: 'GET',
  //     headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       this.setState({
  //         fetchedVideo: res.video_details,
  //         embedId: res.video_details.video_url.split('=')[1],
  //       });
  //     });
  // };

  componentDidMount(): void {
    // this.fetchData();
    videoPlayStore.getvideos(this.props.param.id);
  }

  render(): ReactNode {
    const ctx = this.context;
    if (!ctx) return null;

    const {
      theme,
      savedVideos,
      addVideo,
      removeVideo,
      videoReactions,
      toggleLike,
      toggleDislike,
    } = ctx;
    const { fetchedVideo, embedId } = videoPlayStore;
    // const { fetchedVideo, embedId } = this.state;

    if (!fetchedVideo) return null;

    const isSaved = savedVideos.some((v) => v.id === fetchedVideo.id);
    const reaction = videoReactions.find((r) => r.id === fetchedVideo.id) || {
      liked: false,
      disliked: false,
    };

    return (
      <VideoPlayerUI
        className={theme === 'light' ? 'light-theme' : 'dark-theme'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {/* Video Player */}
        <div>
          <YoutubeVideo
            src={`https://www.youtube.com/embed/${embedId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Info Section */}
        <VideoInfo>
          <VideoTitle>
            <p>{fetchedVideo.title}</p>
          </VideoTitle>

          <VideoChannelDescription>
            <VideoCountLikeInfo>
              <VideoCountPub>
                <p>{fetchedVideo.view_count} views</p>
                <LuDot />
                <p>{fetchedVideo.published_at}</p>
              </VideoCountPub>

              <VideoLikeDisLikeSave>
                <div
                  onClick={() => toggleLike(fetchedVideo.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <BiLike color={reaction.liked ? 'blue' : 'inherit'} />
                  <b style={{ color: reaction.liked ? 'blue' : 'inherit' }}>
                    Like
                  </b>
                </div>
                <div
                  onClick={() => toggleDislike(fetchedVideo.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <BiDislike color={reaction.disliked ? 'red' : 'inherit'} />
                  <b style={{ color: reaction.disliked ? 'red' : 'inherit' }}>
                    Dislike
                  </b>
                </div>
                <div
                  onClick={() =>
                    isSaved
                      ? removeVideo(fetchedVideo.id)
                      : addVideo(fetchedVideo)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <HiOutlineSaveAs color={isSaved ? 'green' : 'inherit'} />
                  <b style={{ color: isSaved ? 'green' : 'inherit' }}>
                    {isSaved ? 'Unsave' : 'Save'}
                  </b>
                </div>
              </VideoLikeDisLikeSave>
            </VideoCountLikeInfo>

            <HorizontalLine />

            <VideoDescription>
              <ChannelLogoBox>
                <img src={fetchedVideo.channel.profile_image_url} />
              </ChannelLogoBox>
              <ChannelNameSubCountDes>
                <div>
                  <ChannelName>
                    <b>{fetchedVideo.channel.name}</b>
                  </ChannelName>
                  <ChannelSubCount>
                    {fetchedVideo.channel.subscriber_count} subscribers
                  </ChannelSubCount>
                </div>
                <h6>{fetchedVideo.description}</h6>
              </ChannelNameSubCountDes>
            </VideoDescription>
          </VideoChannelDescription>
        </VideoInfo>
      </VideoPlayerUI>
    );
  }
}

const VideoPlay = withNavigation(observer(VideoPlayer));
export default VideoPlay;
