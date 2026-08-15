import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Check, ChevronRight, X } from 'lucide-react'
import UserLayout from '../../components/UserLayout'

const countries = [
  { flag: '🇺🇸', name: 'United States', code: 'US', available: 1240, price: 0.50 },
  { flag: '🇬🇧', name: 'United Kingdom', code: 'UK', available: 890, price: 0.55 },
  { flag: '🇨🇦', name: 'Canada', code: 'CA', available: 640, price: 0.48 },
  { flag: '🇳🇬', name: 'Nigeria', code: 'NG', available: 310, price: 0.35 },
  { flag: '🇩🇪', name: 'Germany', code: 'DE', available: 510, price: 0.60 },
  { flag: '🇫🇷', name: 'France', code: 'FR', available: 420, price: 0.58 },
  { flag: '🇦🇺', name: 'Australia', code: 'AU', available: 280, price: 0.65 },
  { flag: '🇳🇱', name: 'Netherlands', code: 'NL', available: 380, price: 0.55 },
]

const services = [
  { name: 'Google', color: '#4285F4', letter: 'G', price: 0.50 },
  { name: 'Telegram', color: '#26A5E4', letter: 'T', price: 0.45 },
  { name: 'Discord', color: '#5865F2', letter: 'D', price: 0.40 },
  { name: 'Facebook', color: '#1877F2', letter: 'f', price: 0.55 },
  { name: 'Instagram', color: '#E1306C', letter: 'In', price: 0.50 },
  { name: 'TikTok', color: '#010101', letter: 'Tt', price: 0.45 },
  { name: 'Microsoft', color: '#00A4EF', letter: 'M', price: 0.40 },
  { name: 'X', color: '#000000', letter: 'X', price: 0.35 },
  { name: 'WhatsApp', color: '#25D366', letter: 'W', price: 0.50 },
]

export default function BuyNumber() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null)
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  )

  const walletBalance = 125.50
  const totalPrice = (selectedCountry?.price ?? 0) + (selectedService?.price ?? 0) / 2

  const handleConfirm = () => {
    setPurchasing(true)
    setTimeout(() => { setPurchasing(false); setShowModal(false); navigate('/active-orders') }, 1200)
  }

  const steps = ['Country', 'Service', 'Number', 'Verification']

  return (
    <UserLayout title="Buy Number">
      <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
        {/* Progress */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i + 1 < step ? 'bg-[#22C55E] text-white' :
                    i + 1 === step ? 'bg-[#2563EB] text-white' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {i + 1 < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i + 1 === step ? 'text-[#2563EB]' : i + 1 < step ? 'text-green-500' : 'text-slate-400'}`}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mt-[-14px] rounded ${i + 1 < step ? 'bg-[#22C55E]' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Country */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h2 className="font-semibold text-[#0F172A] mb-4">Choose a Country</h2>
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search countries..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all" />
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {filtered.map(c => (
                <button key={c.code}
                  onClick={() => { setSelectedCountry(c); setStep(2) }}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                    selectedCountry?.code === c.code
                      ? 'border-[#2563EB] bg-blue-50'
                      : 'border-slate-200 hover:border-[#2563EB]/40 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0F172A]">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.available.toLocaleString()} available</p>
                  </div>
                  <span className="text-sm font-semibold text-[#2563EB]">${c.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Service */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600 text-sm">← Back</button>
              <span className="text-slate-300">|</span>
              <h2 className="font-semibold text-[#0F172A]">Select a Service</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services.map(s => (
                <button key={s.name}
                  onClick={() => { setSelectedService(s); setStep(3) }}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
                    selectedService?.name === s.name
                      ? 'border-[#2563EB] bg-blue-50'
                      : 'border-slate-200 hover:border-[#2563EB]/40 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base"
                    style={{ backgroundColor: s.color }}>
                    {s.letter}
                  </div>
                  <span className="text-sm font-medium text-[#0F172A]">{s.name}</span>
                  <span className="text-xs text-slate-400">${s.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && selectedCountry && selectedService && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-5">
              <button onClick={() => setStep(2)} className="text-slate-400 hover:text-slate-600 text-sm">← Back</button>
              <span className="text-slate-300">|</span>
              <h2 className="font-semibold text-[#0F172A]">Purchase Summary</h2>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Country</span>
                <span className="font-medium text-[#0F172A]">{selectedCountry.flag} {selectedCountry.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service</span>
                <span className="font-medium text-[#0F172A]">{selectedService.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Availability</span>
                <span className="font-medium text-green-600">{selectedCountry.available.toLocaleString()} numbers</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between text-sm">
                <span className="text-slate-500">Price</span>
                <span className="font-bold text-[#0F172A]">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Wallet Balance</span>
                <span className="font-medium text-[#0F172A]">${walletBalance.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => setShowModal(true)}
              className="w-full bg-[#2563EB] text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-base">
              Get Number <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedCountry && selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
              <h3 className="font-semibold text-[#0F172A]">Confirm Number Purchase</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {[
                ['Country', `${selectedCountry.flag} ${selectedCountry.name}`],
                ['Service', selectedService.name],
                ['Number price', `$${totalPrice.toFixed(2)}`],
                ['Current balance', `$${walletBalance.toFixed(2)}`],
                ['Remaining balance', `$${(walletBalance - totalPrice).toFixed(2)}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-slate-500">{k}</span>
                  <span className={`font-medium ${k === 'Remaining balance' ? 'text-green-600' : 'text-[#0F172A]'}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5 flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleConfirm} disabled={purchasing}
                className="flex-1 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70">
                {purchasing ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  )
}
