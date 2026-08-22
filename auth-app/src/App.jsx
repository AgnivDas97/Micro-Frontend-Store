import React from 'react';
import LoginPage from './components/LoginPage.jsx';
import { ShieldCheck, Layers } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8">
      <header className="max-w-xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
          <span className="font-bold text-lg text-white">Auth MFE Standalone</span>
        </div>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1">
          <Layers className="w-3 h-3" /> Port 5002
        </span>
      </header>

      <main className="py-8">
        <LoginPage />
      </main>

      <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-800">
        Standalone Auth Micro Frontend Application &bull; Port 5002
      </footer>
    </div>
  );
}
