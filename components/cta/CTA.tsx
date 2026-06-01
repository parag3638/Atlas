"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { scrollToSection } from "@/lib/utils";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Call to action"
      className="relative min-h-screen flex flex-col items-center justify-center pb-20"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <Image
          src="/images/cta-gym.webp"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#0f0f0f]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-[#0f0f0f]/40" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="space-y-6">
          <motion.h2
            style={{ opacity: headingOpacity, y: headingY }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#f2f2f2]"
          >
            Ready To{" "}
            <span className="text-[#8cff00]">Train Smarter?</span>
          </motion.h2>

          <motion.p
            style={{ opacity: headingOpacity, y: headingY }}
            className="mx-auto max-w-xl text-[#a8a9a8] text-base sm:text-lg"
          >
            Strap on Atlas and let your body lead the way. Strain, recovery, and
            sleep — measured 24/7, turned into one clear plan every day.
          </motion.p>

          <motion.a
            style={{ opacity: buttonOpacity, scale: buttonScale }}
            href="#contact"
            onClick={scrollToSection}
            className="inline-flex items-center gap-3 rounded-full bg-[#8cff00] pl-8 pr-3 py-3 text-lg font-medium text-[#0f0f0f] hover:bg-[#d7ffa5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Get Atlas
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0f0f0f]">
              <ArrowUpRight className="size-5 text-[#8cff00]" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
