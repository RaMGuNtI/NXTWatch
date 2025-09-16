// Components/VideoPlayer/index.tsx
import { Component, type ReactNode } from 'react';
import { type WithNavigationProps, withNavigation } from '../../withNavigation';
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
  YoutubeVideoDiv,
} from './styledComp';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from '../../Store/RootAppStore';
interface StoreProps {
  rootAppStore?: RootAppStore;
}
type Props = StoreProps & WithNavigationProps;

class VideoPlayer extends Component<Props> {
  componentDidMount(): void {
    const { rootAppStore } = this.props!;
    rootAppStore?.videoDetailStore.fetchVideoIndetail(this.props.param.id);
  }

  render(): ReactNode {
    const { rootAppStore } = this.props!;
    const { themeStore, saveVideoStore, videoDetailStore } = rootAppStore!;
    const { theme } = themeStore;
    const { fetchedVideos, embedId } = videoDetailStore;
    const {
      savedVideos,
      addVideo,
      removeVideo,
      videoReactions,
      toggleLike,
      toggleDislike,
    } = saveVideoStore;

    if (!fetchedVideos) return null;

    const isSaved = savedVideos.some((v) => v.id === fetchedVideos.id);
    const reaction = videoReactions.find((r) => r.id === fetchedVideos.id) || {
      liked: false,
      disliked: false,
    };

    return (
      <VideoPlayerUI
        className={theme === 'light' ? 'light-theme' : 'dark-theme'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <YoutubeVideoDiv>
          <YoutubeVideo
            src={`https://www.youtube.com/embed/${embedId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </YoutubeVideoDiv>

        <VideoInfo>
          <VideoTitle>
            <p>{fetchedVideos.title}</p>
          </VideoTitle>

          <VideoChannelDescription>
            <VideoCountLikeInfo>
              <VideoCountPub>
                <p>{fetchedVideos.view_count} views</p>
                <LuDot />
                <p>{fetchedVideos.published_at}</p>
              </VideoCountPub>

              <VideoLikeDisLikeSave>
                <div
                  onClick={() => toggleLike(fetchedVideos.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <BiLike color={reaction.liked ? 'blue' : 'inherit'} />
                  <b style={{ color: reaction.liked ? 'blue' : 'inherit' }}>
                    Like
                  </b>
                </div>
                <div
                  onClick={() => toggleDislike(fetchedVideos.id)}
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
                      ? removeVideo(fetchedVideos.id)
                      : addVideo(fetchedVideos)
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
                <img src={fetchedVideos.channel.profile_image_url} />
              </ChannelLogoBox>
              <ChannelNameSubCountDes>
                <div>
                  <ChannelName>
                    <b>{fetchedVideos.channel.name}</b>
                  </ChannelName>
                  <ChannelSubCount>
                    {fetchedVideos.channel.subscriber_count} subscribers
                  </ChannelSubCount>
                </div>
                <h6>{fetchedVideos.description}</h6>
              </ChannelNameSubCountDes>
            </VideoDescription>
          </VideoChannelDescription>
        </VideoInfo>
      </VideoPlayerUI>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withNavigation(inject('rootAppStore')(observer(VideoPlayer)));
