"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Science", href: "#about" },
  { label: "Features", href: "#services" },
  { label: "Membership", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className="rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl"
        style={{
          background: "rgba(12, 14, 13, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 text-base font-bold text-foreground"
        >
          <svg width="28" height="18" viewBox="0 0 28 18" fill="none" stroke="#8cff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 9h6l3-6 4 12 4-8 2 2h6" />
          </svg>
          Atlas
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={scrollToSection}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Get Started — filled green pill */}
        <a
          href="#contact"
          onClick={scrollToSection}
          className="hidden md:inline-flex items-center bg-accent text-accent-foreground rounded-full px-5 py-2 text-sm font-semibold hover:bg-accent-hover transition-colors duration-200"
        >
          Get Atlas
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-4 right-4 glass rounded-2xl p-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { scrollToSection(e); setOpen(false); }}
                    className="text-base text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => { scrollToSection(e); setOpen(false); }}
                  className="inline-flex bg-accent text-accent-foreground rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
