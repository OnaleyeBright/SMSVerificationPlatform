import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '../components/Logo'

export default function Register() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agreed: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 900)
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: k === 'agreed' ? e.target.checked : e.target.value })

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col justify-between p-12">
        <Logo size="md" variant="light" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Start verifying in seconds.</h2>
          <p className="text-slate-400 leading-relaxed">
            Create your free account and get instant access to virtual numbers across 50+ countries.
          </p>
        </div>
        <p className="text-slate-600 text-xs">© 2024 SMS Viper. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Logo size="md" /></div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-8">Join SMS Viper and start receiving verification codes.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Full Name</label>
              <input type="text" required placeholder="John Doe" value={form.name} onChange={set('name')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email</label>
              <input type="email" required placeholder="john@example.com" value={form.email} onChange={set('email')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required placeholder="Min. 8 characters"
                  value={form.password} onChange={set('password')}
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Confirm Password</label>
              <input type="password" required placeholder="••••••••" value={form.confirm} onChange={set('confirm')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" required checked={form.agreed} onChange={set('agreed')}
                className="w-4 h-4 rounded mt-0.5 border-slate-300 accent-[#2563EB]" />
              <span className="text-sm text-slate-600">
                I agree to the{' '}
                <a href="#" className="text-[#2563EB] hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-[#2563EB] hover:underline">Privacy Policy</a>.
              </span>
            </label>
            <button type="submit" disabled={loading}
              className="w-full bg-[#2563EB] text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-[#2563EB] font-medium hover:text-blue-700">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  )
}
