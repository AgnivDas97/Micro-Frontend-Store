import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserProfile } from '../store/authSlice.js';
import { X, ShieldCheck, LogOut, Award, User, Mail, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export default function UserProfileModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  const { user, isAuthenticated } = auth;

  if (!isOpen) return null;

  if (!isAuthenticated || !user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
          <User className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Not Signed In</h3>
          <p className="text-xs text-slate-400 mb-6">Please sign in to access your ecosystem profile and rewards.</p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
          >
            Close Modal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-[95%] sm:w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden">
        {/* Top ambient glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800/80 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="relative z-10 flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl border-2 border-indigo-500/40 object-cover shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1 rounded-full border-2 border-slate-900">
              <CheckCircle2 className="w-3 h-3 text-slate-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight">{user.name}</h3>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3 text-slate-500" /> {user.email}
            </p>
          </div>
        </div>

        {/* Ecosystem Member Card */}
        <div className="relative z-10 bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 mb-6 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" /> {user.membershipTier} Member
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" /> Active Session
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Enjoy free priority express shipping and 2x reward points across all NEOSTORE Micro Frontends.
          </p>
        </div>

        {/* Actions */}
        <div className="relative z-10 space-y-2">
          <button
            onClick={() => {
              dispatch(logout());
              if (onClose) onClose();
            }}
            className="w-full py-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
