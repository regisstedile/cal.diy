import { bindModuleToClassOnToken, createModule, type ModuleLoader } from "@calcom/features/di/di";
import { moduleLoader as prismaModuleLoader } from "@calcom/features/di/modules/Prisma";
import { DI_TOKENS } from "@calcom/features/di/tokens";

import { NotificationsSubscriptionsRepository } from "../lib/repository/NotificationsSubscriptionsRepository";

const thisModule = createModule();
const token = DI_TOKENS.NOTIFICATIONS_SUBSCRIPTIONS_REPOSITORY;
const moduleToken = DI_TOKENS.NOTIFICATIONS_SUBSCRIPTIONS_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: NotificationsSubscriptionsRepository,
  dep: prismaModuleLoader,
});

export const moduleLoader: ModuleLoader = {
  token,
  loadModule,
};

export type { NotificationsSubscriptionsRepository };
