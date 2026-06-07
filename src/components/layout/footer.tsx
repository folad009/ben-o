import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { IMAGE, NAV_ITEMS, SITE } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.5 8.5h3v11h-3v-11zm1.5-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 5h2.9v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v5.2h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.7h-3v-11z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-charcoal text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={IMAGE}
          alt=""
          fill
          className="object-cover object-[center_20%] grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-8 md:px-12 md:py-8">
        <p
          className="pointer-events-none select-none font-hero text-center text-[clamp(3.5rem,15vw,11rem)] uppercase leading-[0.9] tracking-tight text-white/15"
          aria-hidden="true"
        >
          {SITE.name}
        </p>

        <div className="mt-14 flex flex-col gap-14 lg:mt-20 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <FooterNewsletter />

          <nav aria-label="Footer navigation" className="lg:text-right">
            <ul className="space-y-4 md:space-y-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white md:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-10 border-t border-white/10 pt-12 md:mt-28 lg:flex-row lg:items-end lg:justify-between">
          <Link
            href="#contact"
            className="font-body text-3xl font-light uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-70 md:text-4xl lg:text-5xl"
          >
            Let&apos;s Work Together
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10 lg:justify-end">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:text-white/80"
            >
              <InstagramIcon />
              {SITE.instagramHandle}
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
            >
              <LinkedInIcon />
              {SITE.linkedinHandle}
            </a>
          </div>
        </div>

        <p className="mt-12 text-[10px] uppercase tracking-[0.2em] text-white/35">
          © {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
