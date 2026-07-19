import { createContainer } from "@calcom/features/di/di";

import {
  type PushNotificationService,
  moduleLoader as pushNotificationServiceModuleLoader,
} from "./PushNotificationService.module";

const container = createContainer();

export function getPushNotificationService(): PushNotificationService {
  pushNotificationServiceModuleLoader.loadModule(container);
  return container.get<PushNotificationService>(pushNotificationServiceModuleLoader.token);
}
