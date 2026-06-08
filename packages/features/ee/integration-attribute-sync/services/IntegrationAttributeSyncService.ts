import type {
  ICreateAttributeSyncInput,
  ISyncFormData,
  IntegrationAttributeSync,
} from "../repositories/IIntegrationAttributeSyncRepository";

export class DuplicateAttributeWithinSyncError extends Error {
  constructor() {
    super("DuplicateAttributeWithinSyncError");
  }
}

export class DuplicateAttributeAcrossSyncsError extends Error {
  constructor() {
    super("DuplicateAttributeAcrossSyncsError");
  }
}

export class UnauthorizedAttributeError extends Error {
  constructor() {
    super("UnauthorizedAttributeError");
  }
}

export class CredentialNotFoundError extends Error {
  constructor() {
    super("CredentialNotFoundError");
  }
}

export class IntegrationAttributeSyncService {
  async getById(_id: string): Promise<IntegrationAttributeSync | null> {
    return null;
  }

  async deleteById(_id: string): Promise<void> {
    return;
  }

  async createAttributeSync(_input: ICreateAttributeSyncInput, _orgId: number): Promise<IntegrationAttributeSync> {
    throw new Error("Not implemented");
  }

  async getAllIntegrationAttributeSyncs(_orgId: number): Promise<IntegrationAttributeSync[]> {
    return [];
  }

  async updateIncludeRulesAndMappings(_data: ISyncFormData): Promise<void> {
    return;
  }

  async validateCredentialBelongsToOrg(
    _credentialId: number,
    _orgId: number
  ): Promise<{ app?: { slug: string }; type: string } | null> {
    return null;
  }

  async getEnabledAppCredentials(_orgId: number): Promise<{ id: number; type: string; appId?: string | null }[]> {
    return [];
  }
}
