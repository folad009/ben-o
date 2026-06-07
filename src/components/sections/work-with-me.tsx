"use client";

import { Button } from "@/components/ui/button";
import { DisplayTitle } from "@/components/ui/display-title";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { SITE, SERVICES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const workWithMeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  inquiry: z.string().min(1, "Please select an inquiry type"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type WorkWithMeForm = z.infer<typeof workWithMeSchema>;

const inputClassName =
  "w-full border border-charcoal/15 bg-ivory/60 px-5 py-4 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal/35 focus:border-sand focus:bg-white focus:shadow-[0_0_0_3px_rgba(217,164,106,0.15)]";

const labelClassName =
  "mb-2 block text-[11px] font-medium uppercase tracking-[0.35em] text-charcoal/55";

export function WorkWithMe() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WorkWithMeForm>({
    resolver: zodResolver(workWithMeSchema),
  });

  const onSubmit = async (data: WorkWithMeForm) => {
    console.log("Work with me form submitted:", data);
    reset();
    alert("Thank you for your message. We will be in touch soon.");
  };

  return (
    <SectionShell
      id="contact"
      className="bg-sand text-charcoal"
      aria-labelledby="work-with-me-heading"
    >
      <DisplayTitle
        align="center"
        theme="light"
        words={[
          { text: "Let's", emphasis: "muted" },
          { text: "Connect", emphasis: "primary" },
        ]}
      />

      <div className="mt-6 grid items-start gap-10 sm:mt-8 sm:gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            id="work-with-me-heading"
            title="Work With Me"
            subtitle="For speaking inquiries, advisory engagements, or partnership opportunities — share a few details and let&apos;s explore how we can create impact together."
          />

          <ul className="mt-10 flex flex-wrap gap-2">
            {SERVICES.map((service) => (
              <li
                key={service}
                className="rounded-full border border-charcoal/10 bg-white/70 px-4 py-2 text-xs font-medium tracking-wide text-charcoal/75"
              >
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-charcoal/10 pt-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-charcoal/45">
              Prefer email?
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-block font-display text-xl text-charcoal transition-colors hover:text-sand md:text-2xl"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="border border-charcoal/10 bg-white p-5 shadow-[0_24px_80px_rgba(17,17,17,0.06)] sm:p-8 md:p-10 lg:p-12">
          <div className="mb-8 border-b border-charcoal/10 pb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-sand">
              Discovery Call
            </p>
            <p className="mt-2 font-display text-2xl text-charcoal">
              Start the conversation
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="work-name" className={labelClassName}>
                  Name
                </label>
                <input
                  id="work-name"
                  type="text"
                  placeholder="Your full name"
                  {...register("name")}
                  className={inputClassName}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="work-email" className={labelClassName}>
                  Email
                </label>
                <input
                  id="work-email"
                  type="email"
                  placeholder="you@company.com"
                  {...register("email")}
                  className={inputClassName}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="work-inquiry" className={labelClassName}>
                Inquiry Type
              </label>
              <select
                id="work-inquiry"
                defaultValue=""
                {...register("inquiry")}
                className={`${inputClassName} appearance-none`}
                aria-invalid={!!errors.inquiry}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.inquiry && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.inquiry.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="work-subject" className={labelClassName}>
                Subject
              </label>
              <input
                id="work-subject"
                type="text"
                placeholder="Brief subject line"
                {...register("subject")}
                className={inputClassName}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="work-message" className={labelClassName}>
                Message
              </label>
              <textarea
                id="work-message"
                rows={5}
                placeholder="Tell me about your project, event, or opportunity..."
                {...register("message")}
                className={`${inputClassName} resize-none`}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-600" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="group w-full gap-2 sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Book A Discovery Call"}
              {!isSubmitting && (
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              )}
            </Button>
          </form>
        </div>
      </div>
    </SectionShell>
  );
}
