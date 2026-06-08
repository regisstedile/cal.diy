import { z } from "zod";

export const ZDeleteInputSchema = z.object({
  organizationId: z.number().int().positive(),
  directoryId: z.string().trim().min(1),
});

export type ZDeleteInputSchema = z.infer<typeof ZDeleteInputSchema>;
