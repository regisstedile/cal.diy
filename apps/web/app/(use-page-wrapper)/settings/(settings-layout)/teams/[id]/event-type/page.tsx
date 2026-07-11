import { redirect } from "next/navigation";
import { z } from "zod";

const querySchema = z.object({
  id: z.coerce.number(),
});

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const parsed = querySchema.safeParse(await params);

  if (!parsed.success) {
    redirect("/settings/teams");
  }

  // Upstream renders a dedicated creation wizard here; the fork's
  // event-types view already has the create dialog, so we just land there.
  redirect(`/settings/teams/${parsed.data.id}/event-types`);
};

export default Page;
