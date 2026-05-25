type Params = {
  eventType?: Record<string, unknown>;
  formMethods?: unknown;
  translate?: unknown;
  isManagedEventType?: boolean;
};

export default function useLockedFieldsManager(_params: Params) {
  return {
    isManagedEventType: false,
    isChildrenManagedEventType: false,
    shouldLockDisableProps: (_fieldName: string, _options?: unknown) => ({ disabled: false, isLocked: false, LockedIcon: null }),
  };
}
