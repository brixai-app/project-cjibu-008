import React from 'react';
import { Circle as GripVertical, Eye, EyeOff, Trash2, RotateCw } from 'lucide-react';
import { SocialLink } from '@/types';
import { cn } from '@/lib/utils';

export interface SocialLinksListProps {
  links?: SocialLink[];
  onChangeOrder?: (ordered: SocialLink[]) => void;
  onToggleEnabled?: (id: string) => void;
  onDelete?: (id: string) => void;
  onResetClicks?: (id: string) => void;
}

function SocialLinksList(props: SocialLinksListProps = {}) {
  const { links = [], onChangeOrder, onToggleEnabled, onDelete, onResetClicks } = props;

  const sorted = [...links].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (!sourceId || sourceId === targetId || !onChangeOrder) return;
    const sourceIndex = sorted.findIndex(l => l?.id === sourceId);
    const targetIndex = sorted.findIndex(l => l?.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;
    const reordered = [...sorted];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    const withOrder = reordered.map((l, idx) => ({ ...l, order: idx }));
    onChangeOrder(withOrder);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="space-y-2">
      {sorted.length === 0 ? (
        <div className="rounded-[12px] border border-dashed border-[#dfe3ee] bg-white px-4 py-6 text-center text-sm text-[#5b6477]">
          Add your first social link to get started.
        </div>
      ) : (
        sorted.map(link => (
          <div
            key={link?.id}
            draggable
            onDragStart={e => handleDragStart(e, link?.id ?? '')}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, link?.id ?? '')}
            className={cn(
              'flex items-center gap-3 rounded-[12px] border px-3 py-2.5 bg-white',
              'border-[#dfe3ee] hover:border-[#4f46e5]/70 transition-colors',
              !link?.enabled && 'opacity-60'
            )}
          >
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#5b6477] hover:bg-[#f7f8fb]"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate">
                  <p className="text-sm font-medium text-[#111827] truncate">
                    {link?.label ?? 'Untitled link'}
                  </p>
                  <p className="text-xs text-[#5b6477] truncate">
                    {link?.url ?? ''}
                  </p>
                </div>
                <div className="ml-2 flex items-center gap-2">
                  <span className="rounded-full bg-[#f7f8fb] px-2 py-0.5 text-[11px] text-[#5b6477]">
                    {link?.clicks ?? 0} clicks
                  </span>
                  <button
                    type="button"
                    onClick={() => onResetClicks?.(link?.id ?? '')}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[#5b6477] hover:bg-[#f7f8fb]"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-[#5b6477]">
                {link?.platform ?? 'website'}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onToggleEnabled?.(link?.id ?? '')}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md border',
                  link?.enabled
                    ? 'border-[#4f46e5] text-[#4f46e5] bg-[#4f46e5]/5'
                    : 'border-[#dfe3ee] text-[#5b6477] hover:bg-[#f7f8fb]'
                )}
              >
                {link?.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(link?.id ?? '')}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dfe3ee] text-[#5b6477] hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export { SocialLinksList };
export default SocialLinksList;