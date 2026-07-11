const LOCAL_SITE_URL = "http://localhost:3000";

function resolveSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!configuredUrl) {
    return LOCAL_SITE_URL;
  }

  const urlWithProtocol = /^https?:\/\//i.test(configuredUrl)
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    return new URL(urlWithProtocol).origin;
  } catch {
    return LOCAL_SITE_URL;
  }
}

export const site = {
  name: "Oscar Bucio",
  role: "Backend / AI Engineer",
  description:
    "Backend and AI engineer building typed Python services, serverless workflows, and agent integrations for banking and fintech teams.",
  email: "oscarbucio2001@gmail.com",
  github: "https://github.com/cactus-stack",
  linkedin: "https://www.linkedin.com/in/oscarbucio",
  url: resolveSiteUrl(),
} as const;
