import { animate, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { ArrowUpRight, BadgeCheck, BatteryCharging, Bike, Headphones, HeartHandshake, Laptop, MessageCircle, ShieldCheck, Smartphone, Store } from 'lucide-react'
import { IPhone } from './IPhone'
import { Logo, LogoMark } from './Logo'
import { Eyebrow, InstagramIcon, Reveal, WhatsAppButton, WhatsAppIcon } from './ui'
import { INSTAGRAM, WHATSAPP } from '../lib/config'

const ITEMS = [
  'iPhone 18 Pro Max',
  'iPhone 17',
  'MacBook Air M5',
  'AirPods',
  'Capas',
  'Películas',
  'Carregadores',
  'Microfones Hollyland',
  'Smartphones',
  'Cabos & fontes',
]

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-5">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {ITEMS.map((t) => (
              <span key={t} className="flex items-center gap-8 pr-8 text-lg font-medium whitespace-nowrap text-white/70">
                {t}
                <LogoMark className="size-5 text-brand-light" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-2" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-2" />
    </div>
  )
}

function SpotCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener"
      onMouseMove={onMove}
      className={`group relative block overflow-hidden rounded-3xl border border-line bg-white/[0.025] p-7 transition duration-500 hover:border-brand-light/40 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--x)_var(--y),rgb(95_164_232/0.18),transparent_60%)]" />
      <ArrowUpRight className="absolute top-6 right-6 size-5 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-light" />
      {children}
    </a>
  )
}

function CardText({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <>
      <div className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-brand-light ring-1 ring-brand-light/20">{icon}</div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-white/55">{text}</p>
    </>
  )
}

export function Products() {
  return (
    <section id="produtos" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>Produtos</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            <span className="text-gradient">Tudo para o seu</span> <span className="text-brand-gradient">mundo conectado.</span>
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[repeat(2,minmax(240px,auto))]">
          <Reveal className="md:col-span-2 md:row-span-2">
            <SpotCard className="h-full min-h-[480px]">
              <div className="relative z-10 max-w-xs">
                <CardText
                  icon={<Smartphone className="size-6" />}
                  title="iPhones"
                  text="Os lançamentos e os modelos mais procurados, do iPhone 17 ao 18 Pro Max. Consulte cores e capacidades."
                />
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-light">
                  <WhatsAppIcon className="size-4" /> Consultar preços
                </span>
              </div>
              <div className="pointer-events-none absolute -right-6 -bottom-40 flex gap-6 [perspective:1200px] max-sm:-right-24 max-sm:-bottom-64 max-sm:scale-75">
                <div className="translate-y-16 transition duration-700 [transform-style:preserve-3d] group-hover:translate-y-6 group-hover:[transform:rotateY(-12deg)]">
                  <IPhone size={190} finish="natural" screen="lock" wall="sunset" />
                </div>
                <div className="transition duration-700 [transform-style:preserve-3d] group-hover:-translate-y-8 group-hover:[transform:rotateY(-12deg)]">
                  <IPhone size={190} finish="azul" screen="home" wall="aurora" />
                </div>
              </div>
            </SpotCard>
          </Reveal>
          <Reveal delay={0.1}>
            <SpotCard className="h-full">
              <CardText icon={<ShieldCheck className="size-6" />} title="Capas & películas" text="Proteção com estilo para o seu aparelho, em vários modelos e cores." />
            </SpotCard>
          </Reveal>
          <Reveal delay={0.2}>
            <SpotCard className="h-full">
              <CardText icon={<BatteryCharging className="size-6" />} title="Carregadores & cabos" text="Fontes, cabos e carregadores para manter tudo sempre com carga." />
            </SpotCard>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-1">
            <SpotCard className="h-full">
              <CardText icon={<Headphones className="size-6" />} title="Áudio" text="AirPods e microfones sem fio Hollyland para quem cria conteúdo." />
            </SpotCard>
          </Reveal>
          <Reveal delay={0.2}>
            <SpotCard className="h-full">
              <CardText icon={<Laptop className="size-6" />} title="MacBook" text="MacBook Air M5 e outros produtos Apple sob consulta." />
            </SpotCard>
          </Reveal>
          <Reveal delay={0.3}>
            <SpotCard className="h-full">
              <CardText icon={<Smartphone className="size-6" />} title="Smartphones" text="Outros modelos e marcas: chama no WhatsApp e a gente te ajuda a escolher." />
            </SpotCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const WHY = [
  { icon: <Store className="size-6" />, title: 'Loja física em Natal', text: 'Um endereço de verdade para você visitar, conhecer e comprar com tranquilidade.' },
  { icon: <Bike className="size-6" />, title: 'Entrega por motoboy', text: 'Comprou? A gente leva até você em Natal, rapidinho e com segurança.' },
  { icon: <HeartHandshake className="size-6" />, title: 'Atendimento que conquista', text: 'Atenção de verdade antes, durante e depois da compra. Você não é só mais um.' },
  { icon: <BadgeCheck className="size-6" />, title: 'Qualidade em primeiro lugar', text: 'Produtos selecionados com cuidado para você comprar sem medo.' },
]

export function Why() {
  return (
    <section id="diferenciais" className="relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-light/50 to-transparent" />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <Eyebrow>Por que a Caio Connect</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            <span className="text-gradient">Qualidade e atendimento</span> <span className="text-brand-gradient">que conquista.</span>
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-line bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition duration-500 hover:-translate-y-1.5 hover:border-brand-light/30">
                <CardText icon={w.icon} title={w.title} text={w.text} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toLocaleString('pt-BR')}</span>
}

export function Clients() {
  const highlights = ['Clientes', 'Connect', 'Endereço loja']
  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-brand/25 via-ink-2 to-ink-2 px-6 py-16 text-center sm:px-12">
            <div className="grid-bg pointer-events-none absolute inset-0" />
            <div className="relative">
              <div className="text-[clamp(3.5rem,11vw,8rem)] leading-none font-semibold tracking-[-0.05em]">
                <span className="text-gradient">
                  +<Counter to={8000} />
                </span>
              </div>
              <p className="mx-auto mt-4 max-w-md text-lg text-white/60">
                pessoas acompanham a Caio Connect no Instagram. Veja nos destaques quem já comprou com a gente.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-6">
                {highlights.map((h, i) => (
                  <motion.a
                    key={h}
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="flex flex-col items-center gap-2 text-xs text-white/60"
                  >
                    <span className="grid size-20 place-items-center rounded-full bg-gradient-to-tr from-brand via-brand-light to-[#b69cff] p-[3px]">
                      <span className="grid size-full place-items-center rounded-full border-[3px] border-ink-2 bg-brand">
                        <LogoMark className="size-9 text-white" />
                      </span>
                    </span>
                    {h}
                  </motion.a>
                ))}
              </div>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white hover:text-ink"
              >
                <InstagramIcon className="size-4" /> @caioconnectnatal
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const STEPS = [
  { icon: <Smartphone className="size-6" />, title: 'Escolha o seu', text: 'Veja os modelos e as cores e escolha o aparelho ou acessório que combina com você.' },
  { icon: <MessageCircle className="size-6" />, title: 'Chama no WhatsApp', text: 'Tire dúvidas, consulte valores e formas de pagamento direto com a nossa equipe.' },
  { icon: <Bike className="size-6" />, title: 'Retire ou receba', text: 'Busque na loja física ou receba em casa com a entrega por motoboy em Natal.' },
]

export function HowToBuy() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section id="comprar" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-16 max-w-2xl">
          <Eyebrow>Como comprar</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            <span className="text-gradient">Simples assim,</span> <span className="text-brand-gradient">em 3 passos.</span>
          </h2>
        </Reveal>
        <div ref={ref} className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          <div className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-line md:block">
            <motion.div style={{ scaleX: line }} className="h-full origin-left bg-gradient-to-r from-brand to-brand-light" />
          </div>
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15} className="relative text-center">
              <div className="relative mx-auto grid size-14 place-items-center rounded-2xl border border-brand-light/30 bg-ink text-brand-light shadow-[0_0_30px_-6px] shadow-brand">
                {s.icon}
                <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-brand text-[11px] font-bold text-white">{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-white/55">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [260, 0])
  const rot = useTransform(scrollYProgress, [0, 1], [-25, 0])
  return (
    <section ref={ref} className="relative overflow-hidden pt-28">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/35 blur-[140px]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <h2 className="text-[clamp(2.4rem,6vw,4.6rem)] leading-[1] font-semibold tracking-[-0.04em]">
            <span className="text-gradient">Seu próximo iPhone está</span>{' '}
            <span className="text-brand-gradient">a uma mensagem.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/60">Chama a gente agora e garanta o seu com quem entende do assunto.</p>
          <WhatsAppButton className="mt-9 px-9 py-5 text-base">Falar com a Caio Connect</WhatsAppButton>
        </Reveal>
      </div>
      <div className="relative mt-16 flex h-[330px] justify-center overflow-hidden [perspective:1400px] sm:h-[400px]">
        <motion.div style={{ y, rotateX: rot, transformStyle: 'preserve-3d' }}>
          <IPhone size={260} finish="azul" screen="brand" wall="brand" />
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 text-sm text-white/50 md:flex-row">
        <Logo />
        <p>© {new Date().getFullYear()} Caio Connect · Smartphones & acessórios · Natal/RN</p>
        <div className="flex gap-3">
          <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-line transition hover:border-brand-light hover:text-white">
            <InstagramIcon className="size-4" />
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full border border-line transition hover:border-brand-light hover:text-white">
            <WhatsAppIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export function FloatingWhatsApp() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useEffect(() => scrollY.on('change', (v) => setShow(v > 600)), [scrollY])
  return (
    <motion.a
      href={WHATSAPP}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      initial={false}
      animate={{ scale: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgb(37_211_102/0.6)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <WhatsAppIcon className="relative size-7" />
    </motion.a>
  )
}
