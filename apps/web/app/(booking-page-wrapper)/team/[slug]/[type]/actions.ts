"use server";

import { revalidatePath } from "next/cache";

export async function revalidateTeamDataCache({
  teamSlug,
  orgSlug,
}: {
  teamSlug: string;
  orgSlug: string | null;
}) {
  if (orgSlug) {
    revalidatePath(`/${teamSlug}`);
  } else {
    revalidatePath(`/team/${teamSlug}`);
  }
}
