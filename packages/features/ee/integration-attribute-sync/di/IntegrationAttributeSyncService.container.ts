import { IntegrationAttributeSyncService } from "../services/IntegrationAttributeSyncService";

export function getIntegrationAttributeSyncService(): IntegrationAttributeSyncService {
  return new IntegrationAttributeSyncService();
}
