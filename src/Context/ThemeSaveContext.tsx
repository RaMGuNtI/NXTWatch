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

interface VideoReaction {
  id: string;
  liked: boolean;
  disliked: boolean;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  savedVideos: SavedVideo[];
  addVideo: (video: SavedVideo) => void;
  removeVideo: (id: string) => void;
  videoReactions: VideoReaction[];
  toggleLike: (id: string) => void;
  toggleDislike: (id: string) => void;
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
  videoReactions: VideoReaction[];
}

export class AppProvider extends Component<AppProviderProps, AppProviderState> {
  constructor(props: AppProviderProps) {
    super(props);
    this.state = {
      theme: 'light',
      savedVideos: [],
      videoReactions: [],
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

  toggleLike = (id: string) => {
    this.setState((prev) => {
      const reactions = [...prev.videoReactions];
      const idx = reactions.findIndex((r) => r.id === id);

      if (idx !== -1) {
        const current = reactions[idx];
        reactions[idx] = {
          ...current,
          liked: !current.liked,
          disliked: current.liked ? current.disliked : false,
        };
      } else {
        reactions.push({ id, liked: true, disliked: false });
      }

      return { videoReactions: reactions };
    });
  };

  toggleDislike = (id: string) => {
    this.setState((prev) => {
      const reactions = [...prev.videoReactions];
      const idx = reactions.findIndex((r) => r.id === id);

      if (idx !== -1) {
        const current = reactions[idx];
        reactions[idx] = {
          ...current,
          disliked: !current.disliked,
          liked: current.disliked ? current.liked : false,
        };
      } else {
        reactions.push({ id, liked: false, disliked: true });
      }

      return { videoReactions: reactions };
    });
  };

  render() {
    const { children } = this.props;
    const { theme, savedVideos, videoReactions } = this.state;

    return (
      <AppContext.Provider
        value={{
          theme,
          toggleTheme: this.toggleTheme,
          savedVideos,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
          videoReactions,
          toggleLike: this.toggleLike,
          toggleDislike: this.toggleDislike,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}
