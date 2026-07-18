import { Module } from "@nestjs/common";
import { NotificationsController } from "@/modules/notifications/controllers/notifications.controller";
import { NotificationsRepository } from "@/modules/notifications/notifications.repository";
import { PrismaModule } from "@/modules/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [NotificationsRepository],
  controllers: [NotificationsController],
  exports: [NotificationsRepository],
})
export class NotificationsModule {}
