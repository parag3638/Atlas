"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Marcus L.",
    type: "Verified Member",
    text: "Atlas flagged a low recovery score the morning after a bad night's sleep and told me to back off. I listened, trained light, and avoided what would've been a brutal session. It's like having a coach reading my body.",
    avatar: "/images/review-avatar-1.webp",
  },
  {
    name: "Isabella Nowak",
    type: "Verified Member",
    text: "The sleep tracking is scarily accurate. Seeing my deep and REM stages broken down every morning completely changed my bedtime routine — I'm recovering better than I have in years.",
    avatar: "/images/review-avatar-2.webp",
  },
  {
    name: "Laurie",
    type: "Verified Member",
    text: "I used to just train hard every day and wonder why I was always tired. Now I know exactly when to push and when to rest. My resting heart rate has dropped eight points since I started wearing Atlas.",
    avatar: "/images/review-avatar-3.webp",
  },
  {
    name: "Michael Little",
    type: "Verified Member",
    text: "The strain score keeps me honest. I can see when a 'easy' day actually loaded my body hard, and it stops me from stacking too much in one week. Best training decision I've made.",
    avatar: "/images/review-avatar-4.webp",
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="reviews" ref={sectionRef} aria-label="Reviews" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm text-primary mb-4">
            Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-primary mb-4">
            Hear From Members Who{" "}
            <span className="text-accent">Train Smarter</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Thousands of athletes rely on Atlas to know when to push and when to
            rest. Here&apos;s what wearing one every day actually feels like.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -6,
                scale: 1.02,
                borderColor: "rgba(255,255,255,0.15)",
                transition: { duration: 0.25 },
              }}
              className={cn(
                "bg-surface rounded-2xl p-6 border border-white/[0.08] cursor-default"
              )}
            >
              <Quote className="text-accent w-6 h-6 mb-4" />
              <p className="text-muted mb-6">{review.text}</p>
              <div className="flex items-center gap-3">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-primary">{review.name}</p>
                  <p className="text-muted-foreground text-sm">{review.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
