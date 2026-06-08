import { z } from "zod";

export const ZCreateInputSchema = z.object({
  organizationId: z.number().int().positive(),
  name: z.string().trim().min(1),
  provider: z.string().trim().min(1),
});

export type ZCreateInputSchema = z.infer<typeof ZCreateInputSchema>;
