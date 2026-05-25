import { z } from "zod";

import authedProcedure from "../../../procedures/authedProcedure";
import { router } from "../../../trpc";

const na = { message: "AI Voice Agent not available" };

const phoneNumberSchema = z.object({
  id: z.number(),
  phoneNumber: z.string(),
  subscriptionStatus: z.string().nullish(),
});

const toolSchema = z.object({
  type: z.string().optional(),
  name: z.string().optional(),
  description: z.string().nullish(),
  cal_api_key: z.string().nullish(),
  event_type_id: z.number().nullish(),
  timezone: z.string().nullish(),
});

const agentSchema = z.object({
  id: z.string(),
  outboundPhoneNumbers: z.array(phoneNumberSchema),
  outboundEventTypeId: z.number().nullish(),
  inboundEventTypeId: z.number().nullish(),
  retellData: z
    .object({
      generalPrompt: z.string().nullish(),
      beginMessage: z.string().nullish(),
      language: z.string().nullish(),
      voiceId: z.string().nullish(),
      generalTools: z.array(toolSchema).nullish(),
    })
    .nullish(),
});

const voiceSchema = z.object({
  voice_id: z.string(),
  voice_name: z.string(),
  provider: z.enum(["elevenlabs", "openai", "deepgram"]),
  gender: z.enum(["male", "female"]),
  accent: z.string().optional(),
  age: z.string().optional(),
  preview_audio_url: z.string().optional(),
});

export const aiVoiceAgentRouter = router({
  get: authedProcedure.input(z.object({ id: z.string() })).output(agentSchema).query(async () => ({
    id: "",
    outboundPhoneNumbers: [],
    outboundEventTypeId: null,
    inboundEventTypeId: null,
    retellData: null,
  })),

  listVoices: authedProcedure.output(z.array(voiceSchema)).query(async () => []),

  testCall: authedProcedure
    .input(
      z.object({
        agentId: z.string(),
        phoneNumber: z.string(),
        teamId: z.number().optional(),
        eventTypeId: z.number(),
      })
    )
    .mutation(async () => na),

  create: authedProcedure.input(z.object({ teamId: z.number().optional() }).passthrough()).mutation(async () => ({ id: "" })),

  update: authedProcedure.input(z.object({ id: z.string().optional() }).passthrough()).mutation(async () => na),

  createWebCall: authedProcedure.input(z.object({ agentId: z.string() }).passthrough()).mutation(async () => ({
    accessToken: "",
  })),

  setupInboundAgent: authedProcedure.input(z.object({}).passthrough()).mutation(async () => ({ agentId: "" })),

  updateInboundAgentEventType: authedProcedure.input(z.object({ agentId: z.string().optional() }).passthrough()).mutation(async () => na),
});
