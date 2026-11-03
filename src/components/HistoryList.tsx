import React, { useMemo, useState } from 'react';
import { HistoryEntry, HistoryAction } from '@/types';
import { mockData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Search, Filter, Trash2, Clock, Info } from 'lucide-react';

export interface HistoryListProps {
  items?: HistoryEntry[];
  onDelete?: (id: string) => void;
}

const actionLabels: Record<HistoryAction, string> = {
  created: 'Profile created',
  updated_profile: 'Profile updated',
  added_link: 'Link added',
  reordered_links: 'Links reordered',
  toggled_link: 'Link toggled',
  deleted_link: 'Link deleted',
  reset_clicks: 'Click counter reset',
  published: 'Profile published',
};

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function HistoryList(props: HistoryListProps = {}) {
  const { items, onDelete } = props;
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<HistoryAction | 'all'>('all');

  const data = useMemo(
    () => items ?? mockData?.history ?? [],
    [items],
  );

  const filtered = useMemo(
    () =>
      data
        ?.filter((entry) =>
          filter === 'all' ? true : entry?.action === filter,
        )
        ?.filter((entry) => {
          const q = query.toLowerCase();
          if (!q) return true;
          const label = actionLabels[entry?.action] ?? '';
          return (
            label.toLowerCase().includes(q) ||
            (entry?.summary ?? '').toLowerCase().includes(q)
          );
        })
        ?.slice()
        ?.sort(
          (a, b) =>
            new Date(b?.timestamp ?? 0).getTime() -
            new Date(a?.timestamp ?? 0).getTime(),
        ) ?? [],
    [data, filter, query],
  );

  const handleDelete = (id: string) => {
    if (!onDelete) return;
    onDelete(id);
  };

  return (
    <section className="mt-6 rounded-[12px] border border-[#dfe3ee] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
          <Clock className="h-4 w-4 text-[#4f46e5]" />
          <span>Recent activity</span>
          <span className="rounded-full bg-[#f7f8fb] px-2 py-0.5 text-xs text-[#5b6477]">
            {filtered?.length ?? 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input
              className="h-8 w-32 rounded-full border border-[#dfe3ee] bg-[#f7f8fb] pl-7 pr-3 text-xs text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#4f46e5]"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setFilter((prev) => (prev === 'all' ? 'updated_profile' : 'all'))
            }
            className={cn(
              'flex h-8 items-center gap-1 rounded-full border px-2 text-xs',
              filter === 'all'
                ? 'border-[#dfe3ee] bg-white text-[#5b6477]'
                : 'border-[#4f46e5] bg-[#eef2ff] text-[#4f46e5]',
            )}
          >
            <Filter className="h-3 w-3" />
            <span>{filter === 'all' ? 'All' : 'Profile updates'}</span>
          </button>
        </div>
      </div>
      <div className="max-h-56 space-y-1 overflow-y-auto pr-1 text-xs">
        {filtered?.length === 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#dfe3ee] bg-[#f7f8fb] px-3 py-2 text-[#5b6477]">
            <Info className="h-3.5 w-3.5" />
            <span>No history yet. Your edits and publishes will show here.</span>
          </div>
        )}
        {filtered?.map((entry) => (
          <div
            key={entry?.id}
            className="group flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#f7f8fb]"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="shrink-0 text-[10px] font-medium text-[#9ca3af]">
                {formatTime(entry?.timestamp)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-[#111827]">
                  {actionLabels[entry?.action]}
                </p>
                {entry?.summary && (
                  <p className="truncate text-[11px] text-[#5b6477]">
                    {entry?.summary}
                  </p>
                )}
              </div>
            </div>
            {onDelete && (
              <button
                type="button"
                onClick={() => handleDelete(entry?.id)}
                className="ml-2 hidden rounded-full p-1 text-[#9ca3af] hover:bg-white hover:text-[#ef4444] group-hover:inline-flex"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HistoryList;