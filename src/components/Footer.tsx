import React from 'react';
import { Circle as Keyboard, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FooterProps {
  statusText?: string;
  className?: string;
}

export function Footer(props: FooterProps = {}) {
  const statusText = props?.statusText ?? 'PastelPulse ready · Live preview synced';
  return (
    <footer
      className={cn(
        'mt-4 flex items-center justify-between rounded-[12px] border border-[#dfe3ee] bg-white px-3 py-2 text-xs text-[#5b6477]',
        'shadow-sm',
        props?.className ?? ''
      )}
    >
      <div className="flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5 text-[#4f46e5]" />
        <span className="truncate">{statusText}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1.5 sm:flex">
          <Keyboard className="h-3.5 w-3.5 text-[#9ca3af]" />
          <span className="font-medium text-[#111827]">Shortcuts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded border border-[#dfe3ee] bg-[#f7f8fb] px-1.5 py-0.5 font-medium text-[10px] text-[#111827]">
            E
          </span>
          <span>Edit mode</span>
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="rounded border border-[#dfe3ee] bg-[#f7f8fb] px-1.5 py-0.5 font-medium text-[10px] text-[#111827]">
            ⌘
          </span>
          <span className="rounded border border-[#dfe3ee] bg-[#f7f8fb] px-1.5 py-0.5 font-medium text-[10px] text-[#111827]">
            S
          </span>
          <span>Save draft</span>
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="rounded border border-[#dfe3ee] bg-[#f7f8fb] px-1.5 py-0.5 font-medium text-[10px] text-[#111827]">
            P
          </span>
          <span>Publish & copy URL</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;