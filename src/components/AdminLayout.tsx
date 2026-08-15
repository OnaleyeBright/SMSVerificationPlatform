import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, ClipboardList, Hash, Globe, AppWindow,
  Server, DollarSign, CreditCard, ArrowLeftRight, Activity,
  BarChart3, Settings, LogOut, Menu, X, ArrowLeft
} from 'lucide-react'
import Logo from './Logo'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', to: '/admin' },
  { icon: Users, label: 'Users', to: '/admin/users' },
  { icon: ClipboardList, label: 'Orders', to: '/admin/orders' },
  { icon: Hash, label: 'Numbers', to: '/admin/numbers' },
  { icon: Globe, label: 'Countries', to: '/admin/countries' },
  { icon: AppWindow, label: 'Services', to: '/admin/services' },
  { icon: Server, label: 'Providers', to: '/admin/providers' },
  { icon: DollarSign, label: 'Pricing', to: '/admin/pricing' },
  { icon: CreditCard, label: 'Payments', to: '/admin/payments' },
  { icon: ArrowLeftRight, label: 'Transactions', to: '/admin/transactions' },
  { icon: Activity, label: 'SMS Activity', to: '/admin/sms-activity' },
  { icon: BarChart3, label: 'Analytics', to: '/admin/analytics' },
  { icon: Settings, label: 'Settings', to: '/admin/settings' },
]

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-60 bg-[#0F172A] flex flex-col transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between h-14 px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Logo size="sm" variant="light" />
            <span className="text-xs text-white/40 font-medium">Admin</span>
          </div>
          <button className="lg:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto sidebar-nav py-3 px-2">
          {navItems.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 text-xs font-medium transition-all
                ${isActive ? 'bg-[#2563EB] text-white' : 'text-white/55 hover:text-white hover:bg-white/8'}`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium text-white/40 hover:text-white/70 hover:bg-white/8 transition-all"
          >
            <ArrowLeft size={15} />
            User Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium text-white/40 hover:text-white/70 hover:bg-white/8 transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-4 lg:px-6 flex-shrink-0">
          <button className="lg:hidden text-slate-500" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">Admin</span>
            <span className="text-slate-300">/</span>
            <h1 className="text-sm font-semibold text-[#0F172A]">{title}</h1>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-xs text-slate-500">All systems operational</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
