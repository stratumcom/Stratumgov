import type { CSSProperties } from "react";

/** Palette sampled from stratumcorp_logo2.jpeg, shared across brand surfaces. */
export const brand = {
  // Keep established token names; legacy gold accents now use the logo's slate.
  blue: "#053662",
  gold: "#718592",
  goldText: "#495A67",
  goldLight: "#C8D4DD",
  goldSurface: "#E8EEF2",
  white: "#F8FAFB",
  ink: "#24343F",
  muted: "#566671",
  border: "#D5DEE4",
  surface: "#EDF2F5",
  error: "#B42318",
  errorSurface: "#FEF3F2",
} as const;

export const brandProperties: CSSProperties & Record<`--${string}`, string> = {
  "--brand-blue": brand.blue,
  "--brand-gold": brand.gold,
  "--brand-gold-text": brand.goldText,
  "--brand-gold-light": brand.goldLight,
  "--brand-white": brand.white,
  "--neutral-ink": brand.ink,
  "--neutral-muted": brand.muted,
  "--neutral-border": brand.border,
  "--neutral-surface": brand.surface,
  "--error": brand.error,
  "--error-surface": brand.errorSurface,
};
