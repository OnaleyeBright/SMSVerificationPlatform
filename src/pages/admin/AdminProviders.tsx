import { useState } from 'react'
import { Plus, RefreshCw, Check, Wifi, WifiOff } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const providers = [
  {
    id: 'tigersms', name: 'TigerSMS', status: 'connected', balance: '$1,240.50',
    numbers: '48,200', successRate: '94.2%', lastSync: '30s ago', color: '#FF6B35', letter: 'T',
    metrics: { today: 2184, week: 14820, month: 58400 }
  },
]

const plannedProviders = [
  { name: '5SIM', letter: '5', color: '#6366F1', desc: 'Global virtual number provider' },
  { name: 'SMSPool', letter: 'S', color: '#10B981', desc: 'Community-powered SMS pool' },
  { name: 'SimSMS', letter: 'Sm', color: '#F59E0B', desc: 'Affordable SMS verification' },
]

export default function AdminProviders() {
  const [syncing, setSyncing] = useState(false)

  const sync = () => { setSyncing(true); setTimeout(() => setSyncing(false), 1500) }

  return (
    <AdminLayout title="Providers">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-[#0F172A]">SMS Providers</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage connected number providers and their configurations.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={14} /> Add Provider
          </button>
        </div>

        {/* Active providers */}
        {providers.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: p.color }}>{p.letter}</div>
                <div>
                  <h3 className="font-semibold text-[#0F172A]">{p.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <Wifi size={11} className="text-green-500" />
                    <span className="text-xs text-green-500 font-medium">Connected</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={sync}
                  className="flex items-center gap-1.5 text-xs text-slate-500 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                  <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
                  {syncing ? 'Syncing...' : 'Sync Now'}
                </button>
                <button className="text-xs text-slate-500 px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">Settings</button>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'API Status', value: 'Operational', cls: 'text-green-500' },
                { label: 'Provider Balance', value: p.balance, cls: 'text-[#0F172A]' },
                { label: 'Available Numbers', value: p.numbers, cls: 'text-[#0F172A]' },
                { label: 'Success Rate', value: p.successRate, cls: 'text-green-500' },
                { label: 'Last Sync', value: p.lastSync, cls: 'text-slate-500' },
                { label: 'Orders Today', value: p.metrics.today.toLocaleString(), cls: 'text-[#2563EB]' },
              ].map(m => (
                <div key={m.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">{m.label}</p>
                  <p className={`text-sm font-bold ${m.cls}`}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Future providers */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 mb-3">Available to Add</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {plannedProviders.map(p => (
              <div key={p.name} className="bg-white rounded-xl border border-dashed border-slate-200 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm opacity-60"
                  style={{ backgroundColor: p.color }}>{p.letter}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-500 text-sm">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </div>
                <button className="text-xs text-[#2563EB] font-medium hover:underline flex-shrink-0">Connect</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
