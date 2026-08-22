import React from 'react';

export default function GlassCard({ children, className = '', glowColor = 'indigo' }) {
  const glowStyles = {
    indigo: 'border-indigo-500/30 shadow-indigo-500/10 hover:border-indigo-500/50',
    purple: 'border-purple-500/30 shadow-purple-500/10 hover:border-purple-500/50',
    emerald: 'border-emerald-500/30 shadow-emerald-500/10 hover:border-emerald-500/50',
    rose: 'border-rose-500/30 shadow-rose-500/10 hover:border-rose-500/50',
  };

  return (
    <div
      className={`bg-slate-900/70 border backdrop-blur-xl rounded-3xl p-6 shadow-xl transition-all duration-300 ${glowStyles[glowColor] || glowStyles.indigo} ${className}`}
    >
      {children}
    </div>
  );
}
