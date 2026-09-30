import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { IPhone, type Finish } from './IPhone'
import { Logo } from './Logo'
import { Eyebrow, WhatsAppButton } from './ui'
import { WHATSAPP } from '../lib/config'

const ease = [0.22, 1, 0.36, 1] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5 ${
          scrolled ? 'border border-line bg-ink/70 shadow-2xl shadow-black/40 backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <a href="#top" aria-label="Caio Connect">
          <Logo />
        </a>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {[
            ['Produtos', '#produtos'],
            ['Cores', '#cores'],
            ['Por que a Caio', '#diferenciais'],
            ['Como comprar', '#comprar'],
          ].map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-white">
              {l}
            </a>
          ))}
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brand-glow"
        >
          Comprar agora
        </a>
      </nav>
    </motion.header>
  )
}

type PhoneSpec = {
  finish: Finish
  screen: 'lock' | 'home' | 'brand'
  wall: 'aurora' | 'sunset' | 'mint' | 'brand'
  size: number
  x: number
  z: number
  rotY: number
  rotZ: number
  delay: number
  float: number
}

const PHONES: PhoneSpec[] = [
  { finish: 'laranja', screen: 'lock', wall: 'sunset', size: 215, x: -190, z: -160, rotY: 28, rotZ: -6, delay: 0.55, float: 5.5 },
  { finish: 'prata', screen: 'home', wall: 'mint', size: 215, x: 190, z: -160, rotY: -28, rotZ: 6, delay: 0.7, float: 6.5 },
  { finish: 'azul', screen: 'brand', wall: 'brand', size: 250, x: 0, z: 40, rotY: 0, rotZ: 0, delay: 0.35, float: 4.5 },
]

function Stage() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 60, damping: 15 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-16, 16]), { stiffness: 60, damping: 15 })

  useEffect(() => {
    const on = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [mx, my])

  return (
    <div className="relative h-[560px] w-full [perspective:1600px]">
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="absolute inset-0 grid place-items-center"
      >
        {PHONES.map((p) => (
          <motion.div
            key={p.finish}
            className="absolute"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 420, x: p.x, z: p.z, rotateY: p.rotY + (p.x < 0 ? -70 : 70), rotateZ: p.rotZ * 3 }}
            animate={{ opacity: 1, y: 0, x: p.x, z: p.z, rotateY: p.rotY, rotateZ: p.rotZ }}
            transition={{ duration: 1.6, delay: p.delay, ease }}
          >
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ y: [0, -16, 0], rotateY: [0, p.x === 0 ? 6 : 3, 0] }}
              transition={{ duration: p.float, repeat: Infinity, ease: 'easeInOut' }}
            >
              <IPhone size={p.size} finish={p.finish} screen={p.screen} wall={p.wall} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[50%] bg-brand/40 blur-3xl" />
    </div>
  )
}

function Stat({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight">{children}</div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const title = ['O', 'iPhone', 'que', 'você', 'quer,']

  return (
    <section ref={ref} id="top" className="grain relative overflow-hidden pt-28 pb-10 lg:min-h-svh lg:pt-0">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-brand/30 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-[#7b5cff]/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-4 px-5 lg:min-h-svh lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.3 }}>
            <Eyebrow>
              <MapPin className="size-3.5" /> Loja física em Natal/RN
            </Eyebrow>
          </motion.div>

          <h1 className="mt-6 text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            <span className="block">
              {title.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span
                    className="text-gradient inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease, delay: 0.4 + i * 0.07 }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-brand-gradient inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.8 }}
              >
                do jeito certo.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
            className="mx-auto mt-6 max-w-md text-lg text-white/60 lg:mx-0"
          >
            iPhones, smartphones e acessórios com qualidade e atendimento que conquista. Loja física em Natal e entrega
            rápida por motoboy 🛵
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.15 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <WhatsAppButton>Quero meu iPhone</WhatsAppButton>
            <a
              href="#produtos"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-[15px] font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Ver produtos <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex justify-center gap-10 border-t border-line pt-6 lg:justify-start"
          >
            <Stat label="seguidores no Instagram">8 mil+</Stat>
            <Stat label="loja física">📍 Natal/RN</Stat>
            <Stat label="entrega em Natal">🛵 Rápida</Stat>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: stageY, scale: stageScale }} className="relative origin-top max-lg:-mt-4 max-lg:h-[470px]">
          <div className="origin-top max-sm:-mx-16 max-lg:scale-[.8] sm:max-lg:scale-90">
            <Stage />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
