import type { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { WebhooksModule } from "./webhooks/webhooks.module";
import { AtomsModule } from "@/modules/atoms/atoms.module";
import { OAuth2Module } from "@/modules/auth/oauth2/oauth2.module";
import { CalUnifiedCalendarsModule } from "@/modules/cal-unified-calendars/cal-unified-calendars.module";
import { ConferencingModule } from "@/modules/conferencing/conferencing.module";
import { DestinationCalendarsModule } from "@/modules/destination-calendars/destination-calendars.module";
import { NotificationsModule } from "@/modules/notifications/notifications.module";
import { OAuthClientModule } from "@/modules/oauth-clients/oauth-client.module";
import { RouterModule } from "@/modules/router/router.module";
import { SelectedCalendarsModule } from "@/modules/selected-calendars/selected-calendars.module";
import { StripeModule } from "@/modules/stripe/stripe.module";
import { TimezoneModule } from "@/modules/timezones/timezones.module";
import { VerifiedResourcesModule } from "@/modules/verified-resources/verified-resources.module";
import { PlatformEndpointsModule } from "@/platform/platform-endpoints-module";

@Module({
  imports: [
    OAuth2Module,
    OAuthClientModule,
    PlatformEndpointsModule,
    TimezoneModule,
    UsersModule,
    WebhooksModule,
    DestinationCalendarsModule,
    AtomsModule,
    StripeModule,
    ConferencingModule,
    CalUnifiedCalendarsModule,
    VerifiedResourcesModule,
    RouterModule,
    // DESMONTADOS (80f8ece267 montou sem build-testar): TeamsBookings, TeamsSchedules,
    // OrganizationsTeamsBookings, OrganizationsUsersBookings,
    // OrganizationsBookings, OrganizationsRoutingForms — todos importam
    // @/ee/** que NÃO existe no fork (EE removido). 82 erros de build,
    // api-v2 sem imagem nova desde 22/05 por causa disso. Ficam no disco
    // (excluídos do tsconfig.build) até alguém portar as deps de verdade.
    // O app companion consome estes dois: push subscription (novo) e
    // selected-calendars (módulo já existia no fork, nunca tinha sido montado)
    NotificationsModule,
    SelectedCalendarsModule,
  ],
})
export class EndpointsModule implements NestModule {
  configure(_consumer: MiddlewareConsumer) {
    // TODO: apply ratelimits
  }
}
