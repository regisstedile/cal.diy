// Stub: no-op credit service for cal.diy (no billing)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreditCheckFn = (...args: any[]) => Promise<boolean>;

export class CreditService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async hasAvailableCredits(..._args: any[]): Promise<boolean> {
    return true;
  }
}
