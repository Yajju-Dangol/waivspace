import { useEffect, useState, lazy, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Loader from './components/ui/loader'
import { NavBar } from './components/ui/tube-light-navbar'
import { Info, Server, FolderGit2, Bot, Mail } from 'lucide-react'
import { FaTwitter as Twitter, FaLinkedinIn as Linkedin, FaGithub as Github } from "react-icons/fa6";

const GLSLHills = lazy(() => import('./components/ui/glsl-hills').then(m => ({ default: m.GLSLHills })))
const AboutUsSection = lazy(() => import('./components/ui/about-us-section'))
const ServicesSection = lazy(() => import('./components/ui/services-section'))
const Casestudies = lazy(() => import('./components/ui/case-studies-section'))
const MiniAgentSection = lazy(() => import('./components/ui/mini-agent-section').then(m => ({ default: m.MiniAgentSection })))
const CinematicFooter = lazy(() => import('./components/ui/contact-section').then(m => ({ default: m.CinematicFooter })))
const ModernAnimatedFooter = lazy(() => import('./components/ui/footer-section').then(m => ({ default: m.ModernAnimatedFooter })))
import { HeroSection } from './components/ui/hero-section'
import { MagneticButton } from './components/ui/contact-section'

const navItems = [
  { name: 'About Us', url: '#about', icon: Info },
  { name: 'Services', url: '#services', icon: Server },
  { name: 'Case Studies', url: '#cases', icon: FolderGit2 },
  { name: 'Agent', url: '#agent', icon: Bot }
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 2000)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    window.addEventListener('resize', handleResize)

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
      lenis.destroy()
    }
  }, [])

  const isMobile = windowSize.width < 768

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[300]"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className="w-full bg-black text-white relative font-sans overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
          <Suspense fallback={null}>
            <GLSLHills />
          </Suspense>

          {/* Global Header Container */}
          <div className="fixed top-0 left-0 right-0 z-[210] flex items-center justify-between px-6 py-4 pointer-events-none">
            {/* Logo linked to Hero */}
            <div className="pointer-events-auto cursor-pointer">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector('#hero')
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <img
                  src="/waivspace-logo.svg"
                  alt="waivspace logo"
                  className="h-12 w-auto md:h-16 object-contain"
                />
              </a>
            </div>

            {/* Contact Us - Top Right */}
            <div className="pointer-events-auto hidden sm:block">
              <MagneticButton
                as="a"
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault()
                  const target = document.querySelector('#contact')
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="cursor-pointer rounded-full px-6 py-2 bg-white/90 backdrop-blur-sm text-black border-none font-poppins font-medium text-sm inline-flex items-center justify-center transition-colors hover:bg-white shadow-lg"
              >
                Contact Us
              </MagneticButton>
            </div>
          </div>

          <div className="relative top-0 z-10">
            <NavBar items={navItems} />

            <HeroSection isMobile={isMobile} />

            <Suspense fallback={null}>
              <section id="about">
                <AboutUsSection />
              </section>

              <section id="services" className="px-5 py-5 md:px-2">
                <ServicesSection />
              </section>

              <section id="cases">
                <Casestudies />
              </section>

              {/* Agent section wrapped so fade bleeds across the boundary into the next section */}
              <div className="relative">
                <section id="agent">
                  <MiniAgentSection />
                </section>
                {/* Fade overlay that sits ON TOP of the section edge, bleeding 80px downward */}
                <div
                  className="absolute bottom-0 left-0 w-full pointer-events-none z-30"
                  style={{ height: '160px', transform: 'translateY(50%)', background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)' }}
                />
              </div>

              <section id="contact">
                <CinematicFooter />
              </section>

              <section id="footer" className="relative bg-black">
                <ModernAnimatedFooter
                  brandName="WAIV"
                  brandDescription="Empowering the next generation of creators with seamless accountablity and transparent tracking."
                  socialLinks={[
                    { icon: <Twitter />, href: "#", label: "Twitter" },
                    { icon: <Linkedin />, href: "#", label: "LinkedIn" },
                    { icon: <Github />, href: "#", label: "GitHub" },
                    { icon: <Mail />, href: "#", label: "Email" },
                  ]}
                  navLinks={[
                    { label: "Community", href: "#" },
                    { label: "Governance", href: "#" },
                    { label: "Documentation", href: "#" },
                    { label: "Terms of Service", href: "#" },
                  ]}
                  creatorName="WAIV SPACE"
                  creatorUrl="#"
                  brandIcon={<img src="/waivspace-logo.svg" alt="WAIV logo" className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 object-contain" />}
                />
              </section>
            </Suspense>
          </div>
      </motion.main>
    </>
  )
}

export default App
