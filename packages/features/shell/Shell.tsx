import type { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
  withoutMain?: boolean;
  backPath?: string;
  title?: string;
  heading?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  CTA?: ReactNode;
  hideHeadingOnMobile?: boolean;
};

export function ShellMain({ children }: LayoutProps) {
  return <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>;
}

export default function Shell({ children, withoutMain }: LayoutProps) {
  return withoutMain ? <>{children}</> : <ShellMain>{children}</ShellMain>;
}
