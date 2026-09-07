import React from 'react';

export default function StatusBadge({ label, variant = 'purple', icon: Icon }) {
  const variantStyles = {
    purple: 'bg-[#8458B3]/20 text-[#D0BDF4] border-[#8458B3]/40',
    sky: 'bg-[#A0D2EB]/20 text-[#A0D2EB] border-[#A0D2EB]/40',
    lavender: 'bg-[#D0BDF4]/20 text-[#E5EAF5] border-[#D0BDF4]/40',
    dark: 'bg-[#494D5F] text-[#E5EAF5] border-[#D0BDF4]/20',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${variantStyles[variant] || variantStyles.purple}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </span>
  );
}

