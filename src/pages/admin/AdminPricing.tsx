import { useState } from 'react'
import { Save, Check } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

const pricingData = [
  { country: '🇺🇸 United States', service: 'Telegram', provider: 'TigerSMS', provCost: '$0.28', markup: '$0.22', custPrice: '$0.50', avail: true },
  { country: '🇺🇸 United States', service: 'Google', provider: 'TigerSMS', provCost: '$0.25', markup: '$0.20', custPrice: '$0.45', avail: true },
  { country: '🇬🇧 United Kingdom', service: 'Telegram', provider: 'TigerSMS', provCost: '$0.30', markup: '$0.25', custPrice: '$0.55', avail: true },
  { country: '🇬🇧 United Kingdom', service: 'Discord', provider: 'TigerSMS', provCost: '$0.22', markup: '$0.18', custPrice: '$0.40', avail: true },
  { country: '🇨🇦 Canada', service: 'WhatsApp', provider: 'TigerSMS', provCost: '$0.26', markup: '$0.22', custPrice: '$0.48', avail: true },
  { country: '🇩🇪 Germany', service: 'Instagram', provider: 'TigerSMS', provCost: '$0.32', markup: '$0.23', custPrice: '$0.55', avail: false },
]

export default function AdminPricing() {
  const [markupType, setMarkupType] = useState<'fixed' | 'percent'>('fixed')
  const [globalMarkup, setGlobalMarkup] = useState('0.20')
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <AdminLayout title="Pricing">
      <div className="space-y-5 animate-fade-in">
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
            <Check size={16} className="text-green-500" /> Pricing saved.
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Markup Controls</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Markup Type</label>
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                {['fixed', 'percent'].map(t => (
                  <button key={t} onClick={() => setMarkupType(t as any)}
                    className={`flex-1 py-2 text-xs font-medium capitalize transition-all ${markupType === t ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                    {t === 'fixed' ? 'Fixed $' : 'Percent %'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Global Markup</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">{markupType === 'fixed' ? '$' : '%'}</span>
                <input type="number" value={globalMarkup} onChange={e => setGlobalMarkup(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Country Markup</label>
              <input type="number" placeholder="0.00"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Service Markup</label>
              <input type="number" placeholder="0.00"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#2563EB] transition-all" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="font-semibold text-[#0F172A] text-sm">Pricing Table</h3>
            <button onClick={save}
              className="flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Save size={12} /> Save Pricing
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Country', 'Service', 'Provider', 'Provider Cost', 'Markup', 'Customer Price', 'Available'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricingData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-[#0F172A] whitespace-nowrap">{row.country}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{row.service}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{row.provider}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{row.provCost}</td>
                    <td className="px-4 py-3">
                      <input type="text" defaultValue={row.markup.replace('$', '')}
                        className="w-16 px-2 py-1 rounded border border-slate-200 text-xs font-mono outline-none focus:border-[#2563EB] transition-all" />
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-[#0F172A]">{row.custPrice}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.avail ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        {row.avail ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
