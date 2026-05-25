import { z } from "zod";
// Stub: routing-forms schema for workflow order handler
export const ZFormSchema = z.object({}).passthrough();
export type TFormSchema = z.infer<typeof ZFormSchema>;
