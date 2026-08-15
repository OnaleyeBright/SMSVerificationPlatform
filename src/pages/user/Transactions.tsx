import { useState } from 'react'
import { Search, ArrowDownLeft, ArrowUpRight, RefreshCcw, Download } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

const allTx = [
  { date: 'Aug 15, 2024 10:42 AM', desc: 'Wallet deposit via Paystack', type: 'deposit', amount: '+$50.00', status: 'completed', ref: 'PSK-2024081501' },
  { date: 'Aug 15, 2024 10:38 AM', desc: 'Number — Telegram (US)', type: 'purchase', amount: '-$0.50', status: 'completed', ref: 'VH-10248' },
  { date: 'Aug 14, 2024 3:15 PM', desc: 'Number — Google (UK)', type: 'purchase', amount: '-$0.45', status: 'completed', ref: 'VH-10247' },
  { date: 'Aug 14, 2024 2:01 PM', desc: 'Refund — Discord (CA)', type: 'refund', amount: '+$0.40', status: 'completed', ref: 'VH-10239' },
  { date: 'Aug 12, 2024 9:20 AM', desc: 'Wallet deposit via Flutterwave', type: 'deposit', amount: '+$25.00', status: 'completed', ref: 'FLW-2024081201' },
  { date: 'Aug 11, 2024 4:12 PM', desc: 'Number — Instagram (US)', type: 'purchase', amount: '-$0.50', status: 'completed', ref: 'VH-10235' },
  { date: 'Aug 10, 2024 1:55 PM', desc: 'Number — X (US)', type: 'purchase', amount: '-$0.35', status: 'completed', ref: 'VH-10230' },
  { date: 'Aug 8, 2024 11:30 AM', desc: 'Wallet deposit via Paystack', type: 'deposit', amount: '+$100.00', status: 'completed', ref: 'PSK-2024080801' },
]

const typeFilters = ['All', 'Deposits', 'Purchases', 'Refunds']

export default function Transactions() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allTx.filter(t => {
    const matchFilter =
      filter === 'All' ||
      (filter === 'Deposits' && t.type === 'deposit') ||
      (filter === 'Purchases' && t.type === 'purchase') ||
      (filter === 'Refunds' && t.type === 'refund')
    const matchSearch = t.desc.toLowerCase().includes(search.toLowerCase()) || t.ref.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <UserLayout title="Transactions">
      <div className="space-y-4 animate-fade-in">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center gap-3">
          <div className="flex gap-1">
            {typeFilters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search transactions..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
            </div>
            <input type="date"
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 outline-none focus:border-[#2563EB] transition-all" />
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all ml-auto">
            <Download size={13} /> Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Date', 'Description', 'Type', 'Amount', 'Status', 'Reference'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">{t.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          t.type === 'deposit' ? 'bg-green-50' : t.type === 'refund' ? 'bg-blue-50' : 'bg-slate-100'
                        }`}>
                          {t.type === 'deposit' ? <ArrowDownLeft size={13} className="text-green-500" /> :
                           t.type === 'refund' ? <RefreshCcw size={13} className="text-blue-500" /> :
                           <ArrowUpRight size={13} className="text-slate-500" />}
                        </div>
                        <span className="text-sm text-[#0F172A]">{t.desc}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                        t.type === 'deposit' ? 'bg-green-50 text-green-600' :
                        t.type === 'refund' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>{t.type}</span>
                    </td>
                    <td className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap ${t.amount.startsWith('+') ? 'text-green-500' : 'text-[#0F172A]'}`}>
                      {t.amount}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 font-medium capitalize">{t.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-slate-500">{t.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">No transactions found.</div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
