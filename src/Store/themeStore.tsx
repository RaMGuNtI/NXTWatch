import { makeAutoObservable } from 'mobx';

export class ThemeStore {
  theme = 'light';
  constructor() {
    makeAutoObservable(this);
  }
  toggleTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  };
}

export const themeStore = new ThemeStore();
