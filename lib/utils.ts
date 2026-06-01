import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  id?: string
) {
  e.preventDefault();
  const target =
    id || (e.currentTarget as HTMLAnchorElement).getAttribute("href")?.replace("#", "");
  if (!target) return;
  if (target === "contact") {
    // Scroll all the way to the bottom to fully reveal footer
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  } else {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  // Keep URL clean — no hash in the address bar
  window.history.replaceState(null, "", window.location.pathname);
}
