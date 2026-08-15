import { useState } from 'react'
import { Plus, ArrowDownLeft, ArrowUpRight, RefreshCcw, Check } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

const quickAmounts = [5, 10, 25, 50, 100]

const activity = [
  { type: 'deposit', desc: 'Deposit via Paystack', amount: '+$50.00', date: 'Aug 15, 2024', status: 'completed', ref: 'PSK-2024081501' },
  { type: 'purchase', desc: 'Number — Telegram (US)', amount: '-$0.50', date: 'Aug 15, 2024', status: 'completed', ref: 'VH-10248' },
  { type: 'purchase', desc: 'Number — Google (UK)', amount: '-$0.45', date: 'Aug 14, 2024', status: 'completed', ref: 'VH-10247' },
  { type: 'refund', desc: 'Refund — Discord (CA)', amount: '+$0.40', date: 'Aug 14, 2024', status: 'completed', ref: 'VH-10239' },
  { type: 'deposit', desc: 'Deposit via Flutterwave', amount: '+$25.00', date: 'Aug 12, 2024', status: 'completed', ref: 'FLW-2024081201' },
  { type: 'purchase', desc: 'Number — Instagram (US)', amount: '-$0.50', date: 'Aug 11, 2024', status: 'completed', ref: 'VH-10235' },
]

export default function Wallet() {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('')
  const [adding, setAdding] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAddFunds = () => {
    if (!amount || !method) return
    setAdding(true)
    setTimeout(() => { setAdding(false); setSuccess(true); setTimeout(() => setSuccess(false), 3000) }, 1000)
  }

  return (
    <UserLayout title="Wallet">
      <div className="space-y-6 animate-fade-in">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Balance card */}
          <div className="lg:col-span-1">
            <div className="bg-[#0F172A] rounded-2xl p-6 text-white">
              <p className="text-slate-400 text-sm font-medium mb-1">Available Balance</p>
              <p className="text-4xl font-bold mb-6">$125.50</p>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="mb-1">Total deposited</p>
                  <p className="text-white font-semibold text-base">$968.00</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="mb-1">Total spent</p>
                  <p className="text-white font-semibold text-base">$842.50</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add funds */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200">
            <h2 className="font-semibold text-[#0F172A] mb-4">Add Funds</h2>

            {success && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 text-sm text-green-700">
                <Check size={16} className="text-green-500" /> Payment initiated successfully!
              </div>
            )}

            <div className="mb-4">
              <p className="text-xs font-medium text-slate-500 mb-2">Quick amounts</p>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map(a => (
                  <button key={a} onClick={() => setAmount(String(a))}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                      amount === String(a) ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-slate-200 text-slate-600 hover:border-[#2563EB]/40'
                    }`}>
                    ${a}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Custom amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">$</span>
                <input type="number" min="1" placeholder="Enter amount"
                  value={amount} onChange={e => setAmount(e.target.value)}
                  className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-medium text-slate-500 mb-2">Payment method</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'paystack', name: 'Paystack', color: '#00C3F7', letter: 'P', sub: 'Cards, Bank Transfer' },
                  { id: 'flutterwave', name: 'Flutterwave', color: '#F5A623', letter: 'F', sub: 'Cards, Mobile Money' },
                ].map(m => (
                  <button key={m.id} onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                      method === m.id ? 'border-[#2563EB] bg-blue-50' : 'border-slate-200 hover:border-[#2563EB]/40'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: m.color }}>{m.letter}</div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAddFunds} disabled={adding || !amount || !method}
              className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm">
              <Plus size={16} /> {adding ? 'Processing...' : `Add $${amount || '0.00'}`}
            </button>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-[#0F172A]">Wallet Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Date', 'Description', 'Amount', 'Status', 'Reference'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activity.map((t, i) => (
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
        </div>
      </div>
    </UserLayout>
  )
}
