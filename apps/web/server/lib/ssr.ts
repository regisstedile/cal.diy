import type { GetServerSidePropsContext } from "next";

// Minimal ssrInit stub — routing-forms pages call prefetch() for SSR hydration.
// Without a full tRPC SSG setup, we return a no-op that lets the client fetch on mount.
const noop = async () => undefined;
const noopProcedure = { prefetch: noop, fetch: noop };

export async function ssrInit(_context: GetServerSidePropsContext) {
  return {
    viewer: {
      appRoutingForms: {
        forms: noopProcedure,
      },
      teamsAndUserProfilesQuery: noopProcedure,
      me: noopProcedure,
      public: {
        session: noopProcedure,
      },
      features: {
        map: noopProcedure,
      },
      teams: {
        hasTeamPlan: noopProcedure,
      },
    },
    queryClient: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQueryData: (_key: unknown, _data: unknown) => undefined,
    },
    dehydrate: async () => ({}),
  };
}
