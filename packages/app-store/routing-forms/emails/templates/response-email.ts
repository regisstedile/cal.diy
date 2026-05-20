import BaseEmail from "@calcom/emails/templates/_base-email";
import type { App_RoutingForms_Form } from "@calcom/prisma/client";
import type { OrderedResponses } from "../../types/types";
import { ResponseEmail } from "../components/ResponseEmail";

type Form = Pick<App_RoutingForms_Form, "id" | "name">;
export default class ResponseEmailClass extends BaseEmail {
  orderedResponses: OrderedResponses;
  toAddresses: string[];
  form: Form;
  constructor({
    toAddresses,
    orderedResponses,
    form,
  }: {
    form: Form;
    toAddresses: string[];
    orderedResponses: OrderedResponses;
  }) {
    super();
    this.form = form;
    this.orderedResponses = orderedResponses;
    this.toAddresses = toAddresses;
  }

  protected async getNodeMailerPayload(): Promise<Record<string, unknown>> {
    const toAddresses = this.toAddresses;
    const subject = `${this.form.name} has a new response`;
    const React = await import("react");
    const ReactDOMServer = (await import("react-dom/server")).default;
    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(ResponseEmail, {
        form: this.form,
        orderedResponses: this.orderedResponses,
        subject,
      })
    );
    return {
      from: `Cal.com <${this.getMailerOptions().from}>`,
      to: toAddresses.join(","),
      subject,
      html,
    };
  }
}
