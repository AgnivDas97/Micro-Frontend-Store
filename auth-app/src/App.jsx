import React from 'react';
import LoginPage from './components/LoginPage.jsx';
import { ShieldCheck, Layers } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#1e212d] text-[#E5EAF5] flex flex-col justify-between p-4 sm:p-8">
      <header className="max-w-xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#D0BDF4]/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#A0D2EB]" />
          <span className="font-bold text-lg text-[#E5EAF5]">Auth MFE Standalone</span>
        </div>
        <span className="text-xs bg-[#8458B3]/20 text-[#A0D2EB] px-2.5 py-1 rounded-full border border-[#8458B3]/30 flex items-center gap-1">
          <Layers className="w-3 h-3 text-[#A0D2EB]" /> Port 5002
        </span>
      </header>

      <main className="py-8">
        <LoginPage />
      </main>

      <footer className="text-center text-xs text-[#D0BDF4] py-4 border-t border-[#D0BDF4]/20">
        Standalone Auth Micro Frontend Application &bull; Port 5002
      </footer>
    </div>
  );
}
