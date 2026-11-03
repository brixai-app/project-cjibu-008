import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';

export function App(): JSX.Element {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#f7f8fb] text-[#111827]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </div>
    </HashRouter>
  );
}

export default App;