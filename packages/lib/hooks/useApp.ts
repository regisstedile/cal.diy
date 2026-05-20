export default function useApp(_appSlug?: string): { data: { isInstalled: boolean } | null; isPending: boolean } {
  return { data: null, isPending: false };
}
