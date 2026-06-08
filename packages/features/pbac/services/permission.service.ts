export class PermissionService {
  async getResourcePermissions(_args: {
    userId: number;
    teamId: number;
    resource: string;
  }): Promise<string[]> {
    return [];
  }

  validatePermissions(_permissions: string[]): { isValid: boolean; error?: string } {
    return { isValid: true };
  }
}
