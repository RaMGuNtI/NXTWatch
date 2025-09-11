import { action, flow, makeObservable, observable } from 'mobx';
import Cookies from 'js-cookie';
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

export class VideoStore {
  fetchedVideo: VideoDetails | undefined = undefined;
  embedId: string = '';
  constructor() {
    makeObservable(this, {
      fetchedVideo: observable,
      embedId: observable,
      setEmbedId: action,
      getvideos: flow,
      setFetchedVideos: action,
    });
  }

  setEmbedId(id: string): void {
    this.embedId = id;
  }

  *getvideos(
    id: string | undefined
  ): Generator<Promise<Response>, void, unknown> {
    const response = (yield fetch(`https://apis.ccbp.in/videos/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    })) as Response;
    const data = (yield response.json()) as { video_details: VideoDetails };
    this.setFetchedVideos(data.video_details);
    this.setEmbedId(data.video_details.video_url.split('=')[1] as string);
  }

  setFetchedVideos(vid: VideoDetails) {
    this.fetchedVideo = vid;
  }
}

export const videoPlayStore = new VideoStore();
