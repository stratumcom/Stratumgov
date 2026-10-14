"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  LoaderCircle,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
export function ContactForm({
  defaultSubject = "",
}: {
  defaultSubject?: string;
}) {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const requestId = useRef<string>("");
  const signature = useRef("");
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject,
      message: "",
      consent: false,
      website: "",
      requestId: "",
    },
  });
  const onSubmit = handleSubmit(async (values) => {
    setStatus(null);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await r.json();
      setStatus({
        ok: r.ok,
        message: data.message || "Unable to submit. Please try again.",
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
        <h2 className="text-2xl font-semibold">Message received.</h2>
        <p className="mt-4 leading-7 text-muted-foreground">{status.message}</p>
        <Button
          className="mt-6"
          onClick={() => {
            setStatus(null);
            requestId.current = "";
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  return (
    <form
      noValidate
      onSubmit={(e) => {
        const current = JSON.stringify({ ...getValues(), requestId: "" });
        if (!requestId.current || signature.current !== current) {
          requestId.current = crypto.randomUUID();
          signature.current = current;
        }
        setValue("requestId", requestId.current);
        void onSubmit(e);
      }}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Full name"
          id="contact-name"
          error={errors.name?.message}
        >
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your full name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
        </FormField>
        <FormField
          label="Email address"
          id="contact-email"
          error={errors.email?.message}
        >
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
        </FormField>
      </div>
      <FormField
        label="Phone number"
        id="contact-phone"
        optional
        error={errors.phone?.message}
      >
        <Input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your contact number"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          {...register("phone")}
        />
      </FormField>
      <FormField
        label="Subject"
        id="contact-subject"
        error={errors.subject?.message}
      >
        <Input
          id="contact-subject"
          defaultValue={defaultSubject}
          placeholder="What would you like to discuss?"
          required
          aria-invalid={!!errors.subject}
          aria-describedby={
            errors.subject ? "contact-subject-error" : undefined
          }
          {...register("subject")}
        />
      </FormField>
      <FormField
        label="Your message"
        id="contact-message"
        error={errors.message?.message}
      >
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us a little about your enquiry…"
          required
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
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
                id="contact-consent"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
                aria-invalid={!!errors.consent}
                aria-describedby={
                  errors.consent ? "contact-consent-error" : undefined
                }
              />
              <label
                htmlFor="contact-consent"
                className="text-sm leading-5 text-muted-foreground"
              >
                I agree to the{" "}
                <Link className="underline" href="/privacy-policy">
                  privacy notice
                </Link>{" "}
                and the use of my details to respond to this enquiry.
              </label>
            </div>
            {errors.consent && (
              <p
                id="contact-consent-error"
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
            Sending…
          </>
        ) : (
          <>
            Send your message
            <ArrowUpRight className="ml-5 size-4" />
          </>
        )}
      </Button>
      <p className="text-sm leading-5 text-muted-foreground">
        Please do not include confidential documents or sensitive personal
        information.
      </p>
    </form>
  );
}
