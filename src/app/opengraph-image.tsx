import { brand } from "@/config/brand";
import { ImageResponse } from "next/og";
export const alt = "stratumgov — Stratum Governance Ltd.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: brand.blue,
        color: brand.white,
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 4,
          color: brand.white,
        }}
      >
        stratumgov
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 70,
          lineHeight: 1.15,
        }}
      >
        <span>Stratum Governance</span>
        <span style={{ color: brand.white }}>Ltd.</span>
      </div>
      <div style={{ display: "flex", fontSize: 20, color: brand.white }}>
        GOVERNANCE · COMPLIANCE · ADVISORY
      </div>
    </div>,
    size,
  );
}
