// stores/rootStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';

/* -------------------- Shared Types -------------------- */
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

/* -------------------- Helper -------------------- */
const API_ROOT = 'https://apis.ccbp.in/videos';
const authHeaders = () => ({ Authorization: `Bearer ${Cookies.get('Token')}` });

/* -------------------- VideoCollectionStore -------------------- */
/**
 * Reusable store to fetch lists of videos from different endpoints.
 * Use fetchAll(), fetchTrending(), fetchGaming() or fetchCustom(endpoint).
 */
export class VideoCollectionStore {
  fetchedVideos: FetchedVideos | { videos: [] } = { videos: [] };
  loader = true;
  lastEndpoint: string | null = null; // helpful for debugging / caching strategies later

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchEndpoint(endpoint: string, query?: string): Promise<void> {
    this.loader = true;
    this.lastEndpoint = endpoint + (query ? `?${query}` : '');
    try {
      const url = query
        ? `${API_ROOT}/${endpoint}?${query}`
        : `${API_ROOT}/${endpoint}`;
      const res = await fetch(url, { headers: authHeaders(), method: 'GET' });
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      runInAction(() => {
        this.fetchedVideos = data as FetchedVideos;
        this.loader = false;
      });
    } catch (error) {
      console.error('VideoCollectionStore.fetchEndpoint error:', error);
      runInAction(() => {
        this.fetchedVideos = { videos: [] };
        this.loader = false;
      });
    }
  }

  // convenience wrappers
  fetchAll(search = '') {
    // hits: /videos/all?search=...
    const q = search ? `search=${encodeURIComponent(search)}` : '';
    return this.fetchEndpoint('all', q);
  }
  fetchTrending() {
    return this.fetchEndpoint('trending');
  }
  fetchGaming() {
    return this.fetchEndpoint('gaming');
  }
  fetchCustom(path: string) {
    // path should be relative to /videos e.g. 'some-path' or 'category/abc'
    return this.fetchEndpoint(path);
  }

  setFetchedVideos(v: FetchedVideos | { videos: [] }) {
    this.fetchedVideos = v;
  }
}

/* -------------------- VideoDetailsStore -------------------- */
/**
 * Fetch a single video details (for video playback page).
 * Exposes fetchedVideo and embedId (parsed from video_url).
 */
export class VideoDetailsStore {
  fetchedVideo: VideoDetails | undefined = undefined;
  embedId = '';
  loader = true;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchById(id?: string): Promise<void> {
    if (!id) return;
    this.loader = true;
    try {
      const res = await fetch(`${API_ROOT}/${id}`, {
        headers: authHeaders(),
        method: 'GET',
      });
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const payload = await res.json();
      // payload expected { video_details: { ... } }
      const details = payload.video_details as VideoDetails;
      runInAction(() => {
        this.fetchedVideo = details;
        // parse embedId from video_url (safe)
        try {
          // handle youtube style "v=" or full embed urls gracefully
          const url = details.video_url;
          const searchIdx = url.indexOf('v=');
          if (searchIdx !== -1) {
            this.embedId = url.split('v=')[1].split('&')[0];
          } else {
            // fallback: last path segment
            const parts = url.split('/');
            this.embedId = parts[parts.length - 1] || '';
          }
        } catch {
          this.embedId = '';
        }
        this.loader = false;
      });
    } catch (error) {
      console.error('VideoDetailsStore.fetchById error:', error);
      runInAction(() => {
        this.fetchedVideo = undefined;
        this.embedId = '';
        this.loader = false;
      });
    }
  }

  setFetchedVideo(v?: VideoDetails) {
    this.fetchedVideo = v;
  }
  setEmbedId(id: string) {
    this.embedId = id;
  }
}

/* -------------------- SaveVideoStore -------------------- */
/**
 * Local saved videos + like/dislike reactions.
 * This store is UI-state only; persist to localStorage if needed by adding persistence logic.
 */
type SavedVideo = VideoDetails;
interface VideoReaction {
  id: string;
  liked: boolean;
  disliked: boolean;
}

export class SaveVideoStore {
  savedVideos: SavedVideo[] = [];
  videoReactions: VideoReaction[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addVideo(video: SavedVideo) {
    const exists = this.savedVideos.some((v) => v.id === video.id);
    if (!exists) this.savedVideos.push(video);
  }

  removeVideo(id: string) {
    this.savedVideos = this.savedVideos.filter((v) => v.id !== id);
  }

  toggleLike(id: string) {
    const idx = this.videoReactions.findIndex((r) => r.id === id);
    if (idx !== -1) {
      const current = this.videoReactions[idx];
      this.videoReactions[idx] = {
        ...current,
        liked: !current.liked,
        disliked: current.liked ? current.disliked : false,
      };
    } else {
      this.videoReactions.push({ id, liked: true, disliked: false });
    }
  }

  toggleDislike(id: string) {
    const idx = this.videoReactions.findIndex((r) => r.id === id);
    if (idx !== -1) {
      const current = this.videoReactions[idx];
      this.videoReactions[idx] = {
        ...current,
        disliked: !current.disliked,
        liked: current.disliked ? current.liked : false,
      };
    } else {
      this.videoReactions.push({ id, liked: false, disliked: true });
    }
  }
}

/* -------------------- UIStore (theme + nav + timer) -------------------- */
export class UIStore {
  // theme
  theme: 'light' | 'dark' = 'light';

  // nav / panel
  panel = false;
  activeTab = '';
  showTimerBox = false;

  // timer
  timerKey: NodeJS.Timeout | null = null;
  time = 0; // current timer count
  timerStartNum = 1;
  isStarted = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  setPanel() {
    this.panel = !this.panel;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  setShowTimerBox() {
    this.showTimerBox = !this.showTimerBox;
  }

  decrementTime() {
    if (this.time > 0) this.time -= 1;
  }
  incrementTime() {
    this.time += 1;
  }
  setTimerKey(key: NodeJS.Timeout | null) {
    this.timerKey = key;
  }
  startTimer() {
    this.timerStartNum = this.time;
    this.isStarted = !this.isStarted;
  }
  minusTimer() {
    this.timerStartNum -= 1;
    this.time = this.timerStartNum;
  }
  setTimerStartNum(n = 1) {
    this.timerStartNum = n;
  }
  resetTimer() {
    if (this.timerKey) {
      clearInterval(this.timerKey);
      this.timerKey = null;
    }
    this.time = 0;
    this.timerStartNum = 1;
    this.isStarted = false;
  }
}

/* -------------------- RootStore -------------------- */
/**
 * Optional: collect all stores into a root store for easy DI/testing.
 */
export class RootStore {
  videoCollectionStore: VideoCollectionStore;
  videoDetailsStore: VideoDetailsStore;
  saveVideoStore: SaveVideoStore;
  uiStore: UIStore;

  constructor() {
    this.videoCollectionStore = new VideoCollectionStore();
    this.videoDetailsStore = new VideoDetailsStore();
    this.saveVideoStore = new SaveVideoStore();
    this.uiStore = new UIStore();
  }
}

/* -------------------- Exports -------------------- */
export const rootStore = new RootStore();
export const videoCollectionStore = rootStore.videoCollectionStore;
export const videoDetailsStore = rootStore.videoDetailsStore;
export const saveVideoStore = rootStore.saveVideoStore;
export const uiStore = rootStore.uiStore;
