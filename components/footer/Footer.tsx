"use client";

import { cn, scrollToSection } from "@/lib/utils";

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

const navLinks = [
  { label: "Science", href: "#about" },
  { label: "Features", href: "#services" },
  { label: "Membership", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: XIcon, label: "X" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer
      aria-label="Footer"
      className="absolute bottom-0 left-0 right-0 z-10 bg-transparent px-4 py-6"
    >
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label={label}
              className={cn(
                "text-[#a8a9a8] transition-colors hover:text-[#f2f2f2]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              )}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Navigation links */}
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={scrollToSection}
              className={cn(
                "text-sm text-[#a8a9a8] transition-colors hover:text-[#f2f2f2]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
