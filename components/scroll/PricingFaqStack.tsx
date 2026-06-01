"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { Check, ArrowUpRight, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─── Pricing Data ─── */
const plans = [
  {
    title: "Monthly",
    subtitle:
      "The Atlas band plus full access to strain, recovery, and sleep — cancel anytime.",
    price: "$30",
    cta: "Get Atlas",
    features: [
      "Atlas band included",
      "Strain & recovery tracking",
      "Sleep analysis",
      "Daily coaching",
    ],
    featured: false,
  },
  {
    title: "Annual",
    subtitle:
      "Everything in Monthly at the best price, billed yearly, with free shipping and a spare strap.",
    price: "$20",
    cta: "Get Atlas",
    features: [
      "Two months free",
      "Atlas band included",
      "Strain & recovery tracking",
      "Sleep analysis",
      "Daily coaching",
    ],
    featured: true,
  },
];

/* ─── FAQ Data ─── */
const faqs = [
  {
    question: "How do I get started?",
    answer:
      "Order your Atlas band, slip it on, and open the app — it pairs automatically and starts collecting data within minutes. No setup, no calibration.",
  },
  {
    question: "Do I need to charge it?",
    answer:
      "The battery pack slides onto the strap, so you charge Atlas without ever taking it off. A full charge lasts about five days of continuous tracking.",
  },
  {
    question: "I'm new to fitness tracking, is that okay?",
    answer:
      "Absolutely. Atlas does the interpreting for you — instead of raw graphs you get three simple scores and one clear recommendation each day.",
  },
  {
    question: "What does Atlas actually measure?",
    answer:
      "Five sensors capture heart rate, heart-rate variability, skin temperature, and motion 24/7, then translate them into your strain, recovery, and sleep.",
  },
  {
    question: "Is it waterproof?",
    answer:
      "Yes. Atlas is waterproof to 50 metres, so you can shower, swim, and train in any conditions without taking it off.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, there are no lock-in contracts. Cancel your membership whenever you like with 30 days notice.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PRICING → FAQ  SCROLL STACK
   ═══════════════════════════════════════════════════════════════ */
export default function PricingFaqStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ─── PRICING scroll transforms ─── */
  const pricingBgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const pricingHeadingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const pricingHeadingY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);
  const pricingCardsOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const pricingCardsY = useTransform(scrollYProgress, [0.05, 0.25], [80, 0]);
  const pricingCardsScale = useTransform(scrollYProgress, [0.05, 0.25], [0.96, 1]);

  /* ─── Pricing outgoing ─── */
  const pricingOutOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const pricingOutY = useTransform(scrollYProgress, [0.4, 0.6], [0, -60]);

  /* ─── FAQ (white panel) scroll transforms ─── */
  const faqPanelY = useTransform(scrollYProgress, [0.4, 0.7], ["100%", "0%"]);
  const faqHeadingOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const faqHeadingY = useTransform(scrollYProgress, [0.6, 0.75], [40, 0]);
  const faqContentOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const faqContentY = useTransform(scrollYProgress, [0.7, 0.85], [20, 0]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      {/* Scroll anchors for navbar */}
      <div id="pricing" style={{ scrollMarginTop: "72px" }} className="absolute top-[50vh] pointer-events-none" aria-hidden="true" />
      <div id="faq" style={{ scrollMarginTop: "72px" }} className="absolute top-[140vh] pointer-events-none" aria-hidden="true" />
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ════════ PANEL 1: PRICING ════════ */}
        <motion.div
          style={{ opacity: pricingOutOpacity, y: pricingOutY }}
          className="absolute inset-0 z-10"
        >
          {/* Background image with parallax */}
          <motion.div style={{ y: pricingBgY }} className="absolute inset-0">
            <Image
              src="/images/pricing-bg.webp"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#0f0f0f]/70" />
          </motion.div>

          {/* Pricing content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
            <motion.div
              style={{ opacity: pricingHeadingOpacity, y: pricingHeadingY }}
              className="text-center mb-10"
            >
              <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm text-[#f2f2f2] mb-4">
                Membership
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-4">
                Choose <span className="text-accent">Your Plan</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Every plan includes the Atlas band and full access to strain,
                recovery, and sleep. Pay monthly or save with annual.
              </p>
            </motion.div>

            <motion.div
              style={{
                opacity: pricingCardsOpacity,
                y: pricingCardsY,
                scale: pricingCardsScale,
              }}
              className="flex flex-col md:flex-row gap-6 max-w-4xl w-full"
            >
              {plans.map((plan) => (
                <div
                  key={plan.title}
                  className={cn(
                    "flex-1 rounded-3xl p-8",
                    plan.featured
                      ? "bg-background text-foreground border border-white/[0.08]"
                      : "bg-white text-[#0f0f0f]"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-lg">{plan.title}</h3>
                    {plan.featured && (
                      <span className="inline-block bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                        Popular
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-sm mb-6",
                      plan.featured ? "text-muted" : "text-[#636463]"
                    )}
                  >
                    {plan.subtitle}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-semibold">{plan.price}</span>
                    <span
                      className={cn(
                        "text-sm",
                        plan.featured ? "text-muted" : "text-[#636463]"
                      )}
                    >
                      /month
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-3 bg-accent text-accent-foreground rounded-full pl-6 pr-2 py-2 font-medium mb-6 hover:bg-accent-hover transition-colors cursor-pointer">
                    {plan.cta}
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-accent-foreground/20">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check
                          className={cn(
                            "w-4 h-4 flex-shrink-0",
                            plan.featured ? "text-accent" : "text-[#0f0f0f]"
                          )}
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ════════ PANEL 2: FAQ (white) ════════ */}
        <motion.div
          style={{ y: faqPanelY }}
          className="absolute inset-0 z-20 rounded-t-[48px] md:rounded-t-[64px] bg-white overflow-hidden"
        >
          <div className="h-full flex flex-col items-center justify-center px-4 md:px-8">
            <div className="max-w-3xl w-full">
              <motion.div
                style={{ opacity: faqHeadingOpacity, y: faqHeadingY }}
                className="text-center mb-10"
              >
                <span className="inline-block bg-black/10 text-[#0f0f0f] rounded-full px-4 py-1.5 text-sm mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#0f0f0f] mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-[#636463] max-w-2xl mx-auto">
                  Everything you need to know about the Atlas band. Can&apos;t find
                  what you&apos;re looking for? Reach out directly.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: faqContentOpacity, y: faqContentY }}
                className="space-y-3"
              >
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <button
                      onClick={() => toggle(index)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-full bg-[#f2f2f2] px-6 py-4 cursor-pointer transition-colors"
                      )}
                    >
                      <span className="text-[#0f0f0f] font-medium text-left">
                        {faq.question}
                      </span>
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-[#0f0f0f] flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#0f0f0f] flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pt-3 pb-4 text-[#636463]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
