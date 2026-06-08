import type { PermissionChange, RolePermission } from "../domain/models/Role";

export class PermissionDiffService {
  calculateDiff(
    _newPermissions: string[],
    _existingPermissions: RolePermission[]
  ): { toAdd: PermissionChange[]; toRemove: PermissionChange[] } {
    return { toAdd: [], toRemove: [] };
  }
}
