import React, { useState, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import mockData from '@/data/mockData';
import { ProfileDraft, ToolState, HistoryEntry } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolConsole from '@/components/ToolConsole';
import OutputPanel from '@/components/OutputPanel';
import HistoryList from '@/components/HistoryList';
import SettingsDialog from '@/components/SettingsDialog';

export function Home() {
  const [state, setState] = useState<ToolState>(mockData ?? ({} as ToolState));
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const pushHistory = useCallback((entry: HistoryEntry) => {
    setState(prev => ({
      ...prev,
      history: [entry, ...(prev?.history ?? [])],
    }));
  }, []);

  const handleDraftChange = useCallback(
    (draft: ProfileDraft) => {
      setState(prev => ({ ...(prev ?? ({} as ToolState)), draft }));
    },
    []
  );

  const handleToggleEdit = useCallback(() => {
    setState(prev => ({ ...(prev ?? ({} as ToolState)), editMode: !prev?.editMode }));
  }, []);

  const handleCopyUrl = useCallback(() => {
    const url = state?.draft?.publishedUrl ?? '';
    if (!url) return;
    navigator.clipboard
      ?.writeText(url)
      .then(() => toast.success('Profile URL copied'))
      .catch(() => toast.error('Failed to copy'));
  }, [state?.draft?.publishedUrl]);

  const handleSlugChange = useCallback(
    (slug: string) => {
      setState(prev => {
        const next = { ...(prev ?? ({} as ToolState)) };
        if (next.draft) {
          next.draft.slug = slug;
          next.draft.publishedUrl = `https://pastelpulse.me/${slug}`;
          next.draft.isDirty = true;
        }
        return next;
      });
    },
    []
  );

  const handleResetAllClicks = useCallback(() => {
    setState(prev => {
      const next = { ...(prev ?? ({} as ToolState)) };
      if (next.draft?.links) {
        next.draft.links = next.draft.links.map(l => ({ ...l, clicks: 0 }));
        next.draft.isDirty = true;
      }
      return next;
    });
    toast.success('All link clicks reset');
  }, []);

  const handleDeleteHistory = useCallback((id: string) => {
    setState(prev => ({
      ...(prev ?? ({} as ToolState)),
      history: (prev?.history ?? []).filter(h => h.id !== id),
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-[#111827] flex flex-col">
      <Toaster position="top-right" richColors />
      <Header
        editMode={state?.editMode ?? false}
        isDirty={state?.draft?.isDirty ?? false}
        onToggleEdit={handleToggleEdit}
        onOpenQr={() => setQrOpen(true)}
        onCopyUrl={handleCopyUrl}
        statusText={state?.draft?.publishedUrl ?? ''}
        className="border-b border-[#dfe3ee] bg-white/70 backdrop-blur-sm"
      />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <ToolConsole initialDraft={state?.draft} onDraftChange={handleDraftChange} onOpenQr={() => setQrOpen(true)} />
          <OutputPanel draft={state?.draft} onOpenQr={() => setQrOpen(true)} />
        </div>
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          <HistoryList items={state?.history} onDelete={handleDeleteHistory} />
        </section>
      </main>
      <Footer statusText="PastelPulse · Personal link-in-bio workspace" className="border-t border-[#dfe3ee]" />
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        profileUrl={state?.draft?.publishedUrl ?? ''}
        slug={state?.draft?.slug ?? ''}
        onSlugChange={handleSlugChange}
        onCopyUrl={handleCopyUrl}
        onOpenQr={() => setQrOpen(true)}
        onResetAllClicks={handleResetAllClicks}
      />
    </div>
  );
}

export default Home;