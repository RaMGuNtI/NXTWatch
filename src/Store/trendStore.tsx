import { makeAutoObservable } from 'mobx';

interface Video {
  channel: { name: string; profile_image_url: string };
  id: string;
  published_at: string;
  thumbnail_url: string;
  title: string;
  view_count: string;
}

interface FetchedVideos {
  videos: Video[];
}

class TrendStore {
  fetchedVideos: FetchedVideos | undefined = undefined;
  loader = true;
  constructor() {
    makeAutoObservable(this);
  }
  setFetchedVideos(vids: FetchedVideos): void {
    this.fetchedVideos = vids;
  }
  setLoader(status: boolean): void {
    this.loader = status;
  }
}

export const trendStore = new TrendStore();
