import { useState } from 'react';
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
      <div className="max-w-md w-[95%] sm:w-full mx-auto my-6 sm:my-8 clean-card rounded-3xl p-6 sm:p-8 text-center text-[#E5EAF5] shadow-2xl">
        <div className="relative inline-block mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-[#A0D2EB] shadow-lg object-cover mx-auto"
          />
          <div className="absolute bottom-0 right-0 bg-[#A0D2EB] p-1.5 rounded-full border-2 border-[#141622]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#141622]" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-[#E5EAF5] font-heading mb-1">{user.name}</h2>
        <p className="text-xs text-[#D0BDF4] mb-3">{user.email}</p>

        <div className="inline-flex items-center gap-2 bg-[#141622] border border-[#D0BDF4]/30 text-[#A0D2EB] text-xs px-3 py-1 rounded-full font-bold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#A0D2EB]" />
          <span>{user.membershipTier} Member</span>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => dispatch(logout())}
            className="w-full py-3 px-4 rounded-2xl bg-[#141622] hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out of Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-[95%] sm:w-full mx-auto my-6 sm:my-8 clean-card rounded-3xl p-6 sm:p-8 text-[#E5EAF5] shadow-2xl text-left">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-[#8458B3]/20 border border-[#8458B3]/40 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
          <ShieldCheck className="w-6 h-6 text-[#A0D2EB]" />
        </div>
        <h2 className="text-2xl font-black text-[#E5EAF5] font-heading tracking-tight">Auth Micro Frontend</h2>
        <p className="text-[#D0BDF4] text-xs mt-1">Sign in to your NEOSTORE ecosystem account</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#D0BDF4] mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#A0D2EB]" /> Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-xl px-4 py-3 text-xs text-[#E5EAF5] placeholder-[#D0BDF4]/50 focus:outline-none transition-all"
            placeholder="you@domain.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#D0BDF4] mb-1.5 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#A0D2EB]" /> Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#141622] border border-[#D0BDF4]/30 focus:border-[#A0D2EB] rounded-xl px-4 py-3 text-xs text-[#E5EAF5] placeholder-[#D0BDF4]/50 focus:outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl btn-gradient font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-heading"
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
          <div className="w-full border-t border-[#D0BDF4]/20"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#202433] px-3 text-[#D0BDF4] text-[11px] font-bold rounded-full border border-[#D0BDF4]/20">Quick Demo Profiles</span>
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
          className="p-2.5 rounded-xl bg-[#141622] hover:bg-[#202433] border border-[#D0BDF4]/30 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#A0D2EB] group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-bold text-[#E5EAF5]">Alex Mercer</p>
              <p className="text-[10px] text-[#D0BDF4]">VIP Platinum</p>
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
          className="p-2.5 rounded-xl bg-[#141622] hover:bg-[#202433] border border-[#D0BDF4]/30 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#D0BDF4] group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-bold text-[#E5EAF5]">Sarah Connor</p>
              <p className="text-[10px] text-[#D0BDF4]">Diamond Exec</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
