import type { PrismaClient } from "@calcom/prisma";

export class NotificationsSubscriptionsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findByUserId(userId: number): Promise<{ subscription: string }[]> {
    return this.prismaClient.notificationsSubscriptions.findMany({
      where: { userId },
      select: { subscription: true },
    });
  }
}
