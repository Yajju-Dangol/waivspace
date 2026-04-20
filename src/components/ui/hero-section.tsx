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
          Next-generation Web Infrastructure
        </Badge>

        {/* Main WAIV Particle Text Area */}
        <div className={cn(
          "relative w-full max-w-7xl flex items-center justify-center transition-all duration-500",
          isMobile ? "h-[200px] -mt-4" : "h-[450px] -mt-16"
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
          "max-w-xl font-medium text-gray-200 font-poppins leading-relaxed transition-all duration-500",
          isMobile ? "text-sm -mt-12 px-4" : "text-base -mt-32"
        )}>
          {isMobile ? (
            <>The ecosystem for sharing and <br /> funding anything.</>
          ) : (
            <>The ecosystem for sharing and funding anything. <br />
              From writing about your latest idea, to building for the next big DAO.</>
          )}
        </p>

        {/* CTA Button */}
        <div className="mt-8 md:mt-6 relative z-50">
          <MagneticButton className="footer-glass-pill rounded-full px-8 py-5 md:px-12 md:py-6 bg-transparent text-white border-none font-poppins font-medium text-base md:text-lg">
            Get Started
          </MagneticButton>
        </div>
      </div>

      {/* Seamless transition fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
    </div>
  )
}
