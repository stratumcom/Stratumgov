import type { CSSProperties } from "react";

/** Shared by the website, social image and email presentation. */
export const brand = {
  blue: "#101F8F",
  white: "#F7F5F6",
  ink: "#252734",
  muted: "#606470",
  border: "#D6D5DE",
  surface: "#EEEDF1",
  error: "#B42318",
  errorSurface: "#FEF3F2",
} as const;

export const brandProperties: CSSProperties & Record<`--${string}`, string> = {
  "--brand-blue": brand.blue,
  "--brand-white": brand.white,
  "--neutral-ink": brand.ink,
  "--neutral-muted": brand.muted,
  "--neutral-border": brand.border,
  "--neutral-surface": brand.surface,
  "--error": brand.error,
  "--error-surface": brand.errorSurface,
};
