import type { z } from "zod";

import type { raqbChildSchema, raqbQueryValueSchema, zodAttributesQueryValue } from "./zod";

export type RaqbChild = z.infer<typeof raqbChildSchema>;
export type RaqbQueryValue = z.infer<typeof raqbQueryValueSchema>;
export type AttributesQueryValue = z.infer<typeof zodAttributesQueryValue>;

export type DynamicFieldValueOperandsResponse = Record<
  string,
  {
    value: number | string | string[];
    label: string;
  }
>;

export type DynamicFieldValueOperands = {
  fields: {
    id: string;
    label: string;
    type: string;
    options?: {
      id: string | null;
      label: string;
    }[];
  }[];
  response: DynamicFieldValueOperandsResponse;
};

// Backward-compatible lowercase alias
export type dynamicFieldValueOperands = DynamicFieldValueOperands;

// Backward-compatible lowercase alias for the response type
export type dynamicFieldValueOperandsResponse = DynamicFieldValueOperandsResponse;
