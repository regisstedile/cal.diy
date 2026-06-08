"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAttributesList() {
  revalidatePath("/settings/organizations/members");
}
