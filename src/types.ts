export type SocialPlatform =
  | 'twitter'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'twitch'
  | 'github'
  | 'linkedin'
  | 'website';

export interface SocialLink {
  id: string;
  label: string;
  platform: SocialPlatform;
  url: string;
  enabled: boolean;
  order: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  slug: string;
  publishedUrl: string;
}

export interface ProfileDraft extends Profile {
  links: SocialLink[];
  isDirty: boolean;
}

export type HistoryAction =
  | 'created'
  | 'updated_profile'
  | 'added_link'
  | 'reordered_links'
  | 'toggled_link'
  | 'deleted_link'
  | 'reset_clicks'
  | 'published';

export interface HistoryEntry {
  id: string;
  timestamp: string;
  action: HistoryAction;
  summary: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface ToolState {
  profile: Profile;
  draft: ProfileDraft;
  history: HistoryEntry[];
  editMode: boolean;
}

export default {};