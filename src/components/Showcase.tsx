import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { IPhone } from './IPhone'

const STEPS = [
  {
    n: '01',
    title: 'Os modelos mais desejados.',
    text: 'Do iPhone de entrada ao Pro Max: a linha que você procura, com as cores do momento.',
  },
  {
    n: '02',
    title: 'Confira de perto, na loja.',
    text: 'Venha até a nossa loja física em Natal, pegue na mão e tire todas as dúvidas antes de decidir.',
  },
  {
    n: '03',
    title: 'Chega rápido até você.',
    text: 'Entrega por motoboy em Natal: seu novo aparelho na sua porta, sem complicação.',
  },
]

export function Showcase() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=320%', scrub: 1, pin: true },
      })
      tl.fromTo('.sc-phone', { rotateY: -35, rotateX: 18, scale: 0.7, y: 120 }, { rotateY: 0, rotateX: 4, scale: 1, y: 0, duration: 1 })
        .fromTo('.sc-word', { xPercent: 10 }, { xPercent: -45, duration: 4 }, 0)
        .fromTo('.sc-step-0', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.4)
        .to('.sc-phone', { rotateY: 180, rotateX: -6, duration: 1.2 }, 1.2)
        .to('.sc-step-0', { autoAlpha: 0, y: -40, duration: 0.3 }, 1.2)
        .fromTo('.sc-step-1', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.6)
        .to('.sc-phone', { rotateY: 360, rotateX: 0, scale: 1.08, duration: 1.2 }, 2.5)
        .to('.sc-step-1', { autoAlpha: 0, y: -40, duration: 0.3 }, 2.5)
        .fromTo('.sc-step-2', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.9)
        .fromTo('.sc-bar', { scaleX: 0 }, { scaleX: 1, duration: 4 }, 0)
        .to({}, { duration: 0.4 })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-svh overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_55%,rgb(50_112_166/0.35),transparent_70%)]" />
      <div className="sc-word pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[28vw] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-white/[0.035]">
        CAIO CONNECT · NATAL
      </div>

      <div className="relative mx-auto grid h-full max-w-6xl items-center px-5 lg:grid-cols-[1fr_auto_1fr]">
        <div className="relative hidden h-40 lg:block" />
        <div className="grid place-items-center [perspective:1400px] max-lg:self-start max-lg:pt-24">
          <div className="sc-phone [transform-style:preserve-3d]">
            <IPhone size={typeof window !== 'undefined' && window.innerWidth < 640 ? 170 : 290} finish="azul" screen="home" wall="aurora" />
          </div>
        </div>
        <div className="relative h-48 max-lg:absolute max-lg:inset-x-5 max-lg:bottom-6 lg:h-56">
          {STEPS.map((s, i) => (
            <div key={s.n} className={`sc-step-${i} invisible absolute inset-0 lg:pl-12`}>
              <span className="font-mono text-sm text-brand-light">{s.n} / 03</span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight lg:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-sm text-white/60">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 mx-auto h-px max-w-6xl bg-line">
        <div className="sc-bar h-full origin-left bg-brand-light" />
      </div>
    </section>
  )
}
