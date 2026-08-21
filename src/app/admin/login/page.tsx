'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { authService } from '@/services/authService';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  UserCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { branding, setCurrentStaff } = useApp();

  const [email, setEmail] = useState('kottaramalr@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('ദയവായി ഈമെയിലും പാസ്‌വേഡും നൽകുക! (Please enter email & password)');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await authService.loginWithEmailPassword(email, password);
    setLoading(false);

    if (res.success && res.user) {
      setSuccessMsg(`സ്വാഗതം ${res.user.name}! (Welcome to Admin Portal)`);

      // Update current staff state
      setCurrentStaff({
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role === 'customer' ? 'staff' : res.user.role,
        avatar: res.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'active',
        lastActive: 'Just logged in'
      });

      setTimeout(() => {
        router.push('/admin');
      }, 1000);
    } else {
      setErrorMsg(res.error || 'ലോഗിൻ പരാജയപ്പെട്ടു!');
    }
  };

  const handleQuickDemoLogin = (accEmail: string, accPass: string) => {
    setEmail(accEmail);
    setPassword(accPass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Store Logo & Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>KOTTARAM HOME NEEDS AUTHENTICATION</span>
          </div>
          <h1 className="text-3xl font-black text-white">{branding.name}</h1>
          <p className="text-xs text-slate-400 font-medium">{branding.address} | 📞 {branding.phone}</p>
        </div>

        {/* Main Login Card */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-400" />
              <span>യൂസർ ലോഗിൻ (User & Staff Login)</span>
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              SUPABASE AUTH ACTIVE
            </span>
          </div>

          {/* Alert Messages */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-2xl flex items-center gap-2 text-red-400 text-xs font-bold animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-bold animate-in fade-in-50">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Email Address (ഈമെയിൽ വിലാസം)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white transition-all font-mono"
                  placeholder="admin@kottaram.com or kottaramalr@gmail.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Password (പാസ്‌വേഡ്)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white transition-all font-mono"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Checking Credentials...</span>
              ) : (
                <>
                  <span>Sign In & Continue (ലോഗിൻ ചെയ്യുക)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Accounts Selector */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              <span>Quick Demo Accounts (ഒറ്റ ക്ലിക്ക് ലോഗിൻ):</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleQuickDemoLogin('kottaramalr@gmail.com', 'admin123')}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-all group"
              >
                <div className="font-extrabold text-amber-400 group-hover:text-amber-300 flex items-center justify-between">
                  <span>👑 Store Owner</span>
                  <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1 rounded">Super Admin</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">kottaramalr@gmail.com</div>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('manager@kottaram.com', 'manager123')}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-all group"
              >
                <div className="font-extrabold text-sky-400 group-hover:text-sky-300 flex items-center justify-between">
                  <span>💼 Rahul S</span>
                  <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1 rounded">Manager</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">manager@kottaram.com</div>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('designer@kottaram.com', 'designer123')}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-all group"
              >
                <div className="font-extrabold text-amber-300 group-hover:text-amber-200 flex items-center justify-between">
                  <span>🎨 Anjali M</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded">Designer</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">designer@kottaram.com</div>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('customer@kottaram.com', 'user123')}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-all group"
              >
                <div className="font-extrabold text-emerald-400 group-hover:text-emerald-300 flex items-center justify-between">
                  <span>🛍️ Customer</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">Customer</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">customer@kottaram.com</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
