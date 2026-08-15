import { useState } from 'react'
import { Copy, RefreshCw, Check } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

const ordersData = [
  {
    id: 'VH-10248', service: 'Telegram', country: '🇺🇸 United States', number: '+1 202 555 0198',
    price: '$0.50', status: 'received', timeLeft: '04:22',
    sms: { sender: 'Telegram', body: 'Your Telegram verification code is 482913.', otp: '482913' }
  },
  {
    id: 'VH-10247', service: 'Google', country: '🇬🇧 United Kingdom', number: '+44 7700 900142',
    price: '$0.50', status: 'waiting', timeLeft: '09:08', sms: null
  },
  {
    id: 'VH-10246', service: 'Discord', country: '🇨🇦 Canada', number: '+1 604 555 0173',
    price: '$0.40', status: 'waiting', timeLeft: '06:45', sms: null
  },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; dot: string }> = {
    waiting: { label: 'Waiting for SMS', cls: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-400 animate-pulse-live' },
    received: { label: 'SMS Received', cls: 'bg-green-50 text-green-600 border-green-200', dot: 'bg-green-400' },
    completed: { label: 'Completed', cls: 'bg-blue-50 text-blue-600 border-blue-200', dot: 'bg-blue-400' },
    expired: { label: 'Expired', cls: 'bg-slate-100 text-slate-500 border-slate-200', dot: 'bg-slate-400' },
  }
  const { label, cls, dot } = map[status] ?? map.expired
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />{label}
    </span>
  )
}

export default function ActiveOrders() {
  const [selected, setSelected] = useState(ordersData[0])
  const [copiedNum, setCopiedNum] = useState(false)
  const [copiedOtp, setCopiedOtp] = useState(false)

  const copy = (text: string, which: 'num' | 'otp') => {
    navigator.clipboard?.writeText(text)
    if (which === 'num') { setCopiedNum(true); setTimeout(() => setCopiedNum(false), 2000) }
    else { setCopiedOtp(true); setTimeout(() => setCopiedOtp(false), 2000) }
  }

  return (
    <UserLayout title="Active Orders">
      <div className="grid lg:grid-cols-5 gap-6 animate-fade-in">
        {/* Orders list */}
        <div className="lg:col-span-2 space-y-3">
          {ordersData.map(o => (
            <button key={o.id} onClick={() => setSelected(o)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selected.id === o.id ? 'border-[#2563EB] bg-blue-50' : 'border-slate-200 bg-white hover:border-[#2563EB]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500">{o.id}</span>
                <StatusBadge status={o.status} />
              </div>
              <p className="font-semibold text-[#0F172A] text-sm">{o.service} — {o.country}</p>
              <p className="text-xs font-mono text-slate-500 mt-1">{o.number}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">{o.price}</span>
                <span className={`text-xs font-mono font-semibold ${o.status === 'waiting' ? 'text-amber-500' : 'text-green-500'}`}>
                  {o.timeLeft}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-[#0F172A]">Order {selected.id}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{selected.service} · {selected.country}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="p-6 space-y-5">
              {/* Order info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Service', selected.service],
                  ['Country', selected.country],
                  ['Price', selected.price],
                  ['Time Remaining', selected.timeLeft],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 mb-1">{k}</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{v}</p>
                  </div>
                ))}
              </div>

              {/* Number card */}
              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">Your Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-[#0F172A] font-mono tracking-wider">{selected.number}</p>
                  <button onClick={() => copy(selected.number, 'num')}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                      copiedNum ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {copiedNum ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>
              </div>

              {/* SMS state */}
              {selected.status === 'waiting' ? (
                <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-live" />
                    <span className="text-sm font-semibold text-slate-600">Waiting for SMS...</span>
                  </div>
                  <p className="text-xs text-slate-400">Your verification message will appear here when received.</p>
                  <button className="mt-4 flex items-center gap-1.5 text-xs text-[#2563EB] font-medium mx-auto hover:text-blue-700">
                    <RefreshCw size={13} /> Refresh
                  </button>
                </div>
              ) : selected.sms ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 animate-fade-in">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm font-semibold text-green-700">SMS Received</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">Sender: {selected.sms.sender}</p>
                  <p className="text-sm text-slate-700 mb-4 leading-relaxed">{selected.sms.body}</p>
                  <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-green-200">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Verification Code</p>
                      <p className="text-3xl font-bold text-[#0F172A] font-mono tracking-widest">{selected.sms.otp}</p>
                    </div>
                    <button onClick={() => copy(selected.sms!.otp, 'otp')}
                      className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-xl text-sm transition-all ${
                        copiedOtp ? 'bg-green-500 text-white' : 'bg-[#2563EB] text-white hover:bg-blue-700'
                      }`}
                    >
                      {copiedOtp ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy OTP</>}
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel Order
                </button>
                {selected.sms && (
                  <button className="flex-1 py-2.5 rounded-xl bg-[#22C55E] text-white text-sm font-semibold hover:bg-green-600 transition-colors">
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
