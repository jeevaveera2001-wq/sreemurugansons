import { useState, type FormEvent } from 'react';
import { X, Lock, Phone, Mail, UserCheck, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLogin?: () => void;
}

export default function LoginModal({ isOpen, onClose, onAdminLogin }: LoginModalProps) {
  const [tab, setTab] = useState<'customer' | 'admin'>('admin');
  const [identifier, setIdentifier] = useState('murugansons@gmail.com');
  const [password, setPassword] = useState('1234567890');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'admin' || identifier.toLowerCase().includes('murugan') || identifier.includes('@')) {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier.trim(), password }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          localStorage.setItem('murugan_admin_token', data.token || 'authenticated');
          localStorage.setItem('murugan_admin_user', JSON.stringify(data.admin));
          setIsSuccess(true);
          setSuccessMsg(`Welcome Admin (${data.admin?.name || 'Administrator'})!`);
          setTimeout(() => {
            setIsSuccess(false);
            onClose();
            if (onAdminLogin) onAdminLogin();
          }, 700);
        } else {
          setError(data.message || 'Invalid admin credentials. Please use murugansons@gmail.com and password 1234567890');
        }
      } else {
        setTimeout(() => {
          setIsSuccess(true);
          setSuccessMsg(`Logged in successfully as ${identifier}`);
          setTimeout(() => {
            setIsSuccess(false);
            onClose();
          }, 900);
        }, 500);
      }
    } catch (err: any) {
      setError(err?.message || 'Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillAdminCredentials = () => {
    setTab('admin');
    setIdentifier('murugansons@gmail.com');
    setPassword('1234567890');
    setError('');
  };

  const handleReset = () => {
    setError('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
      <div className="glossy-modal w-full max-w-md rounded-3xl p-6 sm:p-7 relative shadow-2xl">
        
        {/* Close Button in Glossy Pill */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full glossy-pill text-neutral-600 hover:text-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce">
              <UserCheck size={36} />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1A0800]">
              Authentication Successful
            </h3>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed">
              {successMsg}
            </p>
            <div className="text-[11px] font-extrabold text-[#EA580C] animate-pulse">
              Opening Sree Murugan Sons Portal...
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl golden-tag flex items-center justify-center text-[#D97706] shrink-0 shadow-xs">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#2E1B0E] leading-tight">
                  Sign In to Sree Murugan Sons
                </h3>
                <p className="text-[11px] text-[#5C3D2E] font-medium">
                  Store Management & Customer Access Portal
                </p>
              </div>
            </div>

            {/* Quick Admin Auto-fill Banner */}
            <div 
              onClick={handleFillAdminCredentials}
              className="mb-5 p-3 rounded-2xl golden-tag flex items-center justify-between cursor-pointer hover:border-[#D97706] transition-all group"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#D97706]" />
                <span className="text-[11px] font-extrabold text-[#2E1B0E]">
                  Admin: murugansons@gmail.com
                </span>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg golden-btn text-white group-hover:scale-105 transition-transform">
                Fill Credentials
              </span>
            </div>

            {/* Account Type Tabs */}
            <div className="flex p-1 rounded-2xl glossy-pill mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setTab('admin');
                  setIdentifier('murugansons@gmail.com');
                  setPassword('1234567890');
                }}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  tab === 'admin'
                    ? 'golden-btn text-white shadow-xs'
                    : 'text-[#5C3D2E] hover:text-[#2E1B0E]'
                }`}
              >
                <ShieldCheck size={14} />
                <span>Admin Login</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('customer');
                  setIdentifier('');
                  setPassword('');
                }}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  tab === 'customer'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#5C3D2E] hover:text-[#2E1B0E]'
                }`}
              >
                Retail / Builder
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50/90 border border-red-200 text-red-700 text-xs flex items-center gap-2 backdrop-blur-xs">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2E1B0E] mb-1">
                  {tab === 'admin' ? 'Admin Email Address' : 'Mobile Number or GSTIN'}
                </label>
                <div className="relative">
                  {tab === 'admin' ? (
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  ) : (
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  )}
                  <input
                    type={tab === 'admin' ? 'email' : 'text'}
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={tab === 'admin' ? 'murugansons@gmail.com' : 'e.g. +91 94883 31932'}
                    className="glossy-input w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#2E1B0E]">
                    {tab === 'admin' ? 'Admin Password' : 'Password or OTP'}
                  </label>
                  {tab === 'admin' ? (
                    <span className="text-[11px] text-stone-400 font-mono">1234567890</span>
                  ) : (
                    <a href="tel:+919488331932" className="text-[11px] text-[#D97706] hover:underline font-bold">
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="glossy-input w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="golden-btn w-full py-3 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : tab === 'admin' ? 'Sign In as Store Admin' : 'Sign In to Account'}</span>
                <ArrowRight size={15} />
              </button>

              <div className="pt-2 text-center text-[11px] text-[#5C3D2E] flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck size={14} className="text-[#D97706]" />
                <span>Admin dashboard enables product uploads, price edits & offers</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
