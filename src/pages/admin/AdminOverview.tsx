import {
  Users, ShoppingCart, DollarSign, TrendingUp, Activity, Server, MessageSquare, BarChart3
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import AdminLayout from '../../components/AdminLayout'

const stats = [
  { label: 'Total Users', value: '8,420', icon: Users, color: 'text-[#2563EB]', bg: 'bg-blue-50', change: '+142 this week' },
  { label: 'Active Users', value: '1,284', icon: Activity, color: 'text-green-500', bg: 'bg-green-50', change: '+38 today' },
  { label: 'Orders Today', value: '2,184', icon: ShoppingCart, color: 'text-amber-500', bg: 'bg-amber-50', change: '+412 vs yesterday' },
  { label: 'Revenue Today', value: '$1,092', icon: DollarSign, color: 'text-violet-500', bg: 'bg-violet-50', change: '+18% vs yesterday' },
  { label: 'Provider Costs', value: '$621', icon: Server, color: 'text-slate-500', bg: 'bg-slate-100', change: '56.9% of revenue' },
  { label: 'Gross Profit', value: '$471', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', change: '43.1% margin' },
  { label: 'SMS Received', value: '1,938', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50', change: '88.7% success rate' },
  { label: 'Total Revenue', value: '$84,230', icon: BarChart3, color: 'text-violet-500', bg: 'bg-violet-50', change: 'All time' },
]

const revenueData = [
  { month: 'Mar', revenue: 4200, cost: 2400, profit: 1800 },
  { month: 'Apr', revenue: 5800, cost: 3300, profit: 2500 },
  { month: 'May', revenue: 7100, cost: 4000, profit: 3100 },
  { month: 'Jun', revenue: 6400, cost: 3600, profit: 2800 },
  { month: 'Jul', revenue: 9200, cost: 5100, profit: 4100 },
  { month: 'Aug', revenue: 11400, cost: 6200, profit: 5200 },
]

const ordersData = [
  { day: 'Mon', orders: 1840 },
  { day: 'Tue', orders: 2120 },
  { day: 'Wed', orders: 1950 },
  { day: 'Thu', orders: 2840 },
  { day: 'Fri', orders: 2450 },
  { day: 'Sat', orders: 3120 },
  { day: 'Sun', orders: 2184 },
]

const topCountries = [
  { name: 'United States', orders: 8420, pct: 38 },
  { name: 'United Kingdom', orders: 4210, pct: 19 },
  { name: 'Canada', orders: 2840, pct: 13 },
  { name: 'Nigeria', orders: 2200, pct: 10 },
  { name: 'Germany', orders: 1840, pct: 8 },
]

const topServices = [
  { name: 'Telegram', color: '#26A5E4', value: 34 },
  { name: 'Google', color: '#4285F4', value: 22 },
  { name: 'WhatsApp', color: '#25D366', value: 18 },
  { name: 'Discord', color: '#5865F2', value: 12 },
  { name: 'Other', color: '#94A3B8', value: 14 },
]

const recentActivity = [
  { user: 'alice@example.com', action: 'Purchased number', service: 'Telegram (US)', time: '30s ago' },
  { user: 'bob@example.com', action: 'Wallet deposit', service: '$25 via Paystack', time: '1m ago' },
  { user: 'carol@example.com', action: 'SMS received', service: 'Google (UK)', time: '2m ago' },
  { user: 'dave@example.com', action: 'Purchased number', service: 'Discord (CA)', time: '3m ago' },
  { user: 'eve@example.com', action: 'Order expired', service: 'Instagram (DE)', time: '5m ago' },
]

export default function AdminOverview() {
  return (
    <AdminLayout title="Overview">
      <div className="space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg, change }) => (
            <div key={label} className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">{label}</span>
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon size={15} className={color} />
                </div>
              </div>
              <p className="text-xl font-bold text-[#0F172A]">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Revenue vs Costs (6 months)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }} />
                <Bar dataKey="revenue" fill="#2563EB" radius={[3, 3, 0, 0]} />
                <Bar dataKey="cost" fill="#94A3B8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="profit" fill="#22C55E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Services pie */}
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Orders by Service</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={topServices} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                  {topServices.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {topServices.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-slate-600 flex-1">{s.name}</span>
                  <span className="text-xs font-semibold text-slate-700">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Orders chart */}
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Orders This Week</h3>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={ordersData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradAdmin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }} />
                <Area type="monotone" dataKey="orders" stroke="#2563EB" strokeWidth={2} fill="url(#gradAdmin)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top countries */}
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Top Countries</h3>
            <div className="space-y-3">
              {topCountries.map(c => (
                <div key={c.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{c.name}</span>
                    <span className="font-semibold text-[#0F172A]">{c.orders.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-[#0F172A] text-sm">Live Activity</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                  {a.user[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#0F172A]"><span className="font-medium">{a.user}</span> — {a.action}</p>
                  <p className="text-xs text-slate-400">{a.service}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
