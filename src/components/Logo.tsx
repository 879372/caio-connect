import { useId, type CSSProperties } from 'react'

// Marca da Caio Connect redesenhada em vetor a partir da foto de perfil do Instagram
export function LogoMark({ className, style }: { className?: string; style?: CSSProperties }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <mask id={id}>
        <rect width="100" height="100" fill="#fff" />
        <polygon points="13,44 13,56 31,50" fill="#000" />
      </mask>
      <circle
        cx="50"
        cy="50"
        r="27"
        fill="none"
        stroke="currentColor"
        strokeWidth="15"
        strokeDasharray="135.7 33.9"
        transform="rotate(36 50 50)"
        mask={`url(#${id})`}
      />
      <circle cx="50" cy="50" r="9" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-brand shadow-[0_0_24px_-4px] shadow-brand/70">
        <LogoMark className="size-7 text-white" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight">
        Caio <span className="text-brand-light">Connect</span>
      </span>
    </span>
  )
}
