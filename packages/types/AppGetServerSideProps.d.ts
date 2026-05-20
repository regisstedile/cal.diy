import type { GetServerSidePropsContext } from "next";
import type { CalendsoSessionUser } from "next-auth";

import type prisma from "@calcom/prisma";

export type AppUser = CalendsoSessionUser | undefined;
export type AppPrisma = typeof prisma;
export type AppGetServerSidePropsContext = GetServerSidePropsContext<{
  pages: string[];
  appPages?: string[];
  slug?: string;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppSsrInit = (context: GetServerSidePropsContext) => Promise<any>;

export type AppGetServerSideProps = (
  context: AppGetServerSidePropsContext,
  prisma: AppPrisma,
  user: AppUser,
  ssrInit: AppSsrInit
) => Promise<any>;
