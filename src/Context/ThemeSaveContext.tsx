import React, { Component, type ReactNode } from 'react';

interface SavedVideo {
  channel: {
    name: string;
    profile_image_url: string;
    subscriber_count: string;
  };
  description: string;
  id: string;
  published_at: string;
  thumbnail_url: string;
  title: string;
  video_url: string;
  view_count: string;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  savedVideos: SavedVideo[];
  addVideo: (video: SavedVideo) => void;
  removeVideo: (id: string) => void;
}

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

interface AppProviderProps {
  children: ReactNode;
}

interface AppProviderState {
  theme: 'light' | 'dark';
  savedVideos: SavedVideo[];
}

export class AppProvider extends Component<AppProviderProps, AppProviderState> {
  constructor(props: AppProviderProps) {
    super(props);
    this.state = {
      theme: 'light',
      savedVideos: [],
    };
  }

  toggleTheme = () => {
    this.setState((prev) => ({
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  addVideo = (video: SavedVideo) => {
    this.setState((prev) => ({
      savedVideos: [...prev.savedVideos, video],
    }));
  };

  removeVideo = (id: string) => {
    this.setState((prev) => ({
      savedVideos: prev.savedVideos.filter((v) => v.id !== id),
    }));
  };

  render() {
    const { children } = this.props;
    const { theme, savedVideos } = this.state;

    return (
      <AppContext.Provider
        value={{
          theme,
          toggleTheme: this.toggleTheme,
          savedVideos,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}
