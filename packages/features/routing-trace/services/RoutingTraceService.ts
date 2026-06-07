export interface RoutingTraceService {
  addStep(args: { domain: string; step: string; data?: Record<string, unknown> }): void;
}
