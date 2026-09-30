import type { CSSProperties } from 'react'
import { LogoMark } from './Logo'

export const FINISHES = {
  azul: { name: 'Azul profundo', metal: '#3a4d6b', glass: '#2c3d57' },
  laranja: { name: 'Laranja cósmico', metal: '#c8662e', glass: '#d97a3e' },
  prata: { name: 'Prata', metal: '#c9ccd1', glass: '#e4e6ea', light: true },
  natural: { name: 'Titânio natural', metal: '#a89f92', glass: '#bdb4a6', light: true },
  preto: { name: 'Preto espacial', metal: '#2b2c30', glass: '#1d1e22' },
} as const

export type Finish = keyof typeof FINISHES
type Screen = 'lock' | 'home' | 'brand'
type Wall = 'aurora' | 'sunset' | 'mint' | 'brand'

type Props = {
  size?: number
  finish?: Finish
  screen?: Screen
  wall?: Wall
  className?: string
  style?: CSSProperties
}

const SLICES = [-4, -3, -2, -1, 0, 1, 2, 3, 4]

export function IPhone({ size = 280, finish = 'azul', screen = 'lock', wall = 'aurora', className, style }: Props) {
  const f = FINISHES[finish]
  return (
    <div
      className={`iphone ${className ?? ''}`}
      style={{ fontSize: size / 100, '--metal': f.metal, '--glass': f.glass, ...style } as CSSProperties}
    >
      {SLICES.map((z) => (
        <div key={z} className="iphone-slice" style={{ transform: `translateZ(${z}em)` }} />
      ))}

      <div className="iphone-face iphone-back">
        <div className="iphone-glass" />
        <div className="iphone-plateau">
          <span className="iphone-lens" style={{ top: '4.4em', left: '5em' }} />
          <span className="iphone-lens" style={{ top: '27.6em', left: '5em' }} />
          <span className="iphone-lens" style={{ top: '16em', left: '25.5em' }} />
          <span className="iphone-flash" style={{ top: '10em', right: '10em' }} />
          <span className="iphone-lidar" style={{ top: '33em', right: '10em' }} />
          <span className="iphone-mic" style={{ top: '23.5em', right: '4.5em' }} />
        </div>
        <LogoMark className="iphone-logo" style={{ color: 'light' in f ? 'rgb(0 0 0 / .55)' : 'rgb(255 255 255 / .9)' }} />
      </div>

      <div className="iphone-face iphone-front">
        <div className="iphone-bezel" />
        <div className={`iphone-screen wall-${wall}`}>
          <div className="iphone-island" />
          <StatusBar />
          {screen === 'lock' && <LockScreen />}
          {screen === 'home' && <HomeScreen />}
          {screen === 'brand' && <BrandScreen />}
          <div className="iphone-glare" />
        </div>
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-[4.6em] z-10 flex items-center justify-between px-[10em] font-semibold text-white">
      <span style={{ fontSize: '5.2em' }}>9:41</span>
      <span className="flex items-center gap-[1.6em]">
        <span className="flex items-end gap-[0.6em]">
          {[2, 3, 4, 5].map((h) => (
            <i key={h} className="block w-[1.2em] rounded-[0.3em] bg-white" style={{ height: `${h}em` }} />
          ))}
        </span>
        <span className="relative block h-[4.2em] w-[8.4em] rounded-[1.4em] border-[0.5em] border-white/50 p-[0.5em]">
          <i className="block h-full w-3/4 rounded-[0.6em] bg-white" />
        </span>
      </span>
    </div>
  )
}

function LockScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center pt-[24em] text-white">
      <span className="font-medium opacity-80" style={{ fontSize: '5em' }}>
        Natal · RN
      </span>
      <span className="font-semibold leading-none tracking-tight" style={{ fontSize: '30em' }}>
        9:41
      </span>
      <div className="mt-auto mb-[10em] flex w-full justify-between px-[12em]">
        {[0, 1].map((i) => (
          <span key={i} className="block h-[14em] w-[14em] rounded-full bg-white/15 backdrop-blur" />
        ))}
      </div>
      <span className="mb-[3.5em] block h-[1.4em] w-[36em] rounded-full bg-white/90" />
    </div>
  )
}

const APP_COLORS = [
  ['#5fa4e8', '#3270a6'],
  ['#7fe0c3', '#1f9d7a'],
  ['#ffcf6b', '#f08a24'],
  ['#ff8fa3', '#e0355b'],
  ['#b69cff', '#6d4ce0'],
  ['#fff', '#cfd6df'],
  ['#8cc4ff', '#2d5f9a'],
  ['#ffb38a', '#e0612d'],
  ['#9ef08a', '#35a852'],
  ['#1c1c1e', '#3a3a3c'],
  ['#ffd9e6', '#f07aa8'],
  ['#a8e6ff', '#1b8fd6'],
  ['#ffe28a', '#e6b500'],
  ['#c4c4c8', '#7c7c82'],
  ['#ff9d5c', '#d9463b'],
  ['#5fa4e8', '#7b5cff'],
]

function AppIcon({ c }: { c: string[] }) {
  return (
    <span
      className="block aspect-square w-full rounded-[4.6em] shadow-[0_0.6em_1.2em_rgb(0_0_0/0.25)]"
      style={{ background: `linear-gradient(145deg, ${c[0]}, ${c[1]})` }}
    />
  )
}

function HomeScreen() {
  return (
    <div className="absolute inset-0 px-[8em] pt-[22em]">
      <div className="grid grid-cols-4 gap-x-[5.5em] gap-y-[8em]">
        {APP_COLORS.map((c, i) => (
          <AppIcon key={i} c={c} />
        ))}
      </div>
      <div className="absolute inset-x-[4em] bottom-[5em] grid grid-cols-4 gap-[5.5em] rounded-[9em] bg-white/20 p-[4.5em] backdrop-blur-md">
        {[APP_COLORS[1], APP_COLORS[5], APP_COLORS[0], APP_COLORS[3]].map((c, i) => (
          <AppIcon key={i} c={c} />
        ))}
      </div>
    </div>
  )
}

function BrandScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6em] text-white">
      <LogoMark style={{ width: '40em', height: '40em' }} />
      <span className="font-semibold tracking-tight" style={{ fontSize: '8em' }}>
        Caio Connect
      </span>
    </div>
  )
}
