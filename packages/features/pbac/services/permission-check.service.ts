// Stub: PBAC removed from cal.diy — all permission checks pass
export class PermissionCheckService {
  async hasPermission(_userId: number, _permission: string, _resourceId?: number): Promise<boolean> {
    return true;
  }
  async checkPermission(_args: unknown): Promise<boolean> {
    return true;
  }
  async checkPermissions(_args: unknown): Promise<boolean> {
    return true;
  }
  async getTeamIdsWithPermission(_args: unknown): Promise<number[]> {
    return [];
  }
  static getInstance(): PermissionCheckService {
    return new PermissionCheckService();
  }
}
