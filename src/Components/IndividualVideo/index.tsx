import { Component } from 'react';
import {
  AboutVideo,
  ChannelInfo,
  ChannelName,
  PublisherInfo,
  ThumbnailImage,
  VideoBox,
  VideoTitle,
  VideoViews,
} from './styledComp';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import type { RootStore } from '../../Store/rootStore';

interface IndividualVideoInterface {
  video: {
    channel: { name: string; profile_image_url: string };
    id: string;
    published_at: string;
    thumbnail_url: string;
    title: string;
    view_count: string;
  };
  rootStore?: RootStore;
}

class IndividualVideo extends Component<IndividualVideoInterface> {
  render() {
    const { video, rootStore } = this.props;
    if (!rootStore) return null;
    const theme = rootStore.themeStore.theme;

    const linkStyle = {
      textDecoration: 'none',
      color: theme === 'light' ? '#000' : '#fff',
    };

    const boxStyle = {
      backgroundColor: theme === 'light' ? '#fff' : '#181818',
      color: theme === 'light' ? '#000' : '#fff',
    };

    return (
      <Link style={linkStyle} to={`/videos/${video.id}`}>
        <VideoBox style={boxStyle}>
          <ThumbnailImage src={video.thumbnail_url} alt="Video thumbnail" />
          <AboutVideo>
            <ChannelInfo>
              <img src={video.channel.profile_image_url} alt="Channel" />
            </ChannelInfo>
            <PublisherInfo>
              <VideoTitle>{video.title}</VideoTitle>
              <ChannelName>{video.channel.name}</ChannelName>
              <VideoViews>
                <p>{video.view_count} views</p>
                <p>•</p>
                <p>{video.published_at}</p>
              </VideoViews>
            </PublisherInfo>
          </AboutVideo>
        </VideoBox>
      </Link>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootStore')(observer(IndividualVideo));
