import BaseEmail from "./_base-email";

interface DelegationCredentialDisabledEmailParams {
  recipientEmail: string;
  recipientName?: string;
  calendarAppName: string;
  conferencingAppName: string;
}

export default class DelegationCredentialDisabledEmail extends BaseEmail {
  recipientEmail: string;
  recipientName?: string;
  calendarAppName: string;
  conferencingAppName: string;

  constructor(params: DelegationCredentialDisabledEmailParams) {
    super();
    this.name = "DELEGATION_CREDENTIAL_DISABLED";
    this.recipientEmail = params.recipientEmail;
    this.recipientName = params.recipientName;
    this.calendarAppName = params.calendarAppName;
    this.conferencingAppName = params.conferencingAppName;
  }

  protected async getNodeMailerPayload(): Promise<Record<string, unknown>> {
    return {
      to: this.recipientEmail,
      subject: `Your calendar integration has been disabled`,
      html: `<p>Your ${this.calendarAppName} and ${this.conferencingAppName} integration has been disabled.</p>`,
    };
  }
}
