import React from 'react';
import { Copy, QrCode, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { ProfileDraft } from '@/types';

export interface OutputPanelProps {
  draft?: ProfileDraft;
  onOpenQr?: () => void;
}

export function OutputPanel(props: OutputPanelProps = {}) {
  const { draft, onOpenQr } = props;
  const publishedUrl = draft?.publishedUrl ?? '';
  const slug = draft?.slug ?? 'your-handle';
  const previewUrl =
    publishedUrl || `${window.location.origin ?? ''}/@${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl);
      toast.success('Profile link copied to clipboard');
    } catch (error) {
      const message =
        error instanceof Error ? error.message ?? 'Unknown error' : 'Unknown error';
      toast.error(`Failed to copy link: ${message}`);
    }
  };

  const handleOpen = () => {
    if (!previewUrl) {
      toast.error('No profile URL available yet');
      return;
    }
    window.open(previewUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenQr = () => {
    if (!previewUrl) {
      toast.error('No profile URL available yet');
      return;
    }
    if (onOpenQr) {
      onOpenQr();
    }
  };

  return (
    <section className="w-full rounded-[12px] border border-[#dfe3ee] bg-[#ffffff] p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-['Plus Jakarta Sans'] text-sm font-semibold text-[#111827] sm:text-base">
            Public profile link
          </h2>
          <p className="mt-1 text-xs text-[#5b6477] sm:text-sm">
            Share this URL anywhere. Edits stay in draft until you publish.
          </p>
        </div>
        <span className="rounded-full bg-[#f7f8fb] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#5b6477]">
          Live preview
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-[10px] border border-dashed border-[#dfe3ee] bg-[#f7f8fb] px-3 py-2.5">
          <p className="line-clamp-1 text-xs font-medium text-[#111827] sm:text-sm">
            {previewUrl || 'Your profile URL will appear here after setup'}
          </p>
          <p className="mt-0.5 text-[10px] text-[#5b6477]">
            {draft?.isDirty ?? false
              ? 'You have unpublished changes'
              : 'Published and up to date'}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px]',
              'border border-[#dfe3ee] bg-white px-3 text-xs font-medium text-[#111827]',
              'hover:bg-[#f7f8fb] active:scale-[0.98] transition'
            )}
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy</span>
          </button>
          <button
            type="button"
            onClick={handleOpenQr}
            className={cn(
              'inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px]',
              'border border-[#dfe3ee] bg-white px-3 text-xs font-medium text-[#111827]',
              'hover:bg-[#f7f8fb] active:scale-[0.98] transition'
            )}
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>QR</span>
          </button>
          <button
            type="button"
            onClick={handleOpen}
            className={cn(
              'inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px]',
              'bg-[#4f46e5] px-3 text-xs font-semibold text-white',
              'hover:bg-[#4338ca] active:scale-[0.98] transition'
            )}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Open</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default OutputPanel;