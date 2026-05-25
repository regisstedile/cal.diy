// Stub: AI Phone feature not available in cal.diy
export function createDefaultAIPhoneServiceProvider() {
  return {
    createPhoneCall: async (..._args: unknown[]) => null,
    cancelPhoneCall: async (..._args: unknown[]) => null,
    cancelPhoneNumberSubscription: async (..._args: unknown[]): Promise<{ success: boolean; message: string }> => ({ success: true, message: "" }),
    deletePhoneNumber: async (..._args: unknown[]): Promise<{ success: boolean; message: string }> => ({ success: true, message: "" }),
    deleteAgent: async (..._args: unknown[]) => null,
    removeToolsForEventTypes: async (..._args: unknown[]) => null,
    updateToolsFromAgentId: async (..._args: unknown[]) => null,
  };
}
