# caio-connect

Site da **Caio Connect** — iPhones, smartphones e acessórios em Natal/RN.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Motion (animações de entrada, hover e parallax)
- GSAP + ScrollTrigger (iPhone girando preso à rolagem)
- Lenis (rolagem suave)

Os iPhones são desenhados em CSS 3D ([src/components/IPhone.tsx](src/components/IPhone.tsx)), sem imagens.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/
npm run preview  # serve a build
```

Links de WhatsApp e Instagram ficam em [src/lib/config.ts](src/lib/config.ts).
