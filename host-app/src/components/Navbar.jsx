import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Home, Grid, PackageCheck, Zap, Layers } from 'lucide-react';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                NEO<span className="text-indigo-400">STORE</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block -mt-1 tracking-wider uppercase flex items-center gap-1">
                <Layers className="w-2.5 h-2.5 text-purple-400" /> Host Micro Frontend
              </span>
            </div>
          </NavLink>

          {/* Navigation Links using NavLink */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-2xl">
            <NavLink to="/" end className={getNavLinkClass}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
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
              <span className="hidden md:inline">Orders</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
