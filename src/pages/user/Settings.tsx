import { useState } from 'react'
import { Check, Shield, User, Bell, Code2 } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-[#2563EB]' : 'bg-slate-200'}`}
      style={{ height: 22 }}
    >
      <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`}
        style={{ width: 18, height: 18, top: 2 }} />
    </button>
  )
}

export default function Settings() {
  const [tab, setTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [twoFa, setTwoFa] = useState(false)
  const [notifs, setNotifs] = useState({ sms: true, orders: true, deposits: true, promo: false })

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API', icon: Code2 },
  ]

  return (
    <UserLayout title="Settings">
      <div className="max-w-2xl space-y-5 animate-fade-in">
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
            <Check size={16} className="text-green-500" /> Settings saved successfully.
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100 overflow-x-auto">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  tab === t.id ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {tab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white text-2xl font-bold">JD</div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">John Doe</p>
                    <p className="text-sm text-slate-400">Member since August 2024</p>
                  </div>
                </div>
                {[
                  { label: 'Full Name', placeholder: 'John Doe', type: 'text', defaultVal: 'John Doe' },
                  { label: 'Email', placeholder: 'john@example.com', type: 'email', defaultVal: 'john@example.com' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">{f.label}</label>
                    <input type={f.type} defaultValue={f.defaultVal} placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Country</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 bg-white transition-all">
                    <option>🇺🇸 United States</option>
                    <option>🇬🇧 United Kingdom</option>
                    <option>🇳🇬 Nigeria</option>
                    <option>🇬🇭 Ghana</option>
                  </select>
                </div>
                <button onClick={save} className="bg-[#2563EB] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
                  Save Changes
                </button>
              </div>
            )}

            {tab === 'security' && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium text-[#0F172A] mb-3">Change Password</h3>
                  <div className="space-y-3">
                    {['Current Password', 'New Password', 'Confirm New Password'].map(l => (
                      <div key={l}>
                        <label className="text-sm text-slate-600 mb-1.5 block">{l}</label>
                        <input type="password" placeholder="••••••••"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
                      </div>
                    ))}
                    <button onClick={save} className="bg-[#2563EB] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-[#0F172A]">Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-400 mt-0.5">Add an extra layer of security to your account.</p>
                    </div>
                    <Toggle on={twoFa} onChange={() => setTwoFa(!twoFa)} />
                  </div>
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="space-y-4">
                {[
                  { key: 'sms', label: 'SMS Received', desc: 'Get notified when an SMS arrives on your number.' },
                  { key: 'orders', label: 'Order Updates', desc: 'Status changes for active and completed orders.' },
                  { key: 'deposits', label: 'Wallet Deposits', desc: 'Confirmation when funds are added to your wallet.' },
                  { key: 'promo', label: 'Promotional', desc: 'Updates on new features, offers, and announcements.' },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{n.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                    </div>
                    <Toggle
                      on={notifs[n.key as keyof typeof notifs]}
                      onChange={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key as keyof typeof notifs] })}
                    />
                  </div>
                ))}
                <button onClick={save} className="bg-[#2563EB] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
                  Save Preferences
                </button>
              </div>
            )}

            {tab === 'api' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-500">Manage your API credentials and integration settings.</p>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
                  Visit the <button className="text-[#2563EB] font-medium hover:underline">API page</button> to manage your API key, view usage, and configure webhooks.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
