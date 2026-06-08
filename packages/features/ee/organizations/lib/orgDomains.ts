export function orgDomainConfig(_hostname?: unknown, _fallbackOrgSlug?: string | null) {
  return { isValidOrgDomain: false, currentOrgDomain: null as string | null };
}

export function subdomainSuffix() {
  const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? "http://localhost:3000";
  const urlSplit = WEBAPP_URL.replace("https://", "").replace("http://", "").split(".");
  return urlSplit.length === 3 ? urlSplit.slice(1).join(".") : urlSplit.join(".");
}

export function getOrgFullOrigin(_slug: string, _options?: { protocol?: boolean }) {
  return "";
}
