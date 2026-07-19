import { bindModuleToClassOnToken, createModule, type ModuleLoader } from "@calcom/features/di/di";
import { moduleLoader as loggerModuleLoader } from "@calcom/features/di/shared/services/logger.service";
import { DI_TOKENS } from "@calcom/features/di/tokens";

import { PushNotificationService } from "../lib/service/PushNotificationService";
import { moduleLoader as subscriptionsRepositoryModuleLoader } from "./NotificationsSubscriptionsRepository.module";

const thisModule = createModule();
const token = DI_TOKENS.PUSH_NOTIFICATION_SERVICE;
const moduleToken = DI_TOKENS.PUSH_NOTIFICATION_SERVICE_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: PushNotificationService,
  depsMap: {
    log: loggerModuleLoader,
    subscriptionsRepository: subscriptionsRepositoryModuleLoader,
  },
});

export const moduleLoader: ModuleLoader = {
  token,
  loadModule,
};

export type { PushNotificationService };
