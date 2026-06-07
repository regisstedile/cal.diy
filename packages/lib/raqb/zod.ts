import { z } from "zod";

export const raqbChildSchema = z.object({
  type: z.string().optional(),
  properties: z
    .object({
      field: z.any().optional(),
      operator: z.any().optional(),
      value: z.any().optional(),
      valueSrc: z.any().optional(),
      valueError: z.array(z.union([z.string(), z.null()])).optional(),
      valueType: z.any().optional(),
    })
    .optional(),
});

const raqbChildren1Schema = z.record(raqbChildSchema).superRefine((children1, ctx) => {
  if (!children1) return;
  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;
  Object.entries(children1).forEach(([, _rule]) => {
    const rule = _rule as unknown;
    if (!isObject(rule) || rule.type !== "rule") return;
    if (!isObject(rule.properties)) return;

    const value = rule.properties.value || [];
    const valueSrc = rule.properties.valueSrc;
    if (!(value instanceof Array) || !(valueSrc instanceof Array)) return;
    if (!valueSrc.length) return;

    const flattenedValues = (value as unknown[]).flat();
    const validValues = flattenedValues.filter((v: unknown) => v !== undefined);

    if (!validValues.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Looks like you are trying to create a rule with no value",
      });
    }
  });
});

export const raqbQueryValueSchema = z.union([
  z.object({
    id: z.string().optional(),
    type: z.literal("group"),
    children1: raqbChildren1Schema.optional(),
    properties: z.any(),
  }),
  z.object({
    id: z.string().optional(),
    type: z.literal("switch_group"),
    children1: raqbChildren1Schema.optional(),
    properties: z.any(),
  }),
]);

export const zodAttributesQueryValue = raqbQueryValueSchema;
