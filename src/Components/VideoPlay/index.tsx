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
import type { RootStore } from '../../Store/rootStore';

interface StoreProps {
  rootStore?: RootStore;
}
type Props = StoreProps & WithNavigationProps;

class VideoPlayer extends Component<Props> {
  componentDidMount(): void {
    const { rootStore } = this.props!;
    rootStore?.videoPlayStore.getvideos(this.props.param.id);
  }

  render(): ReactNode {
    const { rootStore } = this.props!;
    const { themeStore, saveVideoStore, videoPlayStore } = rootStore!;
    const { theme } = themeStore;
    const { fetchedVideo, embedId } = videoPlayStore;
    const {
      savedVideos,
      addVideo,
      removeVideo,
      videoReactions,
      toggleLike,
      toggleDislike,
    } = saveVideoStore;

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

// eslint-disable-next-line react-refresh/only-export-components
export default withNavigation(inject('rootStore')(observer(VideoPlayer)));
