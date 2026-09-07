import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Home, Grid, PackageCheck, Zap, Layers, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const user = useSelector((state) => state.auth?.user || null);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'btn-gradient text-white shadow-md'
        : 'text-[#D0BDF4] hover:text-[#E5EAF5] hover:bg-[#8458B3]/20'
    }`;

  const getMobileNavLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
      isActive
        ? 'btn-gradient text-white shadow-md'
        : 'text-[#E5EAF5]/90 hover:bg-[#8458B3]/20 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#171a28]/95 backdrop-blur-xl border-b border-[#D0BDF4]/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8458B3] via-[#D0BDF4] to-[#A0D2EB] p-0.5 shadow-md shadow-[#8458B3]/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#141622] rounded-[10px] flex items-center justify-center">
                <Zap className="w-4.5 h-4.5 text-[#A0D2EB] fill-[#A0D2EB]/30" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#E5EAF5] font-heading flex items-center gap-1">
                NEO<span className="text-[#A0D2EB]">STORE</span>
              </span>
              <span className="text-[9px] text-[#A0D2EB] font-bold block -mt-1 tracking-widest uppercase flex items-center gap-1">
                <Layers className="w-2.5 h-2.5 text-[#D0BDF4]" /> Micro Frontend Ecosystem
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#141622]/90 border border-[#D0BDF4]/20 p-1.5 rounded-2xl shadow-inner">
            <NavLink to="/" end className={getNavLinkClass}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/products" className={getNavLinkClass}>
              <Grid className="w-4 h-4" />
              <span>Catalog</span>
            </NavLink>

            <NavLink to="/cart" className={getNavLinkClass}>
              <div className="relative flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                {totalItemCount > 0 && (
                  <span className="bg-[#A0D2EB] text-[#141622] text-[11px] font-black px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow">
                    {totalItemCount}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink to="/orders" className={getNavLinkClass}>
              <PackageCheck className="w-4 h-4" />
              <span>Orders</span>
            </NavLink>

            <NavLink to="/auth" className={getNavLinkClass}>
              <div className="flex items-center gap-1.5">
                {user ? (
                  <>
                    <img src={user.avatar} alt={user.name} className="w-4 h-4 rounded-full object-cover border border-[#A0D2EB]" />
                    <span className="text-xs font-semibold text-[#A0D2EB]">{user.name.split(' ')[0]}</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span className="text-xs font-semibold">Account</span>
                  </>
                )}
              </div>
            </NavLink>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <NavLink
              to="/cart"
              className="relative p-2 rounded-xl bg-[#141622] border border-[#D0BDF4]/30 text-[#E5EAF5] hover:text-[#A0D2EB]"
            >
              <ShoppingBag className="w-5 h-5 text-[#A0D2EB]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8458B3] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow">
                  {totalItemCount}
                </span>
              )}
            </NavLink>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#141622] border border-[#D0BDF4]/30 text-[#E5EAF5] hover:text-[#A0D2EB] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#A0D2EB]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Vibrant Gradient Strip */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#8458B3] via-[#D0BDF4] to-[#A0D2EB]" />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D0BDF4]/20 bg-[#171a28]/95 backdrop-blur-2xl px-4 py-4 space-y-2 shadow-2xl">
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <Home className="w-5 h-5 text-[#A0D2EB]" /> Home
            </span>
          </NavLink>

          <NavLink to="/products" onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <Grid className="w-5 h-5 text-[#A0D2EB]" /> Products Catalog
            </span>
          </NavLink>

          <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#A0D2EB]" /> Remote Cart MFE
            </span>
            {totalItemCount > 0 && (
              <span className="bg-[#8458B3] text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                {totalItemCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <PackageCheck className="w-5 h-5 text-[#A0D2EB]" /> My Orders
            </span>
          </NavLink>

          <NavLink to="/auth" onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              {user ? (
                <>
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                  <span>{user.name} ({user.membershipTier})</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5 text-[#A0D2EB]" /> Account Sign In
                </>
              )}
            </span>
          </NavLink>
        </div>
      )}
    </header>
  );
}

