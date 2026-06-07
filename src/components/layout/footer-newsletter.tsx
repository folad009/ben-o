"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    alert("Thank you for subscribing.");
  };

  return (
    <div className="max-w-xl">
      <p className="max-w-sm text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-white/70 md:text-[11px]">
        Sign up for our newsletter &amp; info
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ENTER YOUR EMAIL"
          required
          className="w-full flex-1 rounded-full border border-white/40 bg-transparent px-6 py-3.5 text-xs uppercase tracking-[0.15em] text-white placeholder:text-white/40 outline-none transition-colors focus:border-white"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-charcoal transition-opacity hover:opacity-90"
        >
          Signup
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
