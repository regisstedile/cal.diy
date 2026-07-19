import type { ISimpleLogger } from "@calcom/features/di/shared/services/logger.service";
import { safeStringify } from "@calcom/lib/safeStringify";

import type { NotificationsSubscriptionsRepository } from "../repository/NotificationsSubscriptionsRepository";

// NotificationsSubscriptions.subscription é string livre com DOIS formatos
// coexistindo na mesma tabela:
//   - web push (navegador): JSON do PushSubscription — tem "endpoint" + "keys"
//   - app push (companion): JSON canônico {"type":"app-push","token":"ExponentPushToken[...]"}
//     gravado pelo endpoint /v2/notifications/subscriptions/app-push do api-v2
export interface IPushNotificationServiceDeps {
  log: ISimpleLogger;
  subscriptionsRepository: NotificationsSubscriptionsRepository;
}

type PushPayload = {
  userId: number | null;
  title: string;
  body: string;
  url?: string;
};

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

export class PushNotificationService {
  constructor(private readonly deps: IPushNotificationServiceDeps) {}

  /** Fire-and-forget: falha de push NUNCA pode quebrar o fluxo de booking. */
  async sendToUser(payload: PushPayload): Promise<void> {
    const { userId, title, body, url } = payload;
    if (!userId) return;

    let rows: { subscription: string }[];
    try {
      rows = await this.deps.subscriptionsRepository.findByUserId(userId);
    } catch (error) {
      this.deps.log.error("push: failed to load subscriptions", safeStringify(error));
      return;
    }
    if (rows.length === 0) return;

    const webSubscriptions: { endpoint: string; keys: { auth: string; p256dh: string } }[] = [];
    const expoTokens: string[] = [];

    for (const row of rows) {
      try {
        const parsed = JSON.parse(row.subscription);
        if (parsed?.type === "app-push" && typeof parsed.token === "string") {
          if (parsed.token.startsWith("ExponentPushToken")) expoTokens.push(parsed.token);
        } else if (parsed?.endpoint && parsed?.keys) {
          webSubscriptions.push(parsed);
        }
      } catch {
        // linha ilegível: ignora, não derruba as demais
      }
    }

    await Promise.allSettled([
      ...webSubscriptions.map((subscription) => this.sendWeb(subscription, { title, body, url })),
      expoTokens.length > 0 ? this.sendExpo(expoTokens, { title, body, url }) : Promise.resolve(),
    ]);
  }

  private async sendWeb(
    subscription: { endpoint: string; keys: { auth: string; p256dh: string } },
    { title, body, url }: { title: string; body: string; url?: string }
  ) {
    try {
      // import dinâmico: web-push (e as VAPID keys) só carregam quando há
      // assinatura de navegador de verdade
      const { sendNotification } = await import("../../sendNotification");
      await sendNotification({ subscription, title, body, url, type: "BOOKING" });
    } catch (error) {
      this.deps.log.error("push: web-push send failed", safeStringify(error));
    }
  }

  private async sendExpo(
    tokens: string[],
    { title, body, url }: { title: string; body: string; url?: string }
  ) {
    try {
      const res = await fetch(EXPO_PUSH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tokens.map((to) => ({ to, title, body, data: url ? { url } : {} }))),
      });
      if (!res.ok) {
        this.deps.log.error("push: expo send failed", safeStringify({ status: res.status }));
      }
    } catch (error) {
      this.deps.log.error("push: expo send failed", safeStringify(error));
    }
  }
}
