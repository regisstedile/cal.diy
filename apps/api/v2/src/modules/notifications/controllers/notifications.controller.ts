import { SUCCESS_STATUS } from "@calcom/platform-constants";
import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiTags as DocsTags } from "@nestjs/swagger";
import { API_VERSIONS_VALUES } from "@/lib/api-versions";
import { API_KEY_OR_ACCESS_TOKEN_HEADER } from "@/lib/docs/headers";
import { GetUser } from "@/modules/auth/decorators/get-user/get-user.decorator";
import { ApiAuthGuard } from "@/modules/auth/guards/api-auth/api-auth.guard";
import {
  DeleteAppPushSubscriptionInput,
  RegisterAppPushSubscriptionInput,
} from "@/modules/notifications/inputs/app-push-subscription.input";
import { NotificationsRepository } from "@/modules/notifications/notifications.repository";
import {
  DeleteAppPushSubscriptionOutput,
  RegisterAppPushSubscriptionOutput,
} from "@/modules/notifications/outputs/app-push-subscription.output";
import { UserWithProfile } from "@/modules/users/users.repository";

// Consumido pelo app companion (Meu Agendamento): registra/remove o push token
// do dispositivo. Registrar de novo o MESMO deviceId substitui o token antigo
// (token do Expo rotaciona), por isso o delete-por-deviceId antes do create.
@Controller({
  path: "/v2/notifications/subscriptions/app-push",
  version: API_VERSIONS_VALUES,
})
@DocsTags("Notifications")
@UseGuards(ApiAuthGuard)
@ApiHeader(API_KEY_OR_ACCESS_TOKEN_HEADER)
export class NotificationsController {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  @Post("/")
  @ApiOperation({ summary: "Register a mobile app push subscription" })
  async registerAppPushSubscription(
    @Body() input: RegisterAppPushSubscriptionInput,
    @GetUser() user: UserWithProfile
  ): Promise<RegisterAppPushSubscriptionOutput> {
    await this.notificationsRepository.deleteAppPushByDeviceId(user.id, input.deviceId);
    const created = await this.notificationsRepository.createAppPush(user.id, {
      type: "app-push",
      token: input.token,
      platform: input.platform,
      deviceId: input.deviceId,
    });

    return { status: SUCCESS_STATUS, data: { id: created.id } };
  }

  @Delete("/")
  @ApiOperation({ summary: "Unregister a mobile app push subscription" })
  async deleteAppPushSubscription(
    @Body() input: DeleteAppPushSubscriptionInput,
    @GetUser() user: UserWithProfile
  ): Promise<DeleteAppPushSubscriptionOutput> {
    await this.notificationsRepository.deleteAppPushByToken(user.id, input.token);
    return { status: SUCCESS_STATUS };
  }
}
