import type { ReactNode } from "react";

export function UpgradeTip({ children }: { children: ReactNode; [key: string]: unknown }) {
  return <>{children}</>;
}
