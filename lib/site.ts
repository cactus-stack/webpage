const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://webpage-wine-delta.vercel.app";

const name = "Oscar Bucio";
const role = "Backend / AI Engineer";

function resolveSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!configuredUrl) {
    return process.env.NODE_ENV === "production"
      ? PRODUCTION_SITE_URL
      : LOCAL_SITE_URL;
  }

  const urlWithProtocol = configuredUrl.includes("://")
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    const parsedUrl = new URL(urlWithProtocol);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error(`Unsupported protocol: ${parsedUrl.protocol}`);
    }

    const hostname = parsedUrl.hostname
      .toLowerCase()
      .replace(/^\[|\]$/g, "")
      .replace(/\.$/, "");
    const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);
    if (
      process.env.NODE_ENV === "production" &&
      localHosts.has(hostname)
    ) {
      throw new Error("A local site URL cannot be used in production");
    }

    return parsedUrl.origin;
  } catch (error) {
    throw new Error(
      `Invalid site URL configured through NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL: ${configuredUrl}`,
      { cause: error },
    );
  }
}

export const site = {
  name,
  initials: "OB",
  role,
  title: `${name} | ${role}`,
  description:
    "Backend and AI engineer building typed Python services, serverless workflows, and agent integrations for banking and fintech teams.",
  email: "oscarbucio2001@gmail.com",
  github: "https://github.com/cactus-stack",
  linkedin: "https://www.linkedin.com/in/oscarbucio",
  url: resolveSiteUrl(),
  locale: "en_US",
  lastModified: "2026-07-12",
} as const;
