import { action, flow, makeObservable, observable } from 'mobx';
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

class GameStore {
  fetchedVideos: FetchedVideos | undefined = undefined;
  loader = true;
  constructor() {
    makeObservable(this, {
      fetchedVideos: observable,
      loader: observable,
      setFetchedVideos: action,
      setLoader: action,
      getvideos: flow,
    });
  }

  *getvideos(): Generator<Promise<Response>, void, unknown> {
    this.setLoader(true);
    const response = (yield fetch('https://apis.ccbp.in/videos/gaming', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('Token')}`,
      },
    })) as Response;
    const data = yield response.json();
    this.setFetchedVideos(data as FetchedVideos);
    this.setLoader(false);
  }

  setFetchedVideos(vids: FetchedVideos) {
    this.fetchedVideos = vids;
  }
  setLoader(status: boolean) {
    this.loader = status;
  }
}

export const gameStore = new GameStore();
