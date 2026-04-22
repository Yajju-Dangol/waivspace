import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import ReactCountUp from "react-countup";

// Handle potential default/named export variations
const CountUp = (ReactCountUp as any).default || ReactCountUp;

/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
  if (!m) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = (normalized.split(".")[1]?.length ?? 0);
  return {
    prefix: prefix ?? "",
    end: isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  };
}

/** Small component: one animated metric */
function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="flex flex-col gap-2 text-center sm:text-left p-6">
      <p
        className="text-2xl font-medium text-gray-900 dark:text-white sm:text-4xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion || isNaN(end) || !value.match(/\d/) ? (
          <span>{value.replace(prefix, "").replace(suffix, "")}</span>
        ) : (
          <CountUp
            end={end}
            decimals={decimals}
            duration={duration}
            separator=","
            enableScrollSpy
            scrollSpyOnce
          />
        )}
        {suffix}
      </p>
      <p className="font-medium text-gray-900 dark:text-white text-center sm:text-left">
        {label}
      </p>
      {sub ? (
        <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">{sub}</p>
      ) : null}
    </div>
  );
}

export default function Casestudies() {
  const caseStudies = [
    {
      id: 1,
      title: "Stock Meets Social",
      description: "Seasons Board uses AI Agents to watch your inventory and automatically create social media posts. When new stock arrives, your marketing is ready instantly.",
      quote: "The AI agents handle our marketing so we can focus on our designs.",
      name: "Lasata",
      role: "Clothing Brand Owner",
      image: "/seasons-board.png",
      icon: Monitor,
      metrics: [
        { value: "90%", label: "Faster Posting", sub: "AI writes your captions" },
        { value: "100%", label: "Stock Sync", sub: "No more overselling" },
      ],
    },
  ];

  return (
    <section
      className="py-32 bg-black text-white"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <h2
            id="case-studies-heading"
            className="text-4xl font-semibold md:text-5xl text-white font-poppins"
          >
            Real results with WAIV
          </h2>
          <p className="text-gray-400 font-poppins">
            From inventory management to multi-channel marketing—WAIV powers niche brands with autonomous agents.
          </p>
        </div>

        {/* Cases */}
        <div className="mt-20 flex flex-col gap-20">
          {caseStudies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={study.id}
                className="grid gap-12 lg:grid-cols-3 xl:gap-24 items-center border-b border-gray-800 pb-12"
              >
                {/* Left: Image + Quote */}
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-10 lg:col-span-2 lg:border-r items-center sm:items-start text-center sm:text-left",
                    reversed
                      ? "lg:order-2 lg:border-r-0 lg:border-l border-gray-800 lg:pl-12 xl:pl-16 lg:pr-0"
                      : "border-gray-800 lg:pr-12 xl:pr-16",
                  ].join(" ")}
                >
                  <img
                    src={study.image}
                    alt={`${study.name} portrait`}
                    className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl object-cover ring-1 ring-white/10 hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  <figure className="flex flex-col justify-between gap-8 text-center sm:text-left font-poppins">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins">
                        {study.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base font-poppins leading-relaxed">
                        {study.description}
                      </p>
                      <blockquote className="text-white italic text-base sm:text-lg border-l-0 sm:border-l-2 border-white/20 sm:pl-4 py-1 mt-2 text-center sm:text-left">
                        "{study.quote}"
                      </blockquote>
                    </div>
                    <figcaption className="flex items-center justify-center sm:justify-start gap-6 mt-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-md font-medium text-white">
                          {study.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {study.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </div>

                {/* Right: Metrics */}
                <div
                  className={[
                    "grid grid-cols-1 gap-10 self-center text-center sm:text-left",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {study.metrics.map((metric, i) => (
                    <MetricStat
                      key={`${study.id}-${i}`}
                      value={metric.value}
                      label={metric.label}
                      sub={metric.sub}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
