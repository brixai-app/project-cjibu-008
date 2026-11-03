import React, { useState, useEffect } from 'react';
import { Edit, Check, X, Plus, QrCode, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { ProfileDraft, SocialLink } from '@/types';
import mockData from '@/data/mockData';
import { cn } from '@/lib/utils';

export interface ToolConsoleProps {
  initialDraft?: ProfileDraft;
  onDraftChange?: (draft: ProfileDraft) => void;
  onOpenQr?: () => void;
}

export function ToolConsole(props: ToolConsoleProps = {}) {
  const { initialDraft, onDraftChange, onOpenQr } = props;
  const [editMode, setEditMode] = useState<boolean>(true);
  const [draft, setDraft] = useState<ProfileDraft>(
    initialDraft ?? (mockData?.draft as ProfileDraft)
  );
  const [local, setLocal] = useState({
    displayName: draft?.displayName ?? '',
    bio: draft?.bio ?? '',
    avatarUrl: draft?.avatarUrl ?? '',
  });
  const [newLink, setNewLink] = useState({
    label: '',
    platform: 'twitter',
    url: '',
  });
  const canAddMore = (draft?.links ?? []).length < 5;

  useEffect(() => {
    onDraftChange?.(draft);
  }, [draft, onDraftChange]);

  const handleToggleEdit = () => {
    setEditMode(v => !v);
  };

  const handleProfileChange = (field: 'displayName' | 'bio' | 'avatarUrl', value: string) => {
    setLocal(prev => ({ ...prev, [field]: value }));
    setDraft(prev => ({
      ...prev,
      [field]: value,
      isDirty: true,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleCancelProfile = () => {
    setLocal({
      displayName: draft?.displayName ?? '',
      bio: draft?.bio ?? '',
      avatarUrl: draft?.avatarUrl ?? '',
    });
    setDraft(prev => ({ ...prev, isDirty: false }));
  };

  const validateUrl = (value: string) => {
    if (!value) return false;
    try {
      const u = new URL(value);
      return !!u?.protocol;
    } catch {
      return false;
    }
  };

  const handleAddLink = () => {
    if (!newLink.label.trim()) {
      toast.error('Link label is required');
      return;
    }
    if (!validateUrl(newLink.url)) {
      toast.error('Enter a valid URL');
      return;
    }
    if (!canAddMore) {
      toast.error('You can only add up to 5 links');
      return;
    }
    const now = new Date().toISOString();
    const links = draft?.links ?? [];
    const nextOrder = (links[links.length - 1]?.order ?? 0) + 1;
    const link: SocialLink = {
      id: crypto.randomUUID(),
      label: newLink.label.trim(),
      platform: newLink.platform as SocialLink['platform'],
      url: newLink.url.trim(),
      enabled: true,
      order: nextOrder,
      clicks: 0,
      createdAt: now,
      updatedAt: now,
    };
    const updated = { ...draft, links: [...links, link], isDirty: true };
    setDraft(updated);
    setNewLink({ label: '', platform: 'twitter', url: '' });
    toast.success('Link added (unsaved)');
  };

  const handleCopyUrl = async () => {
    const url = draft?.publishedUrl ?? '';
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Profile URL copied');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleSimulateClick = () => {
    const links = (draft?.links ?? []).map(l =>
      l.enabled
        ? { ...l, clicks: l.clicks + 1, updatedAt: new Date().toISOString() }
        : l
    );
    setDraft(prev => ({ ...prev, links, isDirty: true }));
  };

  const handleResetAllClicks = () => {
    const links = (draft?.links ?? []).map(l => ({
      ...l,
      clicks: 0,
      updatedAt: new Date().toISOString(),
    }));
    setDraft(prev => ({ ...prev, links, isDirty: true }));
    toast.success('All click counts reset (unsaved)');
  };

  const handlePublish = () => {
    if (!draft?.displayName.trim()) {
      toast.error('Display name is required before publishing');
      return;
    }
    setDraft(prev => ({ ...prev, isDirty: false }));
    toast.success('Profile changes published');
  };

  return (
    <div className="w-full rounded-[12px] bg-white shadow-sm border border-[#dfe3ee] p-4 sm:p-5 lg:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-[#5b6477] uppercase">
            PastelPulse Editor
          </p>
          <p className="text-sm text-[#111827]">
            Inline edit your profile and links with live preview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleEdit}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              editMode
                ? 'border-[#4f46e5] bg-[#4f46e5]/5 text-[#111827]'
                : 'border-[#dfe3ee] bg-white text-[#5b6477]'
            )}
          >
            {editMode ? <Check className="h-3.5 w-3.5" /> : <Edit className="h-3.5 w-3.5" />}
            {editMode ? 'Editing' : 'View only'}
          </button>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#dfe3ee] px-3 py-1.5 text-xs font-medium text-[#111827] hover:bg-[#f7f8fb]"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy URL
          </button>
          <button
            type="button"
            onClick={onOpenQr}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#4f46e5] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4338ca]"
          >
            <QrCode className="h-3.5 w-3.5" />
            QR
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-3 md:col-span-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#5b6477]">Display name</label>
            <input
              disabled={!editMode}
              value={local.displayName}
              onChange={e => handleProfileChange('displayName', e.target.value)}
              className="w-full rounded-[10px] border border-[#dfe3ee] bg-[#f7f8fb] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#4f46e5]"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#5b6477]">Bio</label>
            <textarea
              disabled={!editMode}
              value={local.bio}
              onChange={e => handleProfileChange('bio', e.target.value)}
              className="w-full rounded-[10px] border border-[#dfe3ee] bg-[#f7f8fb] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#4f46e5] min-h-[72px] resize-none"
              placeholder="Short, punchy intro for your visitors."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#5b6477]">Avatar URL</label>
            <input
              disabled={!editMode}
              value={local.avatarUrl}
              onChange={e => handleProfileChange('avatarUrl', e.target.value)}
              className="w-full rounded-[10px] border border-[#dfe3ee] bg-[#f7f8fb] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#4f46e5]"
              placeholder="https://"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed border-[#dfe3ee] bg-[#f7f8fb] p-3">
          <div className="h-16 w-16 overflow-hidden rounded-full border border-[#dfe3ee] bg-white">
            {local.avatarUrl ? (
              <img
                src={local.avatarUrl}
                alt={local.displayName || 'Avatar preview'}
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1683593961260-8b2820e8781e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY2MTIyfDB8MXxzZWFyY2h8M3x8bGlnaHQlMjBib2tlaCUyMHBhc3RlbCUyMGNvbG9yJTIwYmFja2dyb3VuZCUyMHRleHR1cmV8ZW58MHwwfHx8MTc5MzcyOTEzMHww&ixlib=rb-4.1.0&q=80&w=1080&q=80&w=1200&auto=format&fit=crop"
                alt="Default avatar"
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <p className="text-xs text-center text-[#5b6477]">
            Avatar preview updates instantly as you edit the URL.
          </p>
        </div>
      </div>

      <div className="space-y-3 rounded-[10px] border border-[#dfe3ee] bg-[#f7f8fb] p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#5b6477]">Add social link</p>
          <p className="text-[11px] text-[#5b6477]">
            {(draft?.links ?? []).length}/5 links
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
          <input
            disabled={!editMode}
            value={newLink.label}
            onChange={e => setNewLink(prev => ({ ...prev, label: e.target.value }))}
            className="rounded-[10px] border border-[#dfe3ee] bg-white px-3 py-2 text-xs text-[#111827] outline-none focus:border-[#4f46e5]"
            placeholder="Label (e.g. Twitter)"
          />
          <input
            disabled={!editMode}
            value={newLink.url}
            onChange={e => setNewLink(prev => ({ ...prev, url: e.target.value }))}
            className="rounded-[10px] border border-[#dfe3ee] bg-white px-3 py-2 text-xs text-[#111827] outline-none focus:border-[#4f46e5]"
            placeholder="https://"
          />
          <button
            type="button"
            disabled={!editMode}
            onClick={handleAddLink}
            className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[#4f46e5] px-3 py-2 text-xs font-medium text-white hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:bg-[#dfe3ee]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
        {!canAddMore && (
          <p className="text-[11px] text-[#5b6477]">
            You&apos;ve reached the maximum of 5 links for this profile.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dfe3ee] pt-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#5b6477]">
          <button
            type="button"
            onClick={handleSimulateClick}
            className="inline-flex items-center gap-1 rounded-full border border-[#dfe3ee] px-2.5 py-1 text-[11px] text-[#111827] hover:bg-[#f7f8fb]"
          >
            <RefreshCw className="h-3 w-3" />
            Simulate link click
          </button>
          <button
            type="button"
            onClick={handleResetAllClicks}
            className="inline-flex items-center gap-1 rounded-full border border-[#dfe3ee] px-2.5 py-1 text-[11px] text-[#111827] hover:bg-[#f7f8fb]"
          >
            <X className="h-3 w-3" />
            Reset clicks
          </button>
        </div>
        <div className="flex items-center gap-2">
          {draft?.isDirty && (
            <button
              type="button"
              onClick={handleCancelProfile}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#dfe3ee] px-3 py-1.5 text-xs text-[#5b6477] hover:bg-[#f7f8fb]"
            >
              <X className="h-3.5 w-3.5" />
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handlePublish}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#4f46e5] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4338ca]"
          >
            <Check className="h-3.5 w-3.5" />
            {draft?.isDirty ? 'Publish changes' : 'Published'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolConsole;