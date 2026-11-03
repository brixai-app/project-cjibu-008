import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, QrCode, Copy, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  editMode?: boolean;
  isDirty?: boolean;
  onToggleEdit?: () => void;
  onOpenQr?: () => void;
  onCopyUrl?: () => void;
  statusText?: string;
  className?: string;
}

export function Header(props: HeaderProps = {}) {
  const {
    editMode = false,
    isDirty = false,
    onToggleEdit,
    onOpenQr,
    onCopyUrl,
    statusText = '',
    className = '',
  } = props;

  const statusLabel = isDirty ? 'Draft changes' : 'Live';
  const statusColor = isDirty ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800';
  const statusDot = isDirty ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <header
      className={cn(
        'w-full border-b border-[#dfe3ee] bg-[#f7f8fb]/80 backdrop-blur z-20',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#4f46e5]/10">
            <Rocket className="h-4 w-4 text-[#4f46e5]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-[#111827] tracking-tight">PastelPulse</span>
            <span className="text-[11px] text-[#5b6477]">Link-in-bio workspace</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <div className={cn('flex items-center gap-1 rounded-full px-2.5 py-1 text-xs', statusColor)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', statusDot)} />
            <span>{statusLabel}</span>
            {statusText ? (
              <span className="hidden sm:inline text-[11px] opacity-80">• {statusText}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => (onCopyUrl ? onCopyUrl() : undefined)}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#dfe3ee] bg-white px-2.5 text-xs font-medium text-[#111827] hover:bg-[#f3f4ff] active:scale-[0.98] transition"
          >
            <Copy className="h-3.5 w-3.5 text-[#4f46e5]" />
            <span className="hidden sm:inline">Copy link</span>
            <span className="sm:hidden">Copy</span>
          </button>
          <button
            type="button"
            onClick={() => (onOpenQr ? onOpenQr() : undefined)}
            className="inline-flex h-8 items-center justify-center rounded-full border border-[#dfe3ee] bg-white px-2.5 text-xs font-medium text-[#111827] hover:bg-[#f3f4ff] active:scale-[0.98] transition"
          >
            <QrCode className="h-3.5 w-3.5 text-[#4f46e5]" />
          </button>
          <button
            type="button"
            onClick={() => (onToggleEdit ? onToggleEdit() : undefined)}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition active:scale-[0.97]',
              editMode
                ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'
                : 'bg-white text-[#111827] border border-[#dfe3ee] hover:bg-[#f3f4ff]',
            )}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>{editMode ? 'Editing' : 'View mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;