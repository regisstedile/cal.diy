import type { ParsedUrlQuery } from "node:querystring";

export async function getTeamMemberEmailForResponseOrContactUsingUrlQuery({
  query: _query,
  eventTypeId: _eventTypeId,
}: {
  query: ParsedUrlQuery;
  eventTypeId: number;
}): Promise<{ email: string | null; recordType: string | null; crmAppSlug: string | null; recordId: string | null }> {
  return { email: null, recordType: null, crmAppSlug: null, recordId: null };
}
