import { WEBAPP_URL } from "@calcom/lib/constants";

export function getBookerBaseUrlSync(_orgSlug: string | null | undefined): string {
  return WEBAPP_URL;
}
