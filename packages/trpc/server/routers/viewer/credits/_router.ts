import { z } from "zod";

import authedProcedure from "../../../procedures/authedProcedure";
import { router } from "../../../trpc";

export const creditsRouter = router({
  hasAvailableCredits: authedProcedure
    .input(z.object({ teamId: z.number().optional() }).optional())
    .query(async () => true),
});
