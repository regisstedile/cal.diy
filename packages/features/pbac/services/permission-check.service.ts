import type { PermissionString } from "../domain/types/permission-registry";

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
  async getUserPermissions(_userId: number): Promise<{ teamId: number; permissions: string[] }[]> {
    return [];
  }
  async getResourcePermissions(_args: {
    userId: number;
    teamId: number;
    resource: string;
  }): Promise<PermissionString[]> {
    return [];
  }
  static getInstance(): PermissionCheckService {
    return new PermissionCheckService();
  }
}
