interface MessageResource {
  update(opts: { status: string }): Promise<void>;
  fetch(): Promise<{ body: string; price?: string; numSegments?: string; [key: string]: unknown }>;
}

interface MessagesFunction {
  (sid: string): MessageResource;
  create(opts: {
    body?: string;
    from?: string;
    to: string;
    messagingServiceSid?: string;
    statusCallback?: string;
    scheduleType?: string;
    sendAt?: Date;
    [key: string]: unknown;
  }): Promise<{ sid: string }>;
}

interface VerifyService {
  verifications: {
    create(opts: { to: string; channel: string }): Promise<{ status: string }>;
  };
  verificationChecks: {
    create(opts: { to: string; code: string }): Promise<{ status: string }>;
  };
}

interface LookupPhone {
  fetch(opts?: Record<string, unknown>): Promise<{
    phoneNumber: string;
    valid: boolean;
    countryCode: string;
    [key: string]: unknown;
  }>;
}

interface TwilioClientInstance {
  messages: MessagesFunction;
  verify: {
    v2: { services(sid: string): VerifyService };
    services(sid: string): VerifyService;
  };
  lookups: {
    v2: { phoneNumbers(phone: string): LookupPhone };
  };
}

interface TwilioStatic {
  (sid?: string, token?: string): TwilioClientInstance;
  validateRequest(token: string, signature: string, url: string, params: object): boolean;
}

declare const Twilio: TwilioStatic;
export = Twilio;
