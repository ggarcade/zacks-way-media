import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BUDGET_RANGES,
  CONTACT_METHODS,
  type InquiryInput,
  inquirySchema,
  PROJECT_TYPES,
  TIMELINES,
  submitProjectInquiry,
} from "@/lib/inquiries";
import { cn } from "@/lib/utils";

const empty: InquiryInput = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  instagram: "",
  otherSocials: "",
  website: "",
  projectType: "",
  budgetRange: "",
  timeline: "",
  location: "",
  preferredContact: "instagram",
  goals: "",
  referral: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-primary">{message}</p>;
}

function SelectField({
  id,
  label,
  options,
  error,
  register,
  placeholder = "Select…",
}: {
  id: keyof InquiryInput;
  label: string;
  options: readonly { value: string; label: string }[];
  error?: string;
  register: ReturnType<typeof useForm<InquiryInput>>["register"];
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
        {label}
      </Label>
      <select
        id={id}
        className={cn(
          "flex h-11 w-full appearance-none rounded-[var(--radius-sm)] border border-border bg-surface-2 px-3 py-2 text-sm text-fg transition-[border-color] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
          error && "border-primary",
        )}
        defaultValue=""
        {...register(id)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

export function ProjectIntakeForm() {
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: empty,
  });

  async function onSubmit(values: InquiryInput) {
    try {
      const result = await submitProjectInquiry({ data: values });
      setSubmittedId(result.id);
      reset(empty);
      toast.success("Inquiry received", {
        description: "Zack will follow up on your preferred channel.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Could not send right now", {
        description: "Try again in a moment, or DM @zacks_way_media.",
      });
    }
  }

  if (submittedId !== null) {
    return (
      <div className="red-rim-strong hatch space-y-5 p-6 sm:p-8">
        <div className="flex size-12 items-center justify-center border border-primary/40 bg-primary-soft text-primary">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <p className="section-label mb-2">Submitted · #{submittedId}</p>
          <h3 className="headline text-3xl sm:text-4xl">
            You're on the list.
          </h3>
          <p className="lede mt-3 max-w-md text-sm">
            Thanks for reaching out. Expect a reply on your preferred channel
            with next steps, availability, and a rough scope if it's a fit.
          </p>
        </div>
        <ul className="space-y-2 border-t border-border pt-4 text-sm text-muted">
          <li className="flex gap-2">
            <span className="font-mono text-primary">01</span>
            We review goals, budget, and timeline.
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-primary">02</span>
            You get a clear yes / no / adjust reply.
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-primary">03</span>
            If it's a go, we lock creative direction.
          </li>
        </ul>
        <Button
          variant="outline"
          onClick={() => setSubmittedId(null)}
          className="w-full sm:w-auto"
        >
          Submit another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 border border-border bg-surface p-5 sm:p-8"
      noValidate
    >
      <div>
        <p className="section-label mb-2">Project inquiry</p>
        <h2 className="headline text-3xl sm:text-4xl">Tell us what you need.</h2>
        <p className="mt-2 text-sm text-muted">
          Required fields keep the brief tight. Optional fields help us prep a
          better reply.
        </p>
      </div>

      {/* Contact identity */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold tracking-tight">
          Who you are
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="fullName" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Full name *
            </Label>
            <Input id="fullName" autoComplete="name" placeholder="Jordan Lee" {...register("fullName")} />
            <FieldError message={errors.fullName?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Email *
            </Label>
            <Input id="email" type="email" autoComplete="email" placeholder="you@brand.com" {...register("email")} />
            <FieldError message={errors.email?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Phone
            </Label>
            <Input id="phone" type="tel" autoComplete="tel" placeholder="(434) 555-0100" {...register("phone")} />
            <FieldError message={errors.phone?.message} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="company" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Company / brand
            </Label>
            <Input id="company" placeholder="Six Dirty Six, personal brand, etc." {...register("company")} />
            <FieldError message={errors.company?.message} />
          </div>
        </div>
      </fieldset>

      {/* Socials */}
      <fieldset className="space-y-4 border-t border-border pt-6">
        <legend className="font-display text-lg font-bold tracking-tight">
          Socials & links
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="instagram" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Instagram handle
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-subtle">
                @
              </span>
              <Input id="instagram" className="pl-7" placeholder="yourbrand" {...register("instagram")} />
            </div>
            <FieldError message={errors.instagram?.message} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Website
            </Label>
            <Input id="website" placeholder="https://" {...register("website")} />
            <FieldError message={errors.website?.message} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="otherSocials" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Other socials
            </Label>
            <Input
              id="otherSocials"
              placeholder="TikTok, YouTube, X — paste handles or links"
              {...register("otherSocials")}
            />
            <FieldError message={errors.otherSocials?.message} />
          </div>
        </div>
      </fieldset>

      {/* Project scope */}
      <fieldset className="space-y-4 border-t border-border pt-6">
        <legend className="font-display text-lg font-bold tracking-tight">
          Project scope
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="projectType"
            label="Project type *"
            options={PROJECT_TYPES}
            error={errors.projectType?.message}
            register={register}
            placeholder="What are we building?"
          />
          <SelectField
            id="budgetRange"
            label="Budget range"
            options={BUDGET_RANGES}
            error={errors.budgetRange?.message}
            register={register}
          />
          <SelectField
            id="timeline"
            label="Timeline"
            options={TIMELINES}
            error={errors.timeline?.message}
            register={register}
          />
          <div className="grid gap-2">
            <Label htmlFor="location" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Shoot / base location
            </Label>
            <Input id="location" placeholder="Lynchburg, VA or remote" {...register("location")} />
            <FieldError message={errors.location?.message} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="goals" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Goals & details *
            </Label>
            <Textarea
              id="goals"
              className="min-h-[140px]"
              placeholder="What should this work do? Audience, deliverables, vibe, must-haves…"
              {...register("goals")}
            />
            <FieldError message={errors.goals?.message} />
          </div>
        </div>
      </fieldset>

      {/* Logistics */}
      <fieldset className="space-y-4 border-t border-border pt-6">
        <legend className="font-display text-lg font-bold tracking-tight">
          Logistics
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="preferredContact"
            label="Preferred contact"
            options={CONTACT_METHODS}
            error={errors.preferredContact?.message}
            register={register}
          />
          <div className="grid gap-2">
            <Label htmlFor="referral" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              How did you find us?
            </Label>
            <Input id="referral" placeholder="Instagram, friend, event…" {...register("referral")} />
            <FieldError message={errors.referral?.message} />
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">
          By sending, you agree we may contact you about this project. No spam.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send inquiry
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
