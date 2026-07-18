import { Injectable } from "@nestjs/common";
import { PrismaReadService } from "@/modules/prisma/prisma-read.service";
import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";

// NotificationsSubscriptions.subscription é uma string livre (o schema herdou
// esse shape do upstream, que guardava web-push subscriptions serializadas).
// Para app-push guardamos um JSON canônico com type/token/platform/deviceId —
// os filtros por token/deviceId usam substring match sobre esse JSON.
export type AppPushSubscriptionPayload = {
  type: "app-push";
  token: string;
  platform: "IOS" | "ANDROID";
  deviceId: string;
};

@Injectable()
export class NotificationsRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService
  ) {}

  async createAppPush(userId: number, payload: AppPushSubscriptionPayload) {
    return this.dbWrite.prisma.notificationsSubscriptions.create({
      data: { userId, subscription: JSON.stringify(payload) },
      select: { id: true },
    });
  }

  async deleteAppPushByDeviceId(userId: number, deviceId: string) {
    return this.dbWrite.prisma.notificationsSubscriptions.deleteMany({
      where: {
        userId,
        subscription: { contains: `"deviceId":${JSON.stringify(deviceId)}` },
      },
    });
  }

  async deleteAppPushByToken(userId: number, token: string) {
    return this.dbWrite.prisma.notificationsSubscriptions.deleteMany({
      where: {
        userId,
        subscription: { contains: `"token":${JSON.stringify(token)}` },
      },
    });
  }
}
