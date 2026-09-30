import { AnimatePresence, motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { Hand } from 'lucide-react'
import { FINISHES, IPhone, type Finish } from './IPhone'
import { Eyebrow, Reveal, WhatsAppButton } from './ui'

export function Colors() {
  const [finish, setFinish] = useState<Finish>('laranja')
  const rotY = useMotionValue(200)
  const dragging = useRef(false)

  // gira sozinho devagar; a pessoa pode arrastar para girar
  useAnimationFrame((_, delta) => {
    if (!dragging.current) rotY.set(rotY.get() + delta * 0.02)
  })

  return (
    <section id="cores" className="relative overflow-hidden py-28 lg:py-40">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[140px] transition-colors duration-700"
        style={{ background: FINISHES[finish].metal }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-2">
        <Reveal className="order-2 text-center lg:order-1 lg:text-left">
          <Eyebrow>Escolha a sua cor</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            <span className="text-gradient">Cada cor,</span> <span className="text-brand-gradient">um estilo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-white/60 lg:mx-0">
            Toque nas cores para ver como fica. Chame a gente no WhatsApp e confira a disponibilidade do modelo e da cor
            que você quer.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            {(Object.keys(FINISHES) as Finish[]).map((k) => (
              <button
                key={k}
                onClick={() => setFinish(k)}
                aria-label={FINISHES[k].name}
                className={`relative size-11 rounded-full ring-1 ring-white/20 transition ${finish === k ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                style={{ background: `linear-gradient(145deg, ${FINISHES[k].glass}, ${FINISHES[k].metal})` }}
              >
                {finish === k && (
                  <motion.span layoutId="ring" className="absolute -inset-1.5 rounded-full border-2 border-white/80" />
                )}
              </button>
            ))}
          </div>
          <div className="mt-5 h-7 overflow-hidden text-lg font-medium">
            <AnimatePresence mode="wait">
              <motion.div
                key={finish}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {FINISHES[finish].name}
              </motion.div>
            </AnimatePresence>
          </div>
          <WhatsAppButton className="mt-8">Consultar disponibilidade</WhatsAppButton>
        </Reveal>

        <Reveal className="order-1 lg:order-2" y={80}>
          <div className="relative grid h-[520px] cursor-grab touch-pan-y place-items-center select-none [perspective:1400px] active:cursor-grabbing">
            <motion.div
              style={{ rotateY: rotY, rotateX: 8, transformStyle: 'preserve-3d' }}
              onPanStart={() => (dragging.current = true)}
              onPan={(_, info) => rotY.set(rotY.get() + info.delta.x * 0.6)}
              onPanEnd={() => (dragging.current = false)}
            >
              <IPhone size={235} finish={finish} screen="lock" wall="aurora" />
            </motion.div>
            <div className="pointer-events-none absolute bottom-0 flex items-center gap-2 text-xs text-white/40">
              <Hand className="size-3.5" /> Arraste para girar
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
