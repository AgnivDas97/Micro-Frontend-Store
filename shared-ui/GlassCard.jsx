import React from 'react';

export default function GlassCard({ children, className = '', glowColor = 'purple' }) {
  const glowStyles = {
    purple: 'border-[#D0BDF4]/30 shadow-[#8458B3]/20 hover:border-[#A0D2EB]/60',
    sky: 'border-[#A0D2EB]/30 shadow-[#A0D2EB]/20 hover:border-[#A0D2EB]/60',
    lavender: 'border-[#D0BDF4]/40 shadow-[#D0BDF4]/20 hover:border-[#D0BDF4]/70',
    dark: 'border-[#494D5F] shadow-[#494D5F]/30 hover:border-[#8458B3]/50',
  };

  return (
    <div
      className={`clean-card rounded-3xl p-6 shadow-xl text-[#E5EAF5] ${glowStyles[glowColor] || glowStyles.purple} ${className}`}
    >
      {children}
    </div>
  );
}

