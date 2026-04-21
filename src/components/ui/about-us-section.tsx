"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Card } from "./card";

import { MagneticButton } from "./contact-section";
import { Badge } from "./badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";
import { cn } from "../../lib/utils";

export default function AboutUsSection({ className }: { className?: string }) {
  const eyebrow = "About Us";
  const title = "AI-Driven Business Growth";
  const description = "WAIV is an automation studio built to help companies work smarter. We design and deploy custom AI systems that handle repetitive tasks, so your team can focus on growth and high-level strategy.";
  const stats = ["Simple", "Fast", "Reliable"];
  const steps = [
    {
      id: "step-1",
      title: "Our Mission",
      text: "We help businesses save time and reduce costs by replacing manual work with smart AI agents.",
    },
    {
      id: "step-2",
      title: "Our Vision",
      text: "To make world-class AI automation accessible to every growing company, regardless of their technical expertise.",
    },
    {
      id: "step-3",
      title: "Our Approach",
      text: "We prioritize results over hype. We build tools that are easy to use, secure, and deliver a clear return on investment.",
    },
  ];
  const tabs = [
    {
      value: "consult",
      label: "Consult",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/screen-website-template.png",
      alt: "Consultation Process",
    },
    {
      value: "build",
      label: "Build",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/t-shirt-mockup.png",
      alt: "Building Infrastructure",
    },
    {
      value: "deploy",
      label: "Deploy",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/abstract-bg_11zon.jpg",
      alt: "Deployment Phase",
    },
  ];
  const defaultTab = "consult";
  const panelMinHeight = 500;
  const initial = defaultTab;

  return (
    <section className={cn("w-full bg-black text-white", className)}>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-20 lg:gap-14">
        {/* Left column */}
        <div className="md:col-span-6">
          <Badge variant="outline" className="mb-6 border-none text-white/70 bg-transparent px-0 text-xl font-poppins">
            {eyebrow}
          </Badge>

          <h2 className="text-balance text-4xl font-bold font-poppins leading-tight sm:text-5xl md:text-6xl text-white py-1">
            {title}
          </h2>

          {description ? (
            <p className="mt-6 max-w-2xl text-gray-300 font-poppins text-base leading-relaxed">{description}</p>
          ) : null}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-zinc-800 text-white border-zinc-700 px-4 py-1.5 text-sm"
                >
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          <div className="mt-10 max-w-xl">
            <Accordion type="single" collapsible className="w-full">
              {steps.map((step) => (
                <AccordionItem key={step.id} value={step.id} className="border-white/10">
                  <AccordionTrigger className="text-left text-base font-medium text-white hover:text-white/80 transition-colors">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-300 font-poppins leading-relaxed">
                    {step.text}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cursor-pointer rounded-full px-6 py-2 bg-white/90 backdrop-blur-sm text-black border-none font-poppins font-medium text-sm inline-flex items-center justify-center transition-colors hover:bg-white shadow-lg"
              >
                Contact Us
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-6">
          <Card
            className="relative overflow-hidden rounded-[2rem] border-0 bg-zinc-900/40 p-0 shadow-2xl"
            style={{ height: panelMinHeight, minHeight: panelMinHeight }}
          >
            <Tabs defaultValue={initial} className="relative h-full w-full">
              {/* Absolute-fill media container */}
              <div className="relative h-full w-full">
                {tabs.map((t, idx) => (
                  <TabsContent
                    key={t.value}
                    value={t.value}
                    className={cn(
                      "absolute inset-0 m-0 h-full w-full",
                      "data-[state=inactive]:hidden"
                    )}
                  >
                    <img
                      src={t.src}
                      alt={t.alt ?? t.label}
                      className="h-full w-full object-cover"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </TabsContent>
                ))}
              </div>

              {/* Tab controls (pill) */}
              <div className="pointer-events-auto absolute inset-x-0 bottom-6 z-10 flex w-full justify-center">
                <TabsList className="flex gap-2 rounded-xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl">
                  {tabs.map((t) => (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-full px-4 py-2 text-white/60 data-[state=active]:bg-white data-[state=active]:text-black transition-all"
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}
