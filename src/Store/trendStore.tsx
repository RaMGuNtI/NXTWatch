// import { makeAutoObservable } from 'mobx';

import { makeObservable, observable, action } from 'mobx';
// import { runInAction } from 'mobx';
import Cookies from 'js-cookie';
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
    // makeAutoObservable(this);
    makeObservable(this, {
      fetchedVideos: observable,
      loader: observable,
      setFetchedVideos: action,
      setLoader: action,
      getvideos: action,
    });
  }

  async getvideos(): Promise<void> {
    this.loader = true;
    const response = await fetch(`https://apis.ccbp.in/videos/trending`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Cookies.get('Token')}` },
    });
    const data = await response.json();
    // this.setFetchedVideos(data);
    // (only if you directly update)🔻 In async functions after await key is below lines not taken as action items so for that we have to use runInAction method to say mobx that it is also a action
    // runInAction(() => {
    //   this.fetchedVideos = data;
    //   this.loader = false;
    // });
    this.setFetchedVideos(data);
    this.setLoader(false);
  }

  setFetchedVideos(vids: FetchedVideos): void {
    this.fetchedVideos = vids;
  }
  setLoader(status: boolean): void {
    this.loader = status;
  }
}

export const trendStore = new TrendStore();
