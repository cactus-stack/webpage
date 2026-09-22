import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Required by `output: "export"`: render the OG card at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, ${site.role}`;

export default async function OpenGraphImage() {
  const portrait = await readFile(
    join(process.cwd(), "public/images/portrait.jpg"),
  );
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

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
            width: 780,
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
                maxWidth: 620,
                fontSize: 30,
                lineHeight: 1.28,
                color: "#a4acb8",
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
              {site.url.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 420,
            height: "100%",
            display: "flex",
            borderLeft: "6px solid #2454dc",
          }}
        >
          <img
            src={portraitSrc}
            alt=""
            width={414}
            height={630}
            style={{ width: 414, height: 630, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
