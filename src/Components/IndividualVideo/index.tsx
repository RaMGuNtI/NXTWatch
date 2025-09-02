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
import { AppContext } from '../../Context/ThemeSaveContext';
interface IndividualVideoInterface {
  video: {
    channel: { name: string; profile_image_url: string };
    id: string;
    published_at: string;
    thumbnail_url: string;
    title: string;
    view_count: string;
  };
}

class IndividualVideo extends Component<IndividualVideoInterface> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  render() {
    const { video } = this.props;
    const ctx = this.context;
    if (!ctx) return null;
    const { theme } = ctx;
    return (
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/videos/${video.id}`}
      >
        <VideoBox
          style={{
            backgroundColor: theme === 'light' ? '#fff' : '#181818',
            color: theme === 'light' ? '#000' : '#fff',
          }}
        >
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

export default IndividualVideo;
