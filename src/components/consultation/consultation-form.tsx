"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
} from "lucide-react";
import { consultationSchema, type ConsultationInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/shared/form-field";
export function ConsultationForm({
  services,
  selectedService = "",
}: {
  services: { slug: string; title: string }[];
  selectedService?: string;
}) {
  const [status, setStatus] = useState<{
    ok: boolean;
    message: string;
    reference?: string;
  } | null>(null);
  const reference = useRef("");
  const signature = useRef("");
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: selectedService,
      format: "no-preference",
      message: "",
      availability: "",
      consent: false,
      website: "",
      requestId: "",
    },
  });
  const submit = handleSubmit(async (values) => {
    setStatus(null);
    try {
      const r = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await r.json();
      setStatus({
        ok: r.ok,
        message: data.message || "Unable to submit. Please try again.",
        reference: values.requestId,
      });
    } catch {
      setStatus({
        ok: false,
        message: "Unable to connect. Check your connection and try again.",
      });
    }
  });
  if (status?.ok)
    return (
      <div className="success-panel" role="status">
        <CheckCircle2 className="mb-5 size-10" />
        <h2 className="text-2xl font-semibold">
          Your next chapter starts here.
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">{status.message}</p>
        <p className="mt-5 break-all text-sm text-muted-foreground">
          Enquiry reference: {status.reference}
        </p>
        <Button asChild className="mt-8">
          <Link href="/services">
            Explore service areas
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  const textFields = [
    {
      name: "name" as const,
      label: "Full name",
      type: "text",
      autoComplete: "name",
      placeholder: "Your full name",
    },
    {
      name: "email" as const,
      label: "Email address",
      type: "email",
      autoComplete: "email",
      placeholder: "you@company.com",
    },
    {
      name: "phone" as const,
      label: "Phone number",
      type: "tel",
      autoComplete: "tel",
      placeholder: "Your contact number",
    },
    {
      name: "company" as const,
      label: "Company / organization",
      type: "text",
      autoComplete: "organization",
      placeholder: "Your company name",
      optional: true,
    },
  ];
  return (
    <form
      className="space-y-6"
      noValidate
      onSubmit={(e) => {
        const current = JSON.stringify({ ...getValues(), requestId: "" });
        if (!reference.current || signature.current !== current) {
          reference.current = crypto.randomUUID();
          signature.current = current;
        }
        setValue("requestId", reference.current);
        void submit(e);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {textFields.map((f) => (
          <FormField
            key={f.name}
            id={`consultation-${f.name}`}
            label={f.label}
            optional={f.optional}
            error={errors[f.name]?.message}
          >
            <Input
              id={`consultation-${f.name}`}
              type={f.type}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              required={!f.optional}
              aria-invalid={!!errors[f.name]}
              aria-describedby={
                errors[f.name] ? `consultation-${f.name}-error` : undefined
              }
              {...register(f.name)}
            />
          </FormField>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="consultation-service"
          label="Service of interest"
          error={errors.service?.message}
        >
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="consultation-service"
                  className="w-full"
                  aria-invalid={!!errors.service}
                  aria-describedby={
                    errors.service ? "consultation-service-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select a service area" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>
                      {s.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="not-sure">I’m not sure yet</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField
          id="consultation-format"
          label="Preferred format"
          error={errors.format?.message}
        >
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="consultation-format"
                  className="w-full"
                  aria-invalid={!!errors.format}
                  aria-describedby={
                    errors.format ? "consultation-format-error" : undefined
                  }
                >
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video consultation</SelectItem>
                  <SelectItem value="phone">Phone consultation</SelectItem>
                  <SelectItem value="in-person">
                    In-person, if available
                  </SelectItem>
                  <SelectItem value="no-preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>
      <FormField
        id="consultation-availability"
        label="Preferred date or availability"
        optional
        error={errors.availability?.message}
      >
        <Input
          id="consultation-availability"
          placeholder="e.g. Weekday afternoons, or a preferred date"
          aria-invalid={!!errors.availability}
          aria-describedby={
            errors.availability ? "consultation-availability-error" : undefined
          }
          {...register("availability")}
        />
      </FormField>
      <FormField
        id="consultation-message"
        label="How can we help?"
        error={errors.message?.message}
      >
        <Textarea
          id="consultation-message"
          rows={5}
          placeholder="Briefly describe your needs and any relevant deadlines…"
          required
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "consultation-message-error" : undefined
          }
          {...register("message")}
        />
      </FormField>
      <div hidden aria-hidden="true">
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-label="Leave empty"
          {...register("website")}
        />
      </div>
      <Controller
        name="consent"
        control={control}
        render={({ field }) => (
          <div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="consultation-consent"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
                aria-invalid={!!errors.consent}
                aria-describedby={
                  errors.consent ? "consultation-consent-error" : undefined
                }
              />
              <label
                htmlFor="consultation-consent"
                className="text-sm leading-5 text-muted-foreground"
              >
                I agree to the{" "}
                <Link href="/privacy-policy" className="underline">
                  privacy notice
                </Link>{" "}
                and the use of my details to respond to this enquiry.
              </label>
            </div>
            {errors.consent && (
              <p
                id="consultation-consent-error"
                role="alert"
                className="mt-2 text-sm text-error"
              >
                {errors.consent.message}
              </p>
            )}
          </div>
        )}
      />
      {status && !status.ok && (
        <p
          role="alert"
          className="flex items-start gap-3 border border-error bg-error-surface p-4 text-base text-error"
        >
          <CircleAlert className="size-5 shrink-0" />
          {status.message}
        </p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Sending request…
          </>
        ) : (
          <>
            Request a consultation
            <ArrowUpRight className="ml-5 size-4" />
          </>
        )}
      </Button>
      <p className="text-sm leading-5 text-muted-foreground">
        Submitting a request does not confirm a booking. Please avoid sharing
        sensitive information.
      </p>
    </form>
  );
}
