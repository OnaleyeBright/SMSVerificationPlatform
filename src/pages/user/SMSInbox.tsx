import { useState } from 'react'
import { Search, Copy, RefreshCw, Check, Filter } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

const inboxItems = [
  {
    id: 'VH-10248', service: 'Telegram', serviceColor: '#26A5E4', serviceLetter: 'T',
    number: '+1 202 555 0198', country: '🇺🇸', preview: 'Your Telegram verification code is 482913.',
    time: '2m ago', unread: true, status: 'received',
    otp: '482913', sender: 'Telegram',
    messages: [{ body: 'Your Telegram verification code is 482913. Do not share this code with anyone.', time: '10:38 AM' }]
  },
  {
    id: 'VH-10247', service: 'Google', serviceColor: '#4285F4', serviceLetter: 'G',
    number: '+44 7700 900142', country: '🇬🇧', preview: 'G-291847 is your Google verification code.',
    time: '18m ago', unread: false, status: 'received',
    otp: '291847', sender: 'Google',
    messages: [{ body: 'G-291847 is your Google verification code.', time: '10:22 AM' }]
  },
  {
    id: 'VH-10239', service: 'Discord', serviceColor: '#5865F2', serviceLetter: 'D',
    number: '+1 604 555 0173', country: '🇨🇦', preview: 'Your Discord verification code: 73821.',
    time: '1h ago', unread: false, status: 'completed',
    otp: '73821', sender: 'Discord',
    messages: [{ body: 'Your Discord verification code: 73821. This code expires in 10 minutes.', time: '9:05 AM' }]
  },
  {
    id: 'VH-10234', service: 'WhatsApp', serviceColor: '#25D366', serviceLetter: 'W',
    number: '+49 151 5551 0942', country: '🇩🇪', preview: 'Your WhatsApp Business code: 495-213',
    time: '3h ago', unread: false, status: 'expired',
    otp: '495213', sender: 'WhatsApp',
    messages: [{ body: 'Your WhatsApp Business code: 495-213. You can also tap this link to verify...', time: '7:14 AM' }]
  },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    waiting: { label: 'Waiting', cls: 'bg-amber-50 text-amber-600' },
    received: { label: 'Received', cls: 'bg-green-50 text-green-600' },
    completed: { label: 'Completed', cls: 'bg-blue-50 text-blue-600' },
    expired: { label: 'Expired', cls: 'bg-slate-100 text-slate-500' },
  }
  const { label, cls } = map[status] ?? map.expired
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{label}</span>
}

export default function SMSInbox() {
  const [selected, setSelected] = useState(inboxItems[0])
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState(false)

  const filtered = inboxItems.filter(i =>
    i.service.toLowerCase().includes(search.toLowerCase()) ||
    i.number.includes(search) ||
    i.otp.includes(search)
  )

  const copy = () => {
    navigator.clipboard?.writeText(selected.otp)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <UserLayout title="SMS Inbox">
      <div className="grid lg:grid-cols-5 gap-0 bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in" style={{ height: 'calc(100vh - 140px)', minHeight: 500 }}>
        {/* Left panel */}
        <div className="lg:col-span-2 border-r border-slate-100 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search messages..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
              </div>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <Filter size={14} />
              </button>
            </div>
          </div>
          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filtered.map(item => (
              <button key={item.id} onClick={() => setSelected(item)}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${selected.id === item.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: item.serviceColor }}>
                    {item.serviceLetter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-semibold text-[#0F172A]">{item.service}</span>
                      <div className="flex items-center gap-1.5">
                        {item.unread && <div className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{item.country} {item.number}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{item.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-3 flex flex-col">
          {/* Header */}
          <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: selected.serviceColor }}>
                {selected.serviceLetter}
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] text-sm">{selected.service}</p>
                <p className="text-xs text-slate-400 font-mono">{selected.country} {selected.number}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={selected.status} />
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {selected.messages.map((m, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                  <p className="text-xs text-slate-500 mb-1">{selected.sender}</p>
                  <p className="text-sm text-[#0F172A] leading-relaxed">{m.body}</p>
                </div>
                <span className="text-xs text-slate-400 pl-2">{m.time}</span>
              </div>
            ))}
          </div>

          {/* OTP card */}
          {selected.otp && (
            <div className="border-t border-slate-100 p-5">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Verification Code</p>
                  <p className="text-2xl font-bold text-[#0F172A] font-mono tracking-widest">{selected.otp}</p>
                </div>
                <button onClick={copy}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    copied ? 'bg-green-500 text-white' : 'bg-[#2563EB] text-white hover:bg-blue-700'
                  }`}
                >
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy OTP</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
