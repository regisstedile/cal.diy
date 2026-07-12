import { getSlugOrRequestedSlug } from "@calcom/features/eventtypes/lib/getPublicEvent";
import slugify from "@calcom/lib/slugify";
import prisma from "@calcom/prisma";
import { getServerSideProps as GSSUserTypePage } from "@server/lib/[user]/[type]/getServerSideProps";
import { getServerSideProps as GSSTeamTypePage } from "@server/lib/team/[slug]/[type]/getServerSideProps";
import type { GetServerSidePropsContext } from "next";
import z from "zod";

const paramsSchema = z.object({
  orgSlug: z.string().transform((s) => slugify(s)),
  user: z.string(),
  type: z.string().transform((s) => slugify(s)),
});

/**
 * On an org domain the root path serves users AND teams (acme.com/{team}/{event}
 * mirrors upstream). The org rewrite can't tell them apart, so this loader
 * dispatches: org-nested team slug -> team event page, otherwise user page.
 * Ported from REF (lib/org/[orgSlug]/[user]/[type]); the fork renders both
 * cases with the same users-type-public-view, so only the loader differs.
 */
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user: teamOrUserSlug, orgSlug, type } = paramsSchema.parse(ctx.params);
  const team = await prisma.team.findFirst({
    where: {
      slug: slugify(teamOrUserSlug),
      parentId: { not: null },
      parent: getSlugOrRequestedSlug(orgSlug),
    },
    select: { id: true },
  });

  if (team) {
    const params = { slug: teamOrUserSlug, type };
    return GSSTeamTypePage({
      ...ctx,
      params: { ...ctx.params, ...params },
      query: { ...ctx.query, ...params },
    });
  }

  const params = { user: teamOrUserSlug, type };
  return GSSUserTypePage({
    ...ctx,
    params: { ...ctx.params, ...params },
    query: { ...ctx.query, ...params },
  });
};
