

class NavStore {
  panel = false;
  activeTab: string = '';
  setPanel() {
    this.panel = !this.panel;
  }
  setActiveTab(text: string) {
    navStore.activeTab = text;
  }
}
export const navStore = new NavStore();
