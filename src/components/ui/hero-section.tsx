import { Badge } from './badge'
import { CursorDrivenParticleTypography } from './cursor-driven-particles-typography'
import { MagneticButton } from './contact-section'
import { cn } from '../../lib/utils'

interface HeroSectionProps {
  isMobile: boolean
}

export function HeroSection({ isMobile }: HeroSectionProps) {
  return (
    <div id="hero" className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="z-20 flex flex-col items-center text-center px-6">
        {/* Top Announcement Bar */}
        <Badge variant="outline" className="-mb-5 px-3 py-1 md:px-4 md:py-1.5 rounded-full border-white/10 bg-white/5 text-white/60 font-poppins text-[10px] md:text-xs tracking-wider">
          Make your business smarter with agents
        </Badge>

        {/* Main WAIV Particle Text Area */}
        <div className={cn(
          "relative w-full max-w-7xl flex items-center justify-center transition-all duration-500",
          isMobile ? "h-[200px] -mt-4 pointer-events-none" : "h-[450px] -mt-16"
        )}>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <CursorDrivenParticleTypography
              text="WAIV"
              fontSize={isMobile ? 70 : 190}
              particleDensity={isMobile ? 3 : 4}
              dispersionStrength={isMobile ? 12 : 20}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Tagline */}
        <p className={cn(
          "max-w-2xl font-medium text-gray-200 font-poppins leading-relaxed transition-all duration-500",
          isMobile ? "text-sm -mt-12 px-4" : "text-base -mt-32"
        )}>
          Beyond simple chatbots. We build autonomous agentic workflows that think, execute, and evolve with your technical infrastructure.
        </p>

        {/* CTA Button */}
        <div className="mt-8 md:mt-6 relative z-50">
          <MagneticButton
            as="a"
            href="#contact"
            className="footer-glass-pill rounded-full px-8 py-3 md:px-12 md:py-4 bg-transparent text-white border-none font-poppins font-medium text-base md:text-lg inline-flex items-center justify-center cursor-pointer"
          >
            Deploy Your Agent
          </MagneticButton>
        </div>
      </div>

      {/* Transition gradient removed for pure black theme */}
    </div>
  )
}
