import { WEBAPP_URL } from "@calcom/lib/constants";

export async function getBookerBaseUrl(_orgId: number | null | undefined): Promise<string> {
  return WEBAPP_URL;
}
