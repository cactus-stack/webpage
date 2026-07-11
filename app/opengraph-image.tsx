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
          backgroundColor: "#0b0d10",
          color: "#f0f1ec",
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
              color: "#88a9ee",
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
                color: "#a1a7b3",
                letterSpacing: -0.5,
              }}
            >
              Typed services, agent integrations and serverless workflows for
              banking and fintech.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 22,
              borderTop: "1px solid #2a3038",
              color: "#a1a7b3",
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
            backgroundColor: "#215dd8",
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
