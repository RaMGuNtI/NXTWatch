import { makeObservable, flow, observable, action } from 'mobx';
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

class HomeStore {
  searchInput: string = '';
  fetchedVideos: FetchedVideos | undefined = undefined;
  loader: boolean = true;

  constructor() {
    makeObservable(this, {
      searchInput: observable,
      fetchedVideos: observable,
      loader: observable,
      setSearchInput: action,
      setFetchedVideos: action,
      setLoader: action,
      getvideos: flow,
    });
  }

  *getvideos(): Generator<Promise<Response>, void, unknown> {
    this.setLoader(true);
    try {
      const response = (yield fetch(
        `https://apis.ccbp.in/videos/all?search=${this.searchInput}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('Token')}`,
          },
        }
      )) as Response;
      const data = yield response.json();
      this.setFetchedVideos(data as FetchedVideos);
    } catch (error) {
      console.error('Failed to fetch Videos:', error);
    } finally {
      this.setLoader(false);
    }
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
