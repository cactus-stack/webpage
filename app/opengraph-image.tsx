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
  // White version of the brand mark for the dark card.
  const mark = (
    await readFile(join(process.cwd(), "public/images/brand/logo-mark.svg"), "utf8")
  ).replace("#0B0E14", "#FFFFFF");
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#06080c",
          color: "#eef1f6",
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
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <img src={markSrc} alt="" width={70} height={40} style={{ width: 70, height: 40 }} />
            <div
              style={{
                display: "flex",
                color: "#6f9bff",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {site.role}
            </div>
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
                color: "#8f98a8",
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
              borderTop: "1px solid #1b2230",
              color: "#8f98a8",
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
            borderLeft: "6px solid #0E5DFC",
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
