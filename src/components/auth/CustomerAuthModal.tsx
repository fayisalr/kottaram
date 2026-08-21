'use client';

import React, { useState } from 'react';
import { authService, AuthUser } from '@/services/authService';
import { X, Mail, Lock, User, KeyRound, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: AuthUser) => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter email & password');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'login') {
      const res = await authService.loginWithEmailPassword(email, password);
      setLoading(false);
      if (res.success && res.user) {
        setSuccessMsg(`Logged in successfully! Welcome ${res.user.name}`);
        setTimeout(() => {
          onSuccessLogin(res.user!);
          onClose();
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Login failed!');
      }
    } else {
      if (!name) {
        setErrorMsg('Please enter your full name');
        setLoading(false);
        return;
      }
      const res = await authService.registerUser(email, password, name);
      setLoading(false);
      if (res.success && res.user) {
        setSuccessMsg('Account created successfully!');
        setTimeout(() => {
          onSuccessLogin(res.user!);
          onClose();
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Registration failed!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-5 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <span>{mode === 'login' ? 'Customer Sign In (ലോഗിൻ)' : 'Create New Account (രജിസ്റ്റർ)'}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-2xl flex items-center gap-2 text-red-400 text-xs font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name (മുഴുവൻ പേര്)</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                  placeholder="e.g. Muhammed Fayis"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                placeholder="yourname@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Account' : 'Register Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-amber-400 font-extrabold hover:underline"
              >
                Register Free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-amber-400 font-extrabold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
