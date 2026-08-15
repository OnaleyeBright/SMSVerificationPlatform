import { useState } from 'react'
import { Search, X } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const orders = [
  { id: 'VH-10248', user: 'alice@example.com', service: 'Telegram', country: '🇺🇸 US', number: '+1 202 555 0198', provider: 'TigerSMS', provCost: '$0.28', custPrice: '$0.50', status: 'received', created: 'Aug 15, 10:38 AM' },
  { id: 'VH-10247', user: 'bob@example.com', service: 'Google', country: '🇬🇧 UK', number: '+44 7700 900142', provider: 'TigerSMS', provCost: '$0.25', custPrice: '$0.45', status: 'waiting', created: 'Aug 15, 10:22 AM' },
  { id: 'VH-10246', user: 'dave@example.com', service: 'Discord', country: '🇨🇦 CA', number: '+1 604 555 0173', provider: 'TigerSMS', provCost: '$0.22', custPrice: '$0.40', status: 'waiting', created: 'Aug 15, 10:05 AM' },
  { id: 'VH-10245', user: 'eve@example.com', service: 'Instagram', country: '🇩🇪 DE', number: '+49 151 5551 0942', provider: 'TigerSMS', provCost: '$0.30', custPrice: '$0.55', status: 'expired', created: 'Aug 15, 9:50 AM' },
  { id: 'VH-10244', user: 'frank@example.com', service: 'WhatsApp', country: '🇫🇷 FR', number: '+33 6 12 34 56 78', provider: 'TigerSMS', provCost: '$0.28', custPrice: '$0.50', status: 'completed', created: 'Aug 15, 9:30 AM' },
  { id: 'VH-10243', user: 'grace@example.com', service: 'TikTok', country: '🇳🇱 NL', number: '+31 6 1234 5678', provider: 'TigerSMS', provCost: '$0.25', custPrice: '$0.45', status: 'completed', created: 'Aug 15, 9:12 AM' },
]

const statusMap: Record<string, { label: string; cls: string }> = {
  waiting: { label: 'Waiting for SMS', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
  received: { label: 'SMS Received', cls: 'bg-green-50 text-green-600 border-green-200' },
  completed: { label: 'Completed', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
  expired: { label: 'Expired', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
}

export default function AdminOrders() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<typeof orders[0] | null>(null)

  const filtered = orders.filter(o => {
    const matchSearch = o.id.includes(search) || o.user.includes(search) || o.service.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <AdminLayout title="Orders">
      <div className="space-y-4 animate-fade-in">
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search orders..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
          </div>
          <div className="flex gap-1">
            {['all', 'waiting', 'received', 'completed', 'expired'].map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === f ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Order ID', 'User', 'Service', 'Country', 'Number', 'Provider', 'Cost', 'Price', 'Status', 'Created', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono font-semibold text-slate-600">{o.id}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[120px] truncate">{o.user}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{o.service}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{o.country}</td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-600 whitespace-nowrap">{o.number}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{o.provider}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{o.provCost}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-[#0F172A]">{o.custPrice}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusMap[o.status]?.cls}`}>
                        {statusMap[o.status]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{o.created}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(o)} className="text-xs text-[#2563EB] font-medium hover:underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-end" onClick={() => setSelected(null)}>
          <div className="bg-white h-full w-full max-w-sm shadow-2xl overflow-y-auto animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-[#0F172A] text-sm">Order {selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                ['User', selected.user],
                ['Service', selected.service],
                ['Country', selected.country],
                ['Number', selected.number],
                ['Provider', selected.provider],
                ['Provider Cost', selected.provCost],
                ['Customer Price', selected.custPrice],
                ['Status', statusMap[selected.status]?.label],
                ['Created', selected.created],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs text-slate-400">{k}</span>
                  <span className="text-xs font-medium text-[#0F172A]">{v}</span>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">Refund</button>
                <button className="flex-1 py-2 rounded-lg bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
