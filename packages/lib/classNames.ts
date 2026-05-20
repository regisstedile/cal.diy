// biome-ignore lint/style/noRestrictedGlobals: intentional standalone implementation to avoid circular dep with @calcom/ui
export default function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(" ");
}
