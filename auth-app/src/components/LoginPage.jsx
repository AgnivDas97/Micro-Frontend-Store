import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../store/authSlice.js';
import { ShieldCheck, LogIn, LogOut, User, Lock, Mail, Sparkles, CheckCircle2, KeyRound } from 'lucide-react';

export default function LoginPage({ onSuccess }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  const { user, isAuthenticated } = auth;

  const [email, setEmail] = useState('alex.mercer@neostore.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const userData = {
        id: `usr_${Math.floor(100 + Math.random() * 900)}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        role: 'PRO Member',
        membershipTier: 'Platinum VIP',
      };
      dispatch(loginSuccess({ user: userData, token: 'mfe_jwt_auth_token_99218' }));
      setIsSubmitting(false);
      if (onSuccess) onSuccess(userData);
    }, 600);
  };

  const handleQuickDemoLogin = (demoUser) => {
    setIsSubmitting(true);
    setTimeout(() => {
      dispatch(loginSuccess({ user: demoUser, token: 'mfe_jwt_auth_token_demo' }));
      setIsSubmitting(false);
      if (onSuccess) onSuccess(demoUser);
    }, 400);
  };

  if (isAuthenticated && user) {
    return (
      <div className="max-w-md w-[95%] sm:w-full mx-auto my-6 sm:my-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl text-center">
        <div className="relative inline-block mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-indigo-500/50 shadow-lg object-cover mx-auto"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-500 p-1.5 rounded-full border-2 border-slate-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
        <p className="text-xs text-slate-400 mb-3">{user.email}</p>

        <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{user.membershipTier} Member</span>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => dispatch(logout())}
            className="w-full py-3 px-4 rounded-2xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out of Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-[95%] sm:w-full mx-auto my-6 sm:my-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/25">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Auth Micro Frontend</h2>
        <p className="text-slate-400 text-xs mt-1">Sign in to your NEOSTORE ecosystem account</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            placeholder="you@domain.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-400" /> Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-4 h-4" /> Sign In to Ecosystem
            </>
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-slate-900 px-3 text-slate-500 text-[11px] font-medium">Quick Demo Profiles</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() =>
            handleQuickDemoLogin({
              id: 'usr_alex',
              name: 'Alex Mercer',
              email: 'alex.mercer@neostore.dev',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
              role: 'PRO Developer',
              membershipTier: 'Platinum VIP',
            })
          }
          className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold text-white">Alex Mercer</p>
              <p className="text-[10px] text-slate-500">VIP Platinum</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            handleQuickDemoLogin({
              id: 'usr_sarah',
              name: 'Sarah Connor',
              email: 'sarah.c@cyberdyne.org',
              avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
              role: 'Security Engineer',
              membershipTier: 'Diamond Executive',
            })
          }
          className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold text-white">Sarah Connor</p>
              <p className="text-[10px] text-slate-500">Diamond Exec</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
