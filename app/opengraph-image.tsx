import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, ${site.role}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#080a0d",
          color: "#eff1f5",
          fontSize: 32,
        }}
      >
        <div
          style={{
            width: "78%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 72,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#8aa8ff",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {site.role}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 100, fontWeight: 600, letterSpacing: -6 }}>
              {site.name}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 760,
                fontSize: 30,
                lineHeight: 1.28,
                color: "#a4acb8",
                letterSpacing: -0.5,
              }}
            >
              Backends, agent tools and cloud workflows for production AI.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 22,
              borderTop: "1px solid #29313a",
              color: "#a4acb8",
              fontSize: 20,
            }}
          >
            <div style={{ display: "flex" }}>Python / AWS / LLM agents</div>
            <div style={{ display: "flex" }}>
              {site.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "22%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2454dc",
            color: "#f7f9ff",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -5,
          }}
        >
          <div style={{ display: "flex" }}>OB</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
