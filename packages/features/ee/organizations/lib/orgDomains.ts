export function orgDomainConfig(_hostname?: string | null, _fallbackOrgSlug?: string | null) {
  return { isValidOrgDomain: false, currentOrgDomain: null };
}

export function getOrgFullOrigin(_slug: string, _options?: { protocol?: boolean }) {
  return "";
}
