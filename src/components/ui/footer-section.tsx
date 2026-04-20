import React from "react";
import {
  NotepadTextDashed,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const ModernAnimatedFooter = ({
  brandName = "WAIV",
  brandDescription = "The ecosystem for sharing and funding anything. From writing about your latest idea, to building for the next big DAO.",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-white/10 bg-[#000] relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-4 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-4xl font-black tracking-tighter">
                    {brandName}
                  </span>
                </div>
                <p className="text-gray-400 font-medium text-center w-full max-w-md px-4 sm:px-0 leading-relaxed font-poppins">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-6 gap-6">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-gray-400 max-w-full px-4 font-poppins">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      className="hover:text-white duration-300 transition-all"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-4 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p className="text-sm text-gray text-center md:text-left font-poppins font-medium">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl}
                  target="_blank"
                  className="text-sm text-gray hover:text-white transition-colors duration-300 font-poppins font-medium"
                >
                  Crafted by {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text - FIXED */}
        <div
          className="bg-gradient-to-b from-white/10 via-white/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-black tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontSize: 'clamp(3rem, 20vw, 15rem)',
            maxWidth: '100vw'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo */}
        <div className="absolute hover:border-white duration-400 drop-shadow-[0_0px_20px_rgba(255,255,255,0.1)] bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl bg-black/60 left-1/2 border-2 border-white/10 flex items-center justify-center p-3 -translate-x-1/2 z-10 transition-all">
          <div className="w-16 sm:w-20 md:w-32 h-16 sm:h-20 md:h-32 bg-black rounded-2xl flex items-center justify-center shadow-lg border border-white/5">
            {brandIcon || (
              <NotepadTextDashed className="w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 text-white drop-shadow-lg" />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full left-1/2 -translate-x-1/2"></div>

        {/* Bottom shadow fade */}
        <div className="bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0 w-full h-40 pointer-events-none"></div>
      </footer>
    </section>
  );
};
