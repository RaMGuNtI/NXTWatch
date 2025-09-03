import { makeAutoObservable } from 'mobx';

class NavStore {
  panel = false;
  activeTab: string = '';
  showTimerBox: boolean = false;
  timerKey: number | null = null;
  time: number = 0;
  timerStartNum: number = 1;
  isStarted: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  setIsStarted(): void {
    this.isStarted = false;
  }
  setPanel() {
    this.panel = !this.panel;
  }

  setActiveTab(text: string) {
    this.activeTab = text;
  }

  setShowTimerBox(): void {
    this.showTimerBox = !this.showTimerBox;
  }

  decrementTime(): void {
    if (this.time > 0) this.time -= 1;
  }
  setTimerKey(key: number): void {
    this.timerKey = key;
  }
  incrementTime(): void {
    this.time += 1;
  }

  startTimer(): void {
    this.timerStartNum = this.time;
    this.isStarted = !this.isStarted;
  }
  minusTimer(): void {
    this.timerStartNum -= 1;
    this.time = this.timerStartNum;
  }

  setTimerStartNum(): void {
    this.timerStartNum = 1;
  }
}
export const navStore = new NavStore();
