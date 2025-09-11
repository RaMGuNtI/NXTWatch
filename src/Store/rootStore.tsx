// rootStore.js
import { GameStore } from './gamingStore';
import { HomeStore } from './homeStore';
import { NavStore } from './navStore';
import { SaveVideoStore } from './saveVideoStore';
import { ThemeStore } from './themeStore';
import { TrendStore } from './trendStore';
import { VideoStore } from './videoPlayStore';

export class RootStore {
  gameStore: GameStore;
  homeStore: HomeStore;
  trendStore: TrendStore;
  navStore: NavStore;
  videoPlayStore: VideoStore;
  saveVideoStore: SaveVideoStore;
  themeStore: ThemeStore;
  constructor() {
    this.gameStore = new GameStore();
    this.homeStore = new HomeStore();
    this.trendStore = new TrendStore();
    this.navStore = new NavStore();
    this.videoPlayStore = new VideoStore();
    this.saveVideoStore = new SaveVideoStore();
    this.themeStore = new ThemeStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
