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

class HomeStore {
  searchInput: string = '';
  fetchedVideos: FetchedVideos | undefined = undefined;
  loader: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchInput(text: string): void {
    this.searchInput = text;
  }

  setFetchedVideos(vids: FetchedVideos): void {
    this.fetchedVideos = vids;
  }

  setLoader(status: boolean) {
    this.loader = status;
  }
}

export const homeStore = new HomeStore();
