import React from 'react';

export default function StatusBadge({ label, variant = 'indigo', icon: Icon }) {
  const variantStyles = {
    indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${variantStyles[variant] || variantStyles.indigo}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </span>
  );
}
