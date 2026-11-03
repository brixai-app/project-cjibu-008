import React from 'react';
import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, QrCode, Copy, ClipboardCheck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  profileUrl?: string;
  slug?: string;
  onSlugChange?: (slug: string) => void;
  onCopyUrl?: () => void;
  onOpenQr?: () => void;
  onResetAllClicks?: () => void;
}

export function SettingsDialog(props: SettingsDialogProps = {}) {
  const {
    open = false,
    onOpenChange,
    profileUrl = '',
    slug = '',
    onSlugChange,
    onCopyUrl,
    onOpenQr,
    onResetAllClicks,
  } = props;
  const [localSlug, setLocalSlug] = React.useState(slug ?? '');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setLocalSlug(slug ?? '');
  }, [slug]);

  const handleCopy = async () => {
    if (!profileUrl) return;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
      onCopyUrl?.();
    } catch {
      setCopied(false);
    }
  };

  const handleSlugBlur = () => {
    if (!onSlugChange) return;
    const trimmed = localSlug.trim().toLowerCase();
    onSlugChange(trimmed || slug || '');
    setLocalSlug(trimmed || slug || '');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[12px] bg-white shadow-xl',
            'border border-[#dfe3ee] p-5 focus:outline-none'
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="font-['Plus Jakarta Sans'] text-lg font-semibold text-[#111827]">
              Profile settings
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe3ee] bg-white text-[#5b6477] hover:bg-[#f7f8fb]"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#5b6477]">
                Public URL
              </p>
              <div className="flex items-center gap-2 rounded-[10px] border border-[#dfe3ee] bg-[#f7f8fb] px-3 py-2">
                <span className="line-clamp-1 flex-1 text-sm font-medium text-[#111827]">
                  {profileUrl || 'Not published yet'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleCopy();
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-[#dfe3ee] bg-white px-2.5 py-1 text-xs font-medium text-[#111827] hover:bg-[#f7f8fb]"
                >
                  {copied ? (
                    <>
                      <ClipboardCheck className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#5b6477]">
                Handle / slug
              </label>
              <div className="flex items-center rounded-[10px] border border-[#dfe3ee] bg-white px-3 py-2">
                <span className="text-sm text-[#5b6477]">pastelpulse.to/</span>
                <input
                  value={localSlug}
                  onChange={(e) => setLocalSlug(e.target.value ?? '')}
                  onBlur={() => {
                    handleSlugBlur();
                  }}
                  placeholder="your-name"
                  className="ml-1 flex-1 bg-transparent text-sm text-[#111827] outline-none"
                />
              </div>
              <p className="mt-1 text-xs text-[#5b6477]">
                Only lowercase letters, numbers, and dashes are recommended.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  onOpenQr?.();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#dfe3ee] bg-[#f7f8fb] px-3 py-2 text-sm font-medium text-[#111827] hover:bg-[#e3e7f5]"
              >
                <QrCode className="h-4 w-4" />
                Show QR code
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetAllClicks?.();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#dfe3ee] bg-white px-3 py-2 text-sm font-medium text-[#111827] hover:bg-[#f7f8fb]"
              >
                <RefreshCw className="h-4 w-4" />
                Reset clicks
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SettingsDialog;