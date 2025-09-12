import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';

export interface Channel {
  name: string;
  profile_image_url: string;
  subscriber_count?: string;
}

export interface Video {
  channel: Channel;
  id: string;
  published_at: string;
  thumbnail_url: string;
  title: string;
  view_count: string;
}

export interface FetchedVideos {
  videos: Video[];
}

export interface VideoDetails extends Video {
  description: string;
  video_url: string;
}

type VideoStoreApiStatus = 'pending' | 'success' | 'failure';

export class VideoStore {
  fetchedVideos: FetchedVideos = { videos: [] };
  searchInput: string = '';
  apiStatus: VideoStoreApiStatus = 'pending';
  constructor() {
    makeAutoObservable(this);
  }

  fetchCatVideos = async (category: string, searchQuery?: string) => {
    this.setApiStatus('pending');
    const url =
      category === 'home'
        ? `https://apis.ccbp.in/videos/all?search=${searchQuery}`
        : `https://apis.ccbp.in/videos/${category}`;
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
        this.setFetchedVideos(resData);
        this.setApiStatus('success');
      })
      .catch(() => {
        this.setApiStatus('failure');
      });
  };

  setFetchedVideos(vid: FetchedVideos) {
    this.fetchedVideos = vid;
  }

  setApiStatus(status: VideoStoreApiStatus) {
    this.apiStatus = status;
  }

  setSearchInput(text: string) {
    this.searchInput = text;
  }

  fetchHomepageVideos() {
    this.fetchCatVideos('home', this.searchInput);
  }
  fetchTrendingVideos() {
    this.fetchCatVideos('trending');
  }
  fetchGamingVideos() {
    this.fetchCatVideos('gaming');
  }
}
