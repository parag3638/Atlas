"use client";

import { motion, useInView, useMotionValue, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
    <span ref={ref} className="text-4xl font-bold text-white">
      {display}
      <span className="text-[#8cff00]">{suffix}</span>
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const steps = [
  {
    number: "01",
    title: "Slip It On",
    description:
      "Wear Atlas on your wrist or bicep. It's comfortable enough to forget — through workouts, work, and sleep.",
  },
  {
    number: "02",
    title: "Wear It 24/7",
    description:
      "Atlas captures your heart rate, HRV, temperature, and motion continuously, day and night, with no charging breaks.",
  },
  {
    number: "03",
    title: "Get Your Scores",
    description:
      "Wake each morning to your strain, recovery, and sleep — three clear numbers that tell you how your body is doing.",
  },
  {
    number: "04",
    title: "Follow the Coaching",
    description:
      "Atlas tells you exactly how hard to train today and when to rest, so you never overreach or undertrain.",
  },
  {
    number: "05",
    title: "Watch Progress",
    description:
      "Over weeks, your trends climb. See resting heart rate drop and recovery rise as your fitness compounds.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="Process"
      className="relative bg-[#0f0f0f] py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-sm text-[#a8a9a8] mb-6">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f2f2f2]">
            How It Works{" "}
            <span className="text-[#8cff00]">Step by Step</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8a9a8] max-w-2xl mx-auto leading-relaxed">
            A simple process designed to turn raw biometrics into real,
            measurable results. From the moment you put Atlas on.
          </p>
        </motion.div>

        {/* Grid: 4 columns, stats card spans 2 rows left, motivational card spans 2 cols bottom-right */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr"
        >
          {/* Stats Image Card — spans 2 rows on desktop */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl lg:row-span-2 min-h-[280px] sm:min-h-[320px]"
          >
            <Image
              src="/images/process-equipment.webp"
              alt="Training gear tracked by the Atlas band"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
            <div className="relative z-10 flex flex-col justify-end h-full p-5">
              <div className="space-y-3">
                <div className="rounded-xl px-4 py-3" style={{ background: "rgba(10,10,10,0.55)", backdropFilter: "blur(10px)" }}>
                  <Counter target={5} suffix=" Day" />
                  <p className="text-xs text-[#a8a9a8] mt-1">Battery Life</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ background: "rgba(10,10,10,0.55)", backdropFilter: "blur(10px)" }}>
                  <Counter target={95} suffix="%" />
                  <p className="text-xs text-[#a8a9a8] mt-1">Sensor Accuracy</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step cards 01-03 (top row, right 3 columns) */}
          {steps.slice(0, 3).map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="rounded-2xl bg-[#1c1c1c] border border-white/[0.06] p-6 flex flex-col justify-between"
            >
              <span className="text-3xl font-light text-[#a8a9a8]/30">
                {step.number}
              </span>
              <div className="mt-auto pt-6">
                <h3 className="text-lg font-medium text-[#f2f2f2] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#a8a9a8] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Step cards 04-05 (bottom row, explicitly placed) */}
          {steps.slice(3).map((step, i) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className={cn(
                "rounded-2xl bg-[#1c1c1c] border border-white/[0.06] p-6 flex flex-col justify-between",
                i === 0 && "lg:col-start-2 lg:row-start-2",
                i === 1 && "lg:col-start-3 lg:row-start-2"
              )}
            >
              <span className="text-3xl font-light text-[#a8a9a8]/30">
                {step.number}
              </span>
              <div className="mt-auto pt-6">
                <h3 className="text-lg font-medium text-[#f2f2f2] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#a8a9a8] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Motivational CTA Card — col 4, row 2 */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl lg:col-start-4 lg:col-span-1 lg:row-start-2 min-h-[200px]"
          >
            <Image
              src="/images/cta-gym.webp"
              alt="Training with the Atlas band"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col justify-between h-full p-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#f2f2f2]">
                  This Isn&apos;t a Guess.
                  <br />
                  <span className="text-[#8cff00]">It&apos;s Data.</span>
                </h3>
                <p className="mt-2 text-sm text-[#a8a9a8]">Start Training Smarter!</p>
              </div>
              <a
                href="#contact"
                onClick={scrollToSection}
                className="mt-4 inline-flex w-fit items-center gap-3 bg-[#8cff00] text-[#0f0f0f] rounded-full pl-6 pr-2 py-2 font-medium hover:bg-[#d7ffa5] transition-colors duration-200"
              >
                Let&apos;s do it!
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0f0f0f]">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
