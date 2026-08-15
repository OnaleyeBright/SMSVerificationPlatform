import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Globe, Zap, Shield, Clock, Check, ChevronRight, ArrowRight,
  MessageSquare, Copy
} from 'lucide-react'
import Logo from '../components/Logo'

const services = [
  { name: 'Google', color: '#4285F4', letter: 'G' },
  { name: 'Telegram', color: '#26A5E4', letter: 'T' },
  { name: 'Discord', color: '#5865F2', letter: 'D' },
  { name: 'Facebook', color: '#1877F2', letter: 'f' },
  { name: 'Instagram', color: '#E1306C', letter: 'In' },
  { name: 'TikTok', color: '#010101', letter: 'Tt' },
  { name: 'Microsoft', color: '#00A4EF', letter: 'M' },
  { name: 'X', color: '#000000', letter: 'X' },
  { name: 'WhatsApp', color: '#25D366', letter: 'W' },
]

const features = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Receive verification messages in seconds, not minutes.' },
  { icon: Globe, title: 'Simple Pricing', desc: 'Clear pricing before every purchase. No surprises.' },
  { icon: MessageSquare, title: 'Reliable Numbers', desc: 'Access numbers from multiple providers globally.' },
  { icon: Shield, title: 'Secure Platform', desc: 'Your transactions and account data are fully protected.' },
]

const steps = [
  { num: '01', title: 'Choose a Country', desc: 'Select from 50+ supported countries with available numbers.' },
  { num: '02', title: 'Select a Service', desc: 'Pick the platform you need verification for.' },
  { num: '03', title: 'Get Your Number', desc: 'Instantly receive a virtual phone number.' },
  { num: '04', title: 'Receive Your OTP', desc: 'Copy your verification code with one click.' },
]

const trustPoints = [
  { label: '50+ Countries', sub: 'Global coverage' },
  { label: '< 30s', sub: 'Avg SMS delivery' },
  { label: '256-bit SSL', sub: 'Secure payments' },
  { label: 'Real-Time', sub: 'OTP delivery' },
]

const faqs = [
  { q: 'How quickly do I receive the SMS?', a: 'Most verification messages arrive within 15–30 seconds of requesting the number.' },
  { q: 'What happens if the SMS never arrives?', a: 'If no SMS is received within the timeout window, your account is automatically refunded.' },
  { q: 'Can I use one number for multiple services?', a: 'Each number purchase is tied to a single service to ensure clean verification flows.' },
  { q: 'What payment methods are accepted?', a: 'We accept Paystack and Flutterwave for seamless payments across Africa and globally.' },
]

export default function Landing() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [otpCopied, setOtpCopied] = useState(false)

  const handleCopyOtp = () => {
    setOtpCopied(true)
    setTimeout(() => setOtpCopied(false), 2000)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-8">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-6">
            {['Home', 'How It Works', 'Countries', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors">
              Login
            </button>
            <button onClick={() => navigate('/register')}
              className="text-sm font-semibold bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                Trusted by 10,000+ users worldwide
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0F172A] leading-tight mb-6">
                SMS Verification.<br />
                <span className="text-[#2563EB]">Fast.</span> Simple.<br />
                Reliable.
              </h1>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
                Get temporary virtual numbers and receive verification codes quickly from one secure platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  Get a Number <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 bg-white text-[#0F172A] font-semibold px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  Explore Countries <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Hero product preview */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm ml-auto">
                <div className="bg-[#0F172A] px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-white/40 text-xs ml-2">Active Order</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400 mb-1">Country</p>
                      <p className="text-sm font-semibold text-[#0F172A]">🇺🇸 United States</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400 mb-1">Service</p>
                      <p className="text-sm font-semibold text-[#0F172A]">Telegram</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-400 mb-2">Your Number</p>
                    <p className="text-2xl font-bold text-[#0F172A] font-mono tracking-wider">+1 202 555 0198</p>
                    <button className="mt-2 text-xs text-[#2563EB] font-medium flex items-center gap-1 mx-auto">
                      <Copy size={12} /> Copy
                    </button>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      <span className="text-xs font-semibold text-green-700">SMS Received</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">Your Telegram verification code is 482913.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-[#0F172A] font-mono tracking-widest">482913</span>
                      <button
                        onClick={handleCopyOtp}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${otpCopied ? 'bg-green-500 text-white' : 'bg-[#2563EB] text-white hover:bg-blue-700'}`}
                      >
                        {otpCopied ? '✓ Copied!' : 'Copy OTP'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-slate-100 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {trustPoints.map(t => (
              <div key={t.label} className="text-center">
                <p className="text-2xl font-bold text-[#0F172A]">{t.label}</p>
                <p className="text-sm text-slate-500 mt-1">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">How It Works</h2>
            <p className="text-slate-500">Four simple steps to receive your verification code.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-8 border-t-2 border-dashed border-slate-200 z-0" />
                )}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#2563EB]/30 hover:shadow-md transition-all relative z-10">
                  <span className="text-4xl font-black text-[#2563EB]/15 block mb-3">{s.num}</span>
                  <h3 className="font-semibold text-[#0F172A] mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Supported Services</h2>
            <p className="text-slate-500">Receive verification codes from the platforms you use daily.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-4">
            {services.map(s => (
              <div key={s.name} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#2563EB]/40 hover:shadow-sm transition-all cursor-default">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base"
                  style={{ backgroundColor: s.color }}>
                  {s.letter}
                </div>
                <span className="text-xs font-medium text-slate-600 text-center">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="pricing" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Why SMS Viper</h2>
            <p className="text-slate-500">Built for reliability, speed, and simplicity.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="font-semibold text-[#0F172A] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-medium text-[#0F172A] hover:bg-slate-50 transition-colors"
                >
                  {f.q}
                  <ChevronRight size={16} className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to receive your verification code?</h2>
          <p className="text-slate-400 mb-8">Join thousands of users who rely on SMS Viper every day.</p>
          <button onClick={() => navigate('/register')}
            className="bg-[#2563EB] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <Logo size="md" variant="light" />
              <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xs">
                Fast, reliable SMS verification numbers from a platform you can trust.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2">
                {['Buy Number', 'Rentals', 'API', 'Pricing'].map(l => (
                  <li key={l}><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Contact', 'FAQ'].map(l => (
                  <li key={l}><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Terms', 'Privacy', 'Acceptable Use'].map(l => (
                  <li key={l}><a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">© 2024 SMS Viper. All rights reserved.</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Check size={12} className="text-[#22C55E]" /> All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
