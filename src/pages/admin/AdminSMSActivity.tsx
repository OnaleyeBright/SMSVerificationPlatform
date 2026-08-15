import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const smsActivity = [
  { time: '10:42:18', orderId: 'VH-10248', user: 'alice@example.com', country: '🇺🇸 US', service: 'Telegram', sender: 'Telegram', otp: '482913', provider: 'TigerSMS', status: 'received' },
  { time: '10:38:04', orderId: 'VH-10247', user: 'bob@example.com', country: '🇬🇧 UK', service: 'Google', sender: 'Google', otp: '291847', provider: 'TigerSMS', status: 'received' },
  { time: '10:22:55', orderId: 'VH-10246', user: 'dave@example.com', country: '🇨🇦 CA', service: 'Discord', sender: 'Discord', otp: '—', provider: 'TigerSMS', status: 'waiting' },
  { time: '10:18:30', orderId: 'VH-10245', user: 'eve@example.com', country: '🇩🇪 DE', service: 'Instagram', sender: 'Instagram', otp: '—', provider: 'TigerSMS', status: 'expired' },
  { time: '10:05:11', orderId: 'VH-10244', user: 'frank@example.com', country: '🇫🇷 FR', service: 'WhatsApp', sender: 'WhatsApp', otp: '495213', provider: 'TigerSMS', status: 'received' },
  { time: '9:58:42', orderId: 'VH-10243', user: 'grace@example.com', country: '🇳🇱 NL', service: 'TikTok', sender: 'TikTok', otp: '738219', provider: 'TigerSMS', status: 'received' },
  { time: '9:45:18', orderId: 'VH-10242', user: 'alice@example.com', country: '🇺🇸 US', service: 'Discord', sender: 'Discord', otp: '281034', provider: 'TigerSMS', status: 'received' },
  { time: '9:30:05', orderId: 'VH-10241', user: 'carol@example.com', country: '🇦🇺 AU', service: 'Microsoft', sender: 'Microsoft', otp: '—', provider: 'TigerSMS', status: 'expired' },
]

const statusMap: Record<string, string> = {
  received: 'bg-green-50 text-green-600',
  waiting: 'bg-amber-50 text-amber-600',
  expired: 'bg-slate-100 text-slate-500',
}

export default function AdminSMSActivity() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = smsActivity.filter(a => {
    const matchSearch =
      a.orderId.includes(search) ||
      a.user.includes(search) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.otp.includes(search)
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <AdminLayout title="SMS Activity">
      <div className="space-y-4 animate-fade-in">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-live" />
          <span className="text-xs text-slate-500 font-medium">Live monitoring</span>
          <span className="text-xs text-slate-400 ml-auto">{filtered.length} records</span>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search activity..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
          </div>
          <div className="flex gap-1">
            {['all', 'received', 'waiting', 'expired'].map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === f ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {f}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={12} /> More filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Time', 'Order ID', 'User', 'Country', 'Service', 'Sender', 'OTP', 'Provider', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-slate-500 whitespace-nowrap">{a.time}</td>
                    <td className="px-4 py-3 text-xs font-mono font-semibold text-slate-600">{a.orderId}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[120px] truncate">{a.user}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{a.country}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{a.service}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{a.sender}</td>
                    <td className="px-4 py-3 text-xs font-mono font-bold text-[#0F172A]">{a.otp}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{a.provider}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusMap[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">No activity found.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
