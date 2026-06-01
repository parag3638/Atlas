"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, Trophy, Award, Bone, Leaf } from "lucide-react";
import Image from "next/image";
import { scrollToSection } from "@/lib/utils";

/* ─── Hero Counter ─── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1] as const,
      });
      const unsubscribe = motionValue.on("change", (v) => {
        setDisplay(Math.round(v));
      });
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, motionValue, target]);

  return (
    <span ref={ref} className="text-3xl font-bold text-foreground">
      {display}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

/* ─── Social Icons ─── */
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialLinks = [
  { icon: XIcon, href: "#", label: "X (Twitter)" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
];


/* ═══════════════════════════════════════════════════════════════
   HERO → ABOUT → SERVICES  SCROLL STACK
   ═══════════════════════════════════════════════════════════════ */
export default function HeroAboutServicesStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ─── HERO scroll transforms ─── */
  const heroContentY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);
  const heroBgScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroBgY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  /* ─── ABOUT (white panel) scroll transforms ─── */
  const aboutPanelY = useTransform(scrollYProgress, [0.1, 0.35], ["100%", "0%"]);
  const aboutContentOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const aboutContentY = useTransform(scrollYProgress, [0.3, 0.45], [60, 0]);
  const aboutHeadingOpacity = useTransform(scrollYProgress, [0.25, 0.38], [0, 1]);
  const aboutHeadingY = useTransform(scrollYProgress, [0.25, 0.38], [40, 0]);

  /* ─── About outgoing transforms (when services slides over) ─── */
  const aboutOutY = useTransform(scrollYProgress, [0.55, 0.75], [0, -100]);
  const aboutOutOpacity = useTransform(scrollYProgress, [0.55, 0.75], [1, 0]);

  /* ─── SERVICES (dark panel) scroll transforms ─── */
  const servicesPanelY = useTransform(scrollYProgress, [0.55, 0.78], ["100%", "0%"]);
  const servicesContentOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const servicesContentY = useTransform(scrollYProgress, [0.72, 0.88], [50, 0]);
  const servicesHeadingOpacity = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);
  const servicesHeadingY = useTransform(scrollYProgress, [0.68, 0.82], [40, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      {/* Scroll anchors for navbar — positioned at the scroll depth where each panel is fully revealed */}
      <div id="about" style={{ scrollMarginTop: "72px" }} className="absolute top-[150vh] pointer-events-none" aria-hidden="true" />
      <div id="services" style={{ scrollMarginTop: "72px" }} className="absolute top-[270vh] pointer-events-none" aria-hidden="true" />
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ════════ PANEL 1: HERO ════════ */}
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 z-10"
        >
          {/* Background */}
          <motion.div
            style={{ scale: heroBgScale, y: heroBgY }}
            className="absolute inset-0"
          >
            <Image
              src="/images/hero-trainer.webp"
              alt="Athlete training while wearing the Atlas performance band"
              fill
              className="object-cover object-right translate-x-[0%]"
              sizes="100vw"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/80 to-transparent" />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="relative z-10 flex h-full flex-col justify-center items-center px-6 sm:px-10 lg:px-16"
          >
            <div className="w-full max-w-6xl">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-sm text-foreground mb-6"
              >
                Performance Band
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
              >
                Train Hard.
                <br />
                <span className="text-accent">Recover Smart.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed"
              >
                24/7 tracking of strain, recovery, and sleep — Atlas tells you exactly
                how hard to train and when to rest, so every session counts.
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                href="#contact"
                onClick={scrollToSection}
                className="mt-8 inline-flex items-center gap-3 bg-accent text-accent-foreground rounded-full pl-6 pr-2 py-2 font-medium hover:bg-accent-hover transition-colors duration-200"
              >
                Get Atlas
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/30">
                  <ArrowUpRight size={18} />
                </span>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-16 flex flex-wrap items-start gap-4"
              >
                <div className="flex flex-col items-start rounded-2xl bg-white/10 backdrop-blur-sm px-6 py-4">
                  <Counter target={99} suffix="%" />
                  <span className="text-sm text-muted mt-1">Heart-Rate Accuracy</span>
                </div>
                <div className="flex flex-col items-start rounded-2xl bg-white/10 backdrop-blur-sm px-6 py-4">
                  <Counter target={5} suffix=" Day" />
                  <span className="text-sm text-muted mt-1">Battery Life</span>
                </div>
              </motion.div>
            </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ════════ PANEL 2: ABOUT (white) ════════ */}
        <motion.div
          style={{ y: aboutPanelY }}
          className="absolute inset-0 z-20 rounded-t-[48px] md:rounded-t-[64px] bg-[#f9f9f9] overflow-hidden"
        >
          <motion.div
            style={{ y: aboutOutY, opacity: aboutOutOpacity }}
            className="h-full overflow-hidden"
          >
            <div className="h-full flex flex-col justify-center px-4 md:px-8 lg:px-16 py-12">
              <div className="mx-auto max-w-6xl w-full">
                {/* Heading */}
                <motion.div
                  style={{ opacity: aboutHeadingOpacity, y: aboutHeadingY }}
                  className="mb-10 text-center"
                >
                  <span className="mb-4 inline-block rounded-full border border-[#0f0f0f]/10 px-4 py-1.5 text-sm text-[#636463]">
                    The Science
                  </span>
                  <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#0f0f0f] md:text-4xl lg:text-5xl">
                    The Science Behind Every Insight
                  </h2>
                  <p className="mx-auto max-w-xl text-[#636463] text-sm">
                    Atlas reads your heart rate, HRV, skin temperature, and motion
                    around the clock — then turns it into one clear daily plan.
                  </p>
                </motion.div>

                {/* 3-column layout */}
                <motion.div
                  style={{ opacity: aboutContentOpacity, y: aboutContentY }}
                  className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr] lg:grid-cols-[260px_1fr_1.2fr] gap-5 items-stretch"
                >
                  {/* Left: Credentials */}
                  <div className="grid grid-rows-3 gap-3 h-full">
                    <div className="rounded-2xl border border-[#0f0f0f]/[0.08] bg-white p-5 flex flex-col justify-between flex-1">
                      <Trophy size={22} className="text-[#0f0f0f]" />
                      <div>
                        <p className="text-sm font-medium text-[#0f0f0f]">Lab Validated</p>
                        <p className="text-xs text-[#636463]">99% HR Accuracy</p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[#0f0f0f]/[0.08] bg-white p-5 flex flex-col justify-between flex-1">
                      <Award size={22} className="text-[#0f0f0f]" />
                      <div>
                        <p className="text-sm font-medium text-[#0f0f0f]">Clinically Tested</p>
                        <p className="text-xs text-[#636463]">Medical-grade sensors</p>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl flex-1 min-h-[140px]">
                      <Image
                        src="/images/about-gym.webp"
                        alt="Atlas band worn during training"
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-xs text-white/80">Wear it everywhere</span>
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm">
                          <ArrowUpRight size={12} className="text-white" />
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <p className="text-base font-medium text-white">Atlas Band</p>
                        <p className="text-xs text-white/70">Waterproof to 50m</p>
                      </div>
                    </div>
                  </div>

                  {/* Center: Product Photo */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-1 ring-black/[0.06] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]">
                    <Image
                      src="/images/about-coach.webp"
                      alt="The Atlas performance band"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  {/* Right: Bio */}
                  <div className="flex flex-col justify-between h-full py-2">
                    <div>
                      <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#0f0f0f] lg:text-3xl">
                        The Atlas Band
                      </h3>
                      <p className="mb-3 text-[#636463] text-sm leading-relaxed">
                        Five medical-grade sensors sit against your skin and sample your
                        body 100 times a second, day and night — heart rate, heart-rate
                        variability, skin temperature, and motion. No screen to distract
                        you, no charging breaks, just continuous data on how your body is
                        really doing.
                      </p>
                      <p className="text-[#636463] text-sm leading-relaxed">
                        Atlas turns those signals into three numbers that actually matter:
                        strain, recovery, and sleep. Every morning you wake to a clear
                        readiness score and a simple call — push hard today, or back off
                        and let your body rebuild.
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <a
                        href="#contact"
                        onClick={scrollToSection}
                        className="inline-flex items-center gap-2 rounded-full bg-[#8cff00] px-6 py-3 text-sm font-medium text-[#0f0f0f] transition-colors hover:bg-[#d7ffa5]"
                      >
                        Explore Features
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0f0f0f]">
                          <ArrowUpRight size={14} className="text-white" />
                        </span>
                      </a>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#636463]">Follow us:</span>
                        {socialLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            aria-label={link.label}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0f0f0f]/10 text-[#636463] transition-colors hover:border-[#0f0f0f]/20 hover:text-[#0f0f0f]"
                          >
                            <link.icon size={16} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ════════ PANEL 3: SERVICES (dark) ════════ */}
        <motion.div
          style={{ y: servicesPanelY }}
          className="absolute inset-0 z-30 rounded-t-[48px] md:rounded-t-[64px] bg-[#0f0f0f] overflow-hidden"
        >
          <div className="h-full flex flex-col justify-center px-4 md:px-8 lg:px-16 py-12">
            <div className="mx-auto max-w-6xl w-full">
              {/* Header */}
              <motion.div
                style={{ opacity: servicesHeadingOpacity, y: servicesHeadingY }}
                className="text-center mb-12"
              >
                <span className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-sm text-[#a8a9a8] mb-6">
                  Features
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f2f2f2]">
                  Built to Track{" "}
                  <br className="hidden sm:block" />
                  <span className="text-[#8cff00]">Every Signal</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-[#a8a9a8] max-w-2xl mx-auto leading-relaxed">
                  One band, five sensors, and the algorithms to turn raw biometrics
                  into strain, recovery, and sleep you can actually act on.
                </p>
              </motion.div>

              {/* Services Bento Grid */}
              <motion.div
                style={{ opacity: servicesContentOpacity, y: servicesContentY }}
                className="grid grid-cols-2 grid-rows-2 gap-3 h-[420px]"
              >
                {/* Left: Large full-height card */}
                <div className="row-span-2 relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/services-strength.webp"
                    alt="Atlas band measuring strain on the forearm"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Strain Tracking</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Atlas measures cardiovascular load in real time, so you know exactly how hard each day pushes your body.
                    </p>
                  </div>
                </div>

                {/* Top right: Elite Conditioning — text left, image right */}
                <div className="overflow-hidden rounded-2xl flex bg-[#111]">
                  <div className="flex flex-col justify-center p-5 flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white mb-2">Recovery Score</h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Wake to a recovery percentage built from HRV, resting heart rate, and sleep.
                    </p>
                  </div>
                  <div className="relative w-[45%] flex-shrink-0">
                    <Image
                      src="/images/services-conditioning.webp"
                      alt="Recovery score"
                      fill
                      className="object-cover object-top"
                      sizes="25vw"
                    />
                  </div>
                </div>

                {/* Bottom right: two small cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#1c1c1c] border border-white/[0.06] flex flex-col items-center justify-center gap-3 p-4">
                    <Bone size={26} className="text-white/80" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-[#f2f2f2]">Sleep Stages</p>
                      <p className="text-xs text-[#a8a9a8] mt-1 leading-snug">Track REM, deep, and light sleep with medical-grade accuracy.</p>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src="/images/services-nutrition.webp"
                      alt="Daily coaching"
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
                      <Leaf size={26} className="text-white/80" />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-white">Daily Coaching</p>
                        <p className="text-xs text-white/70 mt-1 leading-snug">Clear guidance on how hard to train and when to rest.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
