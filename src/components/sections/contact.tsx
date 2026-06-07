"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    console.log("Contact form submitted:", data);
    reset();
    alert("Thank you for your message. We will be in touch soon.");
  };

  return (
    <section
      id="contact"
      className="bg-ivory py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-360 px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let's Connect"
              subtitle="For speaking inquiries, advisory engagements, or partnership opportunities — reach out directly."
            />

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-sand">
                  Email
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block text-lg text-charcoal transition-colors hover:text-sand"
                >
                  {SITE.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-sand">
                  Social
                </p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href={SITE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal/70 transition-colors hover:text-charcoal"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal/70 transition-colors hover:text-charcoal"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal/70 transition-colors hover:text-charcoal"
                    >
                      X (Twitter)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-sand"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-sand"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject")}
                  className="w-full border border-charcoal/20 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-sand"
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full resize-none border border-charcoal/20 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-sand"
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
