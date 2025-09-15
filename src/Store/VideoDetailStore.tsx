import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import { type Video } from './VideoStore';

export interface VideoDetails extends Video {
  description: string;
  video_url: string;
}

type VideoStoreApiStatus = 'pending' | 'success' | 'failure';

export class VideoDetailStore {
  fetchedVideos: VideoDetails | undefined = undefined;
  apiStatus: VideoStoreApiStatus = 'pending';
  embedId: string = '';
  constructor() {
    makeAutoObservable(this);
  }

  fetchCatVideos = async (videoId: string) => {
    this.setApiStatus('pending');
    const url = `https://apis.ccbp.in/videos/${videoId}`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('Token')}`,
      },
    };
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        this.setFetchedVideos(resData.video_details);
        this.setEmbedId(
          resData.video_details.video_url.split('=')[1] as string
        );
        this.setApiStatus('success');
      })
      .catch(() => {
        this.setApiStatus('failure');
      });
  };

  setFetchedVideos(vid: VideoDetails) {
    this.fetchedVideos = vid;
  }

  setApiStatus(status: VideoStoreApiStatus) {
    this.apiStatus = status;
  }

  setEmbedId(id: string) {
    this.embedId = id;
  }
  fetchVideoIndetail(id: string | undefined) {
    if (id) this.fetchCatVideos(id);
  }
}


