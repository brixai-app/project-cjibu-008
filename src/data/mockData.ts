import type { ToolState, Profile, ProfileDraft, SocialLink, HistoryEntry } from '@/types';

const now = new Date();
const iso = (minutesAgo: number) =>
  new Date(now.getTime() - minutesAgo * 60 * 1000).toISOString();

const baseProfile: Profile = {
  id: 'profile-creator-001',
  displayName: 'Avery Luna',
  bio: 'Designing pastel-perfect interfaces, sharing workflow tips, and documenting the indie-creator journey.',
  avatarUrl:
    'https://images.unsplash.com/photo-1550024261-e4e7d83919eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY2MTIyfDB8MXxzZWFyY2h8MXx8bWluaW1hbCUyMHBvcnRyYWl0JTIwcHJvZmlsZSUyMHBob3RvJTIwcGFzdGVsJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MHwwfHx8MTc5MzcyOTEyOXww&ixlib=rb-4.1.0&q=80&w=1080&q=80&w=1200&auto=format&fit=crop',
  slug: 'avery-luna',
  publishedUrl: 'https://pastelpulse.app/u/avery-luna',
};

const draftLinks: SocialLink[] = [
  {
    id: 'link-tw-001',
    label: 'Daily design snippets',
    platform: 'twitter',
    url: 'https://twitter.com/averyluna',
    enabled: true,
    order: 0,
    clicks: 184,
    createdAt: iso(720),
    updatedAt: iso(32),
  },
  {
    id: 'link-ig-002',
    label: 'Pastel photo sets & reels',
    platform: 'instagram',
    url: 'https://instagram.com/avery.studio',
    enabled: true,
    order: 1,
    clicks: 263,
    createdAt: iso(715),
    updatedAt: iso(45),
  },
  {
    id: 'link-yt-003',
    label: 'Long-form workflow breakdowns',
    platform: 'youtube',
    url: 'https://youtube.com/@averyluna',
    enabled: true,
    order: 2,
    clicks: 97,
    createdAt: iso(690),
    updatedAt: iso(120),
  },
  {
    id: 'link-gh-004',
    label: 'Open pastel UI kits on GitHub',
    platform: 'github',
    url: 'https://github.com/avery-luna',
    enabled: true,
    order: 3,
    clicks: 56,
    createdAt: iso(660),
    updatedAt: iso(210),
  },
  {
    id: 'link-site-005',
    label: 'Portfolio & collaboration requests',
    platform: 'website',
    url: 'https://averyluna.studio',
    enabled: true,
    order: 4,
    clicks: 141,
    createdAt: iso(650),
    updatedAt: iso(75),
  },
  {
    id: 'link-li-006',
    label: 'Professional profile on LinkedIn',
    platform: 'linkedin',
    url: 'https://linkedin.com/in/averyluna',
    enabled: false,
    order: 5,
    clicks: 12,
    createdAt: iso(640),
    updatedAt: iso(300),
  },
  {
    id: 'link-tk-007',
    label: 'Short form behind-the-scenes',
    platform: 'tiktok',
    url: 'https://tiktok.com/@averyluna',
    enabled: true,
    order: 6,
    clicks: 205,
    createdAt: iso(630),
    updatedAt: iso(18),
  },
  {
    id: 'link-tw-008',
    label: 'Twitch pastel co-working stream',
    platform: 'twitch',
    url: 'https://twitch.tv/averyluna',
    enabled: false,
    order: 7,
    clicks: 4,
    createdAt: iso(620),
    updatedAt: iso(580),
  },
  {
    id: 'link-site-009',
    label: 'Client onboarding Notion hub',
    platform: 'website',
    url: 'https://averyluna.notion.site/clients',
    enabled: true,
    order: 8,
    clicks: 33,
    createdAt: iso(600),
    updatedAt: iso(190),
  },
];

const profileDraft: ProfileDraft = {
  ...baseProfile,
  links: draftLinks,
  isDirty: false,
};

const history: HistoryEntry[] = [
  {
    id: 'hist-001',
    timestamp: iso(1440),
    action: 'created',
    summary: 'Created PastelPulse profile for @averyluna',
    metadata: { slug: baseProfile.slug },
  },
  {
    id: 'hist-002',
    timestamp: iso(1380),
    action: 'added_link',
    summary: 'Added Twitter link "Daily design snippets"',
    metadata: { platform: 'twitter', linkId: 'link-tw-001' },
  },
  {
    id: 'hist-003',
    timestamp: iso(1320),
    action: 'added_link',
    summary: 'Added Instagram link "Pastel photo sets & reels"',
    metadata: { platform: 'instagram', linkId: 'link-ig-002' },
  },
  {
    id: 'hist-004',
    timestamp: iso(1200),
    action: 'updated_profile',
    summary: 'Refined bio to focus on indie-creator workflow content',
    metadata: { field: 'bio' },
  },
  {
    id: 'hist-005',
    timestamp: iso(1180),
    action: 'added_link',
    summary: 'Linked YouTube channel for workflow breakdowns',
    metadata: { platform: 'youtube', linkId: 'link-yt-003' },
  },
  {
    id: 'hist-006',
    timestamp: iso(960),
    action: 'reordered_links',
    summary: 'Moved portfolio website above GitHub in link order',
    metadata: { fromIndex: 4, toIndex: 2 },
  },
  {
    id: 'hist-007',
    timestamp: iso(720),
    action: 'toggled_link',
    summary: 'Disabled LinkedIn link from public profile',
    metadata: { linkId: 'link-li-006', enabled: false },
  },
  {
    id: 'hist-008',
    timestamp: iso(480),
    action: 'reset_clicks',
    summary: 'Reset click counters after new reel campaign',
    metadata: { totalLinks: 5 },
  },
  {
    id: 'hist-009',
    timestamp: iso(60),
    action: 'published',
    summary: 'Published latest profile changes to public URL',
    metadata: { publishedUrl: baseProfile.publishedUrl },
  },
];

export const mockData: ToolState = {
  profile: baseProfile,
  draft: profileDraft,
  history,
  editMode: false,
};

export default mockData;