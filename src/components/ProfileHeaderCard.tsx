import React from 'react';
import { ProfileDraft } from '@/types';
import { cn } from '@/lib/utils';

export interface ProfileHeaderCardProps {
  draft?: ProfileDraft;
  className?: string;
}

export function ProfileHeaderCard(props: ProfileHeaderCardProps = {}) {
  const { draft, className } = props;
  const avatarUrl =
    draft?.avatarUrl ??
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
  const displayName = draft?.displayName ?? 'Your display name';
  const bio =
    draft?.bio ??
    'Share a short, punchy bio that tells people who you are and what you create.';

  return (
    <section
      className={cn(
        'w-full rounded-[12px] bg-white border border-[#dfe3ee] px-4 py-5 sm:px-6 sm:py-6 shadow-sm flex items-center gap-4 sm:gap-5',
        className
      )}
    >
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border border-[#dfe3ee] bg-[#f7f8fb] flex items-center justify-center">
        <img
          src={avatarUrl}
          crossOrigin="anonymous"
          alt={displayName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl font-semibold text-[#111827] truncate">
          {displayName}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#5b6477] line-clamp-3 whitespace-pre-line">
          {bio}
        </p>
        {draft?.isDirty && (
          <p className="mt-2 inline-flex items-center rounded-full bg-[#f7f8fb] px-2.5 py-0.5 text-[11px] font-medium text-[#4f46e5] border border-dashed border-[#dfe3ee]">
            Live preview · Unsaved changes
          </p>
        )}
      </div>
    </section>
  );
}

export default ProfileHeaderCard;