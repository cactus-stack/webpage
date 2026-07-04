import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Oscar Bucio, Backend / AI Engineer";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#05060c",
          backgroundImage:
            "radial-gradient(760px 480px at 85% 0%, rgba(77,141,255,0.22), transparent 70%)",
          color: "#e6e9f0",
          fontSize: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 22px",
            borderRadius: 999,
            border: "1px solid rgba(77,141,255,0.4)",
            color: "#4d8dff",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          Backend / AI Engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -4 }}>
            Oscar Bucio
          </div>
          <div style={{ fontSize: 36, color: "#98a2b6", letterSpacing: -0.5 }}>
            Backend systems that put AI agents to work.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "#98a2b6",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>
            Python, AWS serverless, LLM agents
          </div>
          <div style={{ display: "flex", color: "#4d8dff" }}>
            linkedin.com/in/oscarbucio
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
