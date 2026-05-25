// Stub: opt-out contacts not implemented in cal.diy
export class WorkflowOptOutContactRepository {
  static async addPhoneNumber(_phoneNumber: string) {}
  static async removePhoneNumber(_phoneNumber: string) {}
  static async isOptedOut(_phoneNumber: string): Promise<boolean> {
    return false;
  }
}
