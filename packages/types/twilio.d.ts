// Type stub for twilio — SMS sending not available without credentials
declare module "twilio" {
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
    fetch(opts?: Record<string, unknown>): Promise<{ phoneNumber: string; valid: boolean; countryCode: string; [key: string]: unknown }>;
  }
  interface TwilioClient {
    messages: MessagesFunction;
    verify: {
      v2: {
        services(sid: string): VerifyService;
      };
      services(sid: string): VerifyService;
    };
    lookups: {
      v2: {
        phoneNumbers(phone: string): LookupPhone;
      };
    };
  }
  interface TwilioClientConstructor {
    (sid?: string, token?: string): TwilioClient;
    validateRequest(token: string, signature: string, url: string, params: object): boolean;
  }
  const TwilioClient: TwilioClientConstructor;
  export = TwilioClient;
}
