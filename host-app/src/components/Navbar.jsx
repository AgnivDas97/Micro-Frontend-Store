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
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    }`;

  const getMobileNavLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 py-3">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 fill-indigo-400/20" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                NEO<span className="text-indigo-400">STORE</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block -mt-1 tracking-wider uppercase flex items-center gap-1">
                <Layers className="w-2.5 h-2.5 text-purple-400" /> Host MFE
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-2xl">
            <NavLink to="/" end className={getNavLinkClass}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/products" className={getNavLinkClass}>
              <Grid className="w-4 h-4" />
              <span>Products</span>
            </NavLink>

            <NavLink to="/cart" className={getNavLinkClass}>
              <div className="relative flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                {totalItemCount > 0 && (
                  <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-md animate-pulse">
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
                    <img src={user.avatar} alt={user.name} className="w-4 h-4 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-indigo-300">{user.name.split(' ')[0]}</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span className="text-xs font-semibold">Sign In</span>
                  </>
                )}
              </div>
            </NavLink>
          </nav>

          {/* Mobile Right Controls: Cart Badge + Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <NavLink
              to="/cart"
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalItemCount}
                </span>
              )}
            </NavLink>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-indigo-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-fadeIn">
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <Home className="w-5 h-5 text-indigo-400" /> Home
            </span>
          </NavLink>

          <NavLink to="/products" onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <Grid className="w-5 h-5 text-indigo-400" /> Products
            </span>
          </NavLink>

          <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-indigo-400" /> Remote Cart MFE
            </span>
            {totalItemCount > 0 && (
              <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItemCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)} className={getMobileNavLinkClass}>
            <span className="flex items-center gap-3">
              <PackageCheck className="w-5 h-5 text-indigo-400" /> My Orders
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
                  <User className="w-5 h-5 text-indigo-400" /> Account Sign In
                </>
              )}
            </span>
          </NavLink>
        </div>
      )}
    </header>
  );
}

