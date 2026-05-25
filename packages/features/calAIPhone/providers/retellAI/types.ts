export type Language = string;

export type RetellAgentTool = {
  type?: string;
  name?: string;
  description?: string | null;
  cal_api_key?: string | null;
  event_type_id?: number | null;
  timezone?: string | null;
};

export type RetellAgentWithDetails = {
  id: string;
  generalPrompt?: string | null;
  beginMessage?: string | null;
  language?: Language | null;
  voiceId?: string | null;
  generalTools?: RetellAgentTool[] | null;
  outboundPhoneNumbers: {
    id: number;
    phoneNumber: string;
    subscriptionStatus?: string | null;
  }[];
  outboundEventTypeId?: number | null;
  inboundEventTypeId?: number | null;
  retellData?: {
    generalPrompt?: string | null;
    beginMessage?: string | null;
    language?: string | null;
    voiceId?: string | null;
    generalTools?: RetellAgentTool[] | null;
  } | null;
};
