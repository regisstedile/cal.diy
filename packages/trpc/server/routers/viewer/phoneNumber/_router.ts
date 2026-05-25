import { z } from "zod";

import authedProcedure from "../../../procedures/authedProcedure";
import { router } from "../../../trpc";

const notAvailable = { message: "Phone number management is not available in this deployment" };

export const phoneNumberRouter = router({
  buy: authedProcedure.input(z.object({}).passthrough()).mutation(async () => notAvailable),

  import: authedProcedure.input(z.object({}).passthrough()).mutation(async () => notAvailable),

  cancel: authedProcedure
    .input(z.object({ phoneNumberId: z.number() }).passthrough())
    .mutation(async () => notAvailable),

  delete: authedProcedure
    .input(z.object({ phoneNumber: z.string() }).passthrough())
    .mutation(async () => notAvailable),

  update: authedProcedure.input(z.object({}).passthrough()).mutation(async () => notAvailable),
});
