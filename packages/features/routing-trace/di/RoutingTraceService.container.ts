import type { RoutingTraceService } from "../services/RoutingTraceService";

class RoutingTraceServiceImpl implements RoutingTraceService {
  addStep(_args: { domain: string; step: string; data?: Record<string, unknown> }): void {
    return;
  }

  async savePendingRoutingTrace(_args: { formResponseId?: number; queuedFormResponseId?: number }): Promise<void> {
    return;
  }
}

export function getRoutingTraceService(): RoutingTraceServiceImpl {
  return new RoutingTraceServiceImpl();
}
