import { AuthStore } from './AuthStore';
import { NavStore } from './navStore';
import { SaveVideoStore } from './saveVideoStore';
import { ThemeStore } from './themeStore';
import { VideoDetailStore } from './VideoDetailStore';
import { VideoStore } from './VideoStore';

export class RootAppStore {
  videoStore: VideoStore;
  videoDetailStore: VideoDetailStore;
  authStore: AuthStore;
  themeStore: ThemeStore;
  saveVideoStore: SaveVideoStore;
  navStore: NavStore;
  constructor() {
    this.videoStore = new VideoStore();
    this.videoDetailStore = new VideoDetailStore();
    this.authStore = new AuthStore();
    this.themeStore = new ThemeStore();
    this.saveVideoStore = new SaveVideoStore();
    this.navStore = new NavStore();
  }
}

const rootAppStore = new RootAppStore();
export default rootAppStore;
