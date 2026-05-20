export function orgDomainConfig(_hostname?: unknown, _fallbackOrgSlug?: string | null) {
  return { isValidOrgDomain: false, currentOrgDomain: null as string | null };
}

export function getOrgFullOrigin(_slug: string, _options?: { protocol?: boolean }) {
  return "";
}
