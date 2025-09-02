import { Component, type ReactNode } from 'react';
import { type WithNavigationProps, withNavigation } from '../../withNavigation';
import Cookies from 'js-cookie';
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
  liked: boolean;
  disliked: boolean;
}

class VideoPlayer extends Component<WithNavigationProps, VideoPlayerState> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  state: VideoPlayerState = {
    fetchedVideo: undefined,
    embedId: '',
    liked: false,
    disliked: false,
  };

  fetchData = (): void => {
    fetch(`https://apis.ccbp.in/videos/${this.props.param.id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          fetchedVideo: res.video_details,
          embedId: res.video_details.video_url.split('=')[1],
        });
      });
  };

  componentDidMount(): void {
    this.fetchData();
  }

  handleLike = () => {
    this.setState((prev) => ({
      liked: !prev.liked,
      disliked: prev.liked ? prev.disliked : false, // if liked, remove dislike
    }));
  };

  handleDislike = () => {
    this.setState((prev) => ({
      disliked: !prev.disliked,
      liked: prev.disliked ? prev.liked : false, // if disliked, remove like
    }));
  };

  render(): ReactNode {
    const ctx = this.context;
    if (!ctx) return null;

    const { theme, savedVideos, addVideo, removeVideo } = ctx;
    const { fetchedVideo, embedId, liked, disliked } = this.state;

    if (!fetchedVideo) return null;

    const isSaved = savedVideos.some((v) => v.id === fetchedVideo.id);

    return (
      <VideoPlayerUI
        className={theme === 'light' ? 'light-theme' : 'dark-theme'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {/* 🎬 YouTube Player */}
        <div>
          <YoutubeVideo
            src={`https://www.youtube.com/embed/${embedId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></YoutubeVideo>
        </div>

        {/* 📌 Video Info Section */}
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

              {/* 👍👎 Save Buttons */}
              <VideoLikeDisLikeSave>
                <div onClick={this.handleLike} style={{ cursor: 'pointer' }}>
                  <BiLike color={liked ? 'blue' : 'inherit'} />{' '}
                  <b style={{ color: liked ? 'blue' : 'inherit' }}>Like</b>
                </div>
                <div onClick={this.handleDislike} style={{ cursor: 'pointer' }}>
                  <BiDislike color={disliked ? 'red' : 'inherit'} />{' '}
                  <b style={{ color: disliked ? 'red' : 'inherit' }}>Dislike</b>
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

            {/* 📢 Channel Info */}
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

const VideoPlay = withNavigation(VideoPlayer);
export default VideoPlay;
