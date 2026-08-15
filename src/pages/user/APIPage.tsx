import { useState } from 'react'
import { Copy, RefreshCw, Check, Eye, EyeOff, Code2, Webhook, BookOpen } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

const codeExample = `POST /api/v1/numbers/purchase HTTP/1.1
Host: api.smsviper.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "country": "US",
  "service": "telegram",
  "webhook_url": "https://your-app.com/webhook"
}

// Response 200 OK
{
  "success": true,
  "order_id": "VH-10249",
  "number": "+1 202 555 0247",
  "expires_at": "2024-08-15T11:38:00Z"
}`

export default function APIPage() {
  const [showKey, setShowKey] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)
  const [tab, setTab] = useState('docs')
  const apiKey = 'sk_live_vp_a8f2b9d1c3e4f567890abcdef1234567'
  const maskedKey = 'sk_live_vp_' + '•'.repeat(24)

  const copyKey = () => {
    navigator.clipboard?.writeText(apiKey)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  const tabs = [
    { id: 'docs', label: 'Documentation', icon: BookOpen },
    { id: 'usage', label: 'API Usage', icon: Code2 },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  ]

  return (
    <UserLayout title="API">
      <div className="space-y-6 max-w-4xl animate-fade-in">
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-bold text-[#0F172A] text-lg">Build with SMS Viper</h2>
            <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">Beta</span>
          </div>
          <p className="text-slate-500 text-sm">Integrate virtual numbers and SMS verification directly into your application.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'API Status', value: 'Operational', color: 'text-green-500', bg: 'bg-green-50' },
            { label: 'API Requests', value: '1,284', color: 'text-[#2563EB]', bg: 'bg-blue-50' },
            { label: 'API Usage', value: '23%', color: 'text-violet-500', bg: 'bg-violet-50' },
            { label: 'Rate Limit', value: '1,000/hr', color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* API Key */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <h3 className="font-semibold text-[#0F172A] mb-4">API Key</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 font-mono text-sm text-slate-600 overflow-hidden">
              <span className="truncate">{showKey ? apiKey : maskedKey}</span>
            </div>
            <button onClick={() => setShowKey(!showKey)} className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button onClick={copyKey} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${copiedKey ? 'bg-green-500 text-white' : 'bg-[#2563EB] text-white hover:bg-blue-700'}`}>
              {copiedKey ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <RefreshCw size={14} /> Regenerate
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Keep your API key secure. Never expose it in client-side code.</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all border-b-2 ${
                  tab === t.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                <t.icon size={15} /> {t.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {tab === 'docs' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Use the SMS Viper REST API to programmatically purchase virtual numbers, receive SMS messages via webhooks, and manage orders.</p>
                <div className="bg-[#0F172A] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs font-mono leading-relaxed">
                    {codeExample.split('\n').map((line, i) => (
                      <span key={i} className={`block ${
                        line.startsWith('//') ? 'text-slate-500' :
                        line.startsWith('{') || line.startsWith('}') ? 'text-slate-300' :
                        line.includes(':') && !line.includes('//') ? 'text-[#93C5FD]' :
                        line.startsWith('"') ? 'text-[#86EFAC]' :
                        'text-slate-200'
                      }`}>{line || ' '}</span>
                    ))}
                  </pre>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { method: 'GET', path: '/api/v1/countries', desc: 'List available countries' },
                    { method: 'GET', path: '/api/v1/services', desc: 'List supported services' },
                    { method: 'POST', path: '/api/v1/numbers/purchase', desc: 'Purchase a virtual number' },
                    { method: 'GET', path: '/api/v1/orders/{id}', desc: 'Get order status & SMS' },
                    { method: 'DELETE', path: '/api/v1/orders/{id}', desc: 'Cancel an active order' },
                    { method: 'GET', path: '/api/v1/wallet', desc: 'Get wallet balance' },
                  ].map(e => (
                    <div key={e.path} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                        e.method === 'GET' ? 'bg-green-100 text-green-700' :
                        e.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>{e.method}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-[#0F172A] truncate">{e.path}</p>
                        <p className="text-xs text-slate-400">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'usage' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 text-sm font-medium px-4 py-2 rounded-full mb-3">
                  Coming Soon
                </div>
                <p className="text-slate-400 text-sm">Detailed API usage analytics will be available soon.</p>
              </div>
            )}

            {tab === 'webhooks' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Configure a webhook URL to receive real-time notifications when an SMS is received on your virtual number.</p>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Webhook URL</label>
                  <input type="url" placeholder="https://your-app.com/webhook/sms"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
                </div>
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  Advanced webhook management — Coming Soon
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
