interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light'
}

export default function Logo({ size = 'md', variant = 'dark' }: LogoProps) {
  const sizes = { sm: 20, md: 28, lg: 36 }
  const textSizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' }
  const s = sizes[size]
  const color = variant === 'light' ? '#ffffff' : '#2563EB'
  const textColor = variant === 'light' ? 'text-white' : 'text-[#0F172A]'

  return (
    <div className="flex items-center gap-2">
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        {/* Phone body */}
        <rect x="8" y="2" width="16" height="26" rx="3" fill={color} opacity="0.15" />
        <rect x="8" y="2" width="16" height="26" rx="3" stroke={color} strokeWidth="2" />
        <rect x="12" y="6" width="8" height="14" rx="1" fill={color} opacity="0.25" />
        {/* Viper head subtle overlay */}
        <path d="M13 13 Q16 10 19 13 Q16 16 13 13Z" fill={color} />
        <circle cx="21" cy="27" r="1.5" fill={color} />
        {/* Checkmark */}
        <path d="M13 20 L15.2 22.5 L19 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`${textSizes[size]} font-bold tracking-tight ${textColor}`}>
        SMS <span style={{ color }}>Viper</span>
      </span>
    </div>
  )
}
