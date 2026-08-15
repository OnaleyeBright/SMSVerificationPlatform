import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wallet, ShoppingCart, CheckCircle, TrendingUp, ArrowUpRight,
  ArrowDownLeft, RefreshCcw, ChevronRight
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import UserLayout from '../../components/UserLayout'

const statsData = [
  { label: 'Wallet Balance', value: '$125.50', icon: Wallet, color: 'text-[#2563EB]', bg: 'bg-blue-50', change: '+$20 this week' },
  { label: 'Active Orders', value: '3', icon: ShoppingCart, color: 'text-amber-500', bg: 'bg-amber-50', change: '2 waiting for SMS' },
  { label: 'Completed Orders', value: '128', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', change: '+12 this month' },
  { label: 'Total Spent', value: '$842.50', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-50', change: 'Since joining' },
]

const activeOrders = [
  { id: 'VH-10248', service: 'Telegram', country: '🇺🇸 United States', number: '+1 202 555 0198', status: 'waiting', time: '4m 22s' },
  { id: 'VH-10247', service: 'Google', country: '🇬🇧 United Kingdom', number: '+44 7700 900142', status: 'received', time: '1m 08s' },
  { id: 'VH-10246', service: 'Discord', country: '🇨🇦 Canada', number: '+1 604 555 0173', status: 'waiting', time: '8m 55s' },
]

const transactions = [
  { type: 'deposit', desc: 'Wallet deposit via Paystack', amount: '+$50.00', date: 'Today, 10:42 AM', status: 'completed' },
  { type: 'purchase', desc: 'Number — Telegram (US)', amount: '-$0.50', date: 'Today, 10:38 AM', status: 'completed' },
  { type: 'purchase', desc: 'Number — Google (UK)', amount: '-$0.45', date: 'Yesterday, 3:15 PM', status: 'completed' },
  { type: 'refund', desc: 'Refund — Discord (CA)', amount: '+$0.45', date: 'Yesterday, 2:01 PM', status: 'completed' },
]

const chartData = [
  { day: 'Mon', orders: 4, spent: 2.1 },
  { day: 'Tue', orders: 7, spent: 3.5 },
  { day: 'Wed', orders: 5, spent: 2.8 },
  { day: 'Thu', orders: 12, spent: 6.2 },
  { day: 'Fri', orders: 9, spent: 4.5 },
  { day: 'Sat', orders: 15, spent: 7.8 },
  { day: 'Sun', orders: 11, spent: 5.4 },
]

const countries = [
  { flag: '🇺🇸', name: 'United States', count: 1240 },
  { flag: '🇬🇧', name: 'United Kingdom', count: 890 },
  { flag: '🇨🇦', name: 'Canada', count: 640 },
  { flag: '🇩🇪', name: 'Germany', count: 510 },
  { flag: '🇳🇱', name: 'Netherlands', count: 380 },
]

const services = ['Google', 'Telegram', 'Discord', 'Facebook', 'Instagram', 'WhatsApp']

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    waiting: { label: 'Waiting for SMS', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
    received: { label: 'SMS Received', cls: 'bg-green-50 text-green-600 border-green-200' },
    completed: { label: 'Completed', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
    expired: { label: 'Expired', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
  }
  const { label, cls } = map[status] ?? map.expired
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${cls}`}>
      {status === 'waiting' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-live" />}
      {status === 'received' && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
      {label}
    </span>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('')
  const [service, setService] = useState('')

  return (
    <UserLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map(({ label, value, icon: Icon, color, bg, change }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-500">{label}</span>
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={18} className={color} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Purchase */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h2 className="font-semibold text-[#0F172A] mb-4">Get a Verification Number</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Country</label>
                <select value={country} onChange={e => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 bg-white transition-all">
                  <option value="">Select country...</option>
                  {countries.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Service</label>
                <select value={service} onChange={e => setService(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 bg-white transition-all">
                  <option value="">Select service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {country && service && (
                <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Available numbers</span>
                    <span className="font-semibold text-green-600">1,240 available</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Price</span>
                    <span className="font-semibold text-[#0F172A]">$0.50</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => navigate('/buy-number')}
                className="w-full bg-[#2563EB] text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
                Get Number
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#0F172A]">Orders This Week</h2>
              <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Area type="monotone" dataKey="orders" stroke="#2563EB" strokeWidth={2} fill="url(#gradOrders)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-[#0F172A]">Active Orders</h2>
            <button onClick={() => navigate('/active-orders')} className="text-xs text-[#2563EB] font-medium hover:text-blue-700 flex items-center gap-1">
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Order ID', 'Service', 'Country', 'Number', 'Status', 'Time', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-mono text-slate-600 font-medium">{o.id}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-[#0F172A]">{o.service}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{o.country}</td>
                    <td className="px-5 py-3.5 text-sm font-mono text-[#0F172A]">{o.number}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={o.status} /></td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 font-mono">{o.time}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => navigate('/active-orders')}
                        className="text-xs text-[#2563EB] font-medium hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-[#0F172A]">Recent Transactions</h2>
            <button onClick={() => navigate('/transactions')} className="text-xs text-[#2563EB] font-medium hover:text-blue-700 flex items-center gap-1">
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  t.type === 'deposit' ? 'bg-green-50' : t.type === 'refund' ? 'bg-blue-50' : 'bg-slate-100'
                }`}>
                  {t.type === 'deposit' ? <ArrowDownLeft size={16} className="text-green-500" /> :
                    t.type === 'refund' ? <RefreshCcw size={16} className="text-blue-500" /> :
                    <ArrowUpRight size={16} className="text-slate-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{t.desc}</p>
                  <p className="text-xs text-slate-400">{t.date}</p>
                </div>
                <span className={`text-sm font-semibold ${t.amount.startsWith('+') ? 'text-green-500' : 'text-[#0F172A]'}`}>
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
