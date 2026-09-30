import { Hero, Nav } from './components/Hero'
import { Showcase } from './components/Showcase'
import { Colors } from './components/Colors'
import { Clients, FinalCta, FloatingWhatsApp, Footer, HowToBuy, Marquee, Products, Why } from './components/Sections'
import { useSmoothScroll } from './lib/useSmoothScroll'

export default function App() {
  useSmoothScroll()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Showcase />
        <Products />
        <Colors />
        <Why />
        <Clients />
        <HowToBuy />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
