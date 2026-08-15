import { useState } from 'react'
import { Clock, Bell, Check } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

const plans = [
  { duration: '1 Day', label: 'Short-term rental', price: '$2.99', features: ['1 virtual number', 'Unlimited SMS', '24h access', 'Any supported service'] },
  { duration: '7 Days', label: 'Extended rental', price: '$9.99', features: ['1 virtual number', 'Unlimited SMS', '7-day access', 'Any supported service', 'Priority delivery'], popular: true },
  { duration: '30 Days', label: 'Long-term rental', price: '$29.99', features: ['1 virtual number', 'Unlimited SMS', '30-day access', 'Any supported service', 'Priority delivery', 'Dedicated support'] },
]

export default function Rentals() {
  const [notified, setNotified] = useState(false)

  return (
    <UserLayout title="Rentals">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Clock size={13} /> Coming Soon
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Rent a Number</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Keep a dedicated virtual number for longer periods and receive SMS throughout your rental.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map(p => (
            <div key={p.duration} className={`relative bg-white rounded-2xl p-6 border transition-all ${
              p.popular ? 'border-[#2563EB] shadow-lg shadow-blue-100' : 'border-slate-200'
            }`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="mb-4">
                <h3 className="font-bold text-[#0F172A] text-lg">{p.duration}</h3>
                <p className="text-slate-500 text-sm">{p.label}</p>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-black text-[#0F172A]">{p.price}</span>
                <span className="text-slate-400 text-sm ml-1">/ period</span>
              </div>
              <ul className="space-y-2 mb-6">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={14} className="text-[#22C55E] flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-400 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[#0F172A] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Be the first to know</h3>
          <p className="text-slate-400 text-sm mb-6">Get notified when rental numbers launch.</p>
          {notified ? (
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-5 py-2.5 rounded-xl font-medium">
              <Check size={16} /> You&apos;re on the list!
            </div>
          ) : (
            <button onClick={() => setNotified(true)}
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-600 transition-colors">
              <Bell size={16} /> Notify Me
            </button>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
