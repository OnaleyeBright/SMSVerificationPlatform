import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '../components/Logo'

export default function Login() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col justify-between p-12">
        <Logo size="md" variant="light" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Fast, reliable SMS<br />verification numbers.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Access virtual phone numbers globally and receive OTPs instantly from one secure platform.
          </p>
          <div className="mt-8 space-y-3">
            {['50+ countries supported', 'Real-time SMS delivery', 'Secure & transparent pricing'].map(t => (
              <div key={t} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                </div>
                <span className="text-slate-300 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-xs">© 2024 SMS Viper. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your SMS Viper account.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.remember}
                  onChange={e => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 accent-[#2563EB]" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#2563EB] hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#2563EB] text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-[#2563EB] font-medium hover:text-blue-700">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
