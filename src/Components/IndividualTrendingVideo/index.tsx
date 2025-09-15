import { Component } from 'react';
import {
  ChannelName,
  PublisherInfo,
  ThumbnailImage,
  VideoBox,
  VideoTitle,
  VideoViews,
} from './styledComp';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from '../../Store/rootAppStore';
interface IndividualVideoInterface {
  video: {
    channel: { name: string; profile_image_url: string };
    id: string;
    published_at: string;
    thumbnail_url: string;
    title: string;
    view_count: string;
  };
  rootAppStore?: RootAppStore;
}

class IndividualTrendingVideo extends Component<IndividualVideoInterface> {
  render() {
    const { video, rootAppStore } = this.props;
    if (!rootAppStore) return null;
    const theme = rootAppStore.themeStore.theme;

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
          <PublisherInfo>
            <VideoTitle>{video.title}</VideoTitle>
            <ChannelName>{video.channel.name}</ChannelName>
            <VideoViews>
              <p>{video.view_count} views</p>
              <p>•</p>
              <p>{video.published_at}</p>
            </VideoViews>
          </PublisherInfo>
        </VideoBox>
      </Link>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(IndividualTrendingVideo));
