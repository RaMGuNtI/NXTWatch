// Store/saveVideoStore.ts
import { makeAutoObservable } from 'mobx';

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

export class SaveVideoStore {
  savedVideos: SavedVideo[] = [];
  videoReactions: VideoReaction[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addVideo = (video: SavedVideo) => {
    const exists = this.savedVideos.some((v) => v.id === video.id);
    if (!exists) this.savedVideos.push(video);
  };

  removeVideo = (id: string) => {
    this.savedVideos = this.savedVideos.filter((v) => v.id !== id);
  };

  toggleLike = (id: string) => {
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
  };

  toggleDislike = (id: string) => {
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
  };
}

export const saveVideoStore = new SaveVideoStore();
