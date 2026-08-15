import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, ClipboardList, Inbox, Wallet,
  ArrowLeftRight, Clock, Code2, Settings, LogOut, Menu, X,
  Bell, Search, ChevronDown, Shield
} from 'lucide-react'
import Logo from './Logo'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: ShoppingCart, label: 'Buy Number', to: '/buy-number' },
  { icon: ClipboardList, label: 'Active Orders', to: '/active-orders' },
  { icon: Inbox, label: 'SMS Inbox', to: '/sms-inbox' },
  { icon: Wallet, label: 'Wallet', to: '/wallet' },
  { icon: ArrowLeftRight, label: 'Transactions', to: '/transactions' },
  { icon: Clock, label: 'Rentals', to: '/rentals', soon: true },
  { icon: Code2, label: 'API', to: '/api', soon: true },
  { icon: Settings, label: 'Settings', to: '/settings' },
]

interface UserLayoutProps {
  children: React.ReactNode
  title: string
}

export default function UserLayout({ children, title }: UserLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0F172A] flex flex-col
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Logo size="md" variant="light" />
          <button className="lg:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto sidebar-nav py-4 px-3">
          {navItems.map(({ icon: Icon, label, to, soon }) => (
            <NavLink
              key={to}
              to={soon ? '#' : to}
              onClick={(e) => { if (soon) e.preventDefault() }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all
                ${isActive && !soon
                  ? 'bg-[#2563EB] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
                }
                ${soon ? 'cursor-default' : 'cursor-pointer'}`
              }
            >
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {soon && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-medium">
                  SOON
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin link */}
        <div className="px-3 pb-2">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/8 transition-all"
          >
            <Shield size={17} />
            Admin Panel
          </button>
        </div>

        {/* User */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">John Doe</p>
              <p className="text-white/40 text-xs truncate">john@example.com</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center gap-4 px-4 lg:px-6 flex-shrink-0">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-[#0F172A]">{title}</h1>
          <div className="flex-1" />
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-56">
            <Search size={15} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-slate-600 outline-none w-full placeholder:text-slate-400"
            />
          </div>
          {/* Notifications */}
          <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563EB] rounded-full" />
          </button>
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-semibold">
                JD
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                <button onClick={() => { navigate('/settings'); setProfileOpen(false) }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Settings</button>
                <button onClick={() => { navigate('/'); setProfileOpen(false) }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
