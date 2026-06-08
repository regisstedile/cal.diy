import { z } from "zod";

export const ZGetInputSchema = z.object({
  organizationId: z.number().int().positive(),
});

export type ZGetInputSchema = z.infer<typeof ZGetInputSchema>;
