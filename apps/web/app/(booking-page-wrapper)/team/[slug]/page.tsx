import { getOrgOrTeamAvatar } from "@calcom/lib/defaultAvatarImage";
import prisma from "@calcom/prisma";
import { SchedulingType } from "@calcom/prisma/enums";
import type { PageProps } from "app/_types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const resolveSlug = (raw: string | string[] | undefined): string => {
  if (Array.isArray(raw)) return raw[0] ?? "";
  return raw ?? "";
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const slug = resolveSlug((await params).slug);
  const team = await prisma.team.findFirst({
    where: { slug, isOrganization: false },
    select: { name: true, bio: true },
  });
  if (!team) return {};
  return { title: team.name, description: team.bio ?? undefined };
};

const schedulingTypeLabel: Record<SchedulingType, string> = {
  [SchedulingType.ROUND_ROBIN]: "Round Robin",
  [SchedulingType.COLLECTIVE]: "Collective",
  [SchedulingType.MANAGED]: "Managed",
};

const Page = async ({ params }: PageProps) => {
  const slug = resolveSlug((await params).slug);

  const team = await prisma.team.findFirst({
    where: { slug, isOrganization: false },
    select: {
      id: true,
      name: true,
      slug: true,
      bio: true,
      logoUrl: true,
      eventTypes: {
        where: { hidden: false },
        orderBy: { position: "asc" },
        select: {
          id: true,
          title: true,
          slug: true,
          length: true,
          description: true,
          schedulingType: true,
        },
      },
    },
  });

  if (!team) notFound();

  const avatarUrl = getOrgOrTeamAvatar(team);
  const eventTypes = team.eventTypes;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex flex-col items-center text-center">
        {avatarUrl && (
          <Image src={avatarUrl} alt={team.name} width={72} height={72} className="mb-4 rounded-full" />
        )}
        <h1 className="text-emphasis text-2xl font-bold">{team.name}</h1>
        {team.bio && <p className="text-default mt-2 max-w-md text-sm">{team.bio}</p>}
      </div>

      {eventTypes.length === 0 ? (
        <p className="text-subtle text-center text-sm">Este time ainda não tem tipos de evento.</p>
      ) : (
        <ul className="space-y-3">
          {eventTypes.map((et) => (
            <li key={et.id}>
              <Link
                href={`/team/${team.slug}/${et.slug}`}
                className="border-subtle bg-default hover:bg-muted flex items-center justify-between rounded-lg border p-4 transition-colors">
                <div>
                  <p className="text-emphasis font-medium">{et.title}</p>
                  {et.description && (
                    <p className="text-subtle mt-0.5 line-clamp-1 text-sm">{et.description}</p>
                  )}
                  <p className="text-subtle mt-1 text-xs">
                    {et.length} min
                    {et.schedulingType
                      ? ` · ${schedulingTypeLabel[et.schedulingType] ?? et.schedulingType}`
                      : ""}
                  </p>
                </div>
                <span className="text-subtle ml-4 shrink-0 text-sm">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Page;
