import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

import { getAppWithMetadata } from "@calcom/app-store/_appRegistry";
import RoutingFormsRoutingConfig from "@calcom/app-store/routing-forms/pages/app-routing.config";
import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { useParamsWithFallback } from "@calcom/lib/hooks/useParamsWithFallback";
import prisma from "@calcom/prisma";
import type { AppGetServerSideProps } from "@calcom/types/AppGetServerSideProps";

import PageWrapper from "@components/PageWrapper";

import { ssrInit } from "@server/lib/ssr";

type AppPageType = {
  getServerSideProps: AppGetServerSideProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ((props: any) => JSX.Element) & {
    isBookingPage?: boolean | ((props: { router: { query: Record<string, string | string[]> } }) => boolean);
    getLayout?: (page: React.ReactElement) => React.ReactNode;
    PageWrapper?: typeof PageWrapper;
  };
};

type Found = {
  notFound: false;
  Component: AppPageType["default"];
  getServerSideProps: AppPageType["getServerSideProps"];
};

type NotFound = {
  notFound: true;
};

const AppsRouting: Record<string, ReturnType<typeof getRoutingConfig>> = {
  "routing-forms": RoutingFormsRoutingConfig,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRoutingConfig(config: any) {
  return config;
}

function getRoute(appName: string, pages: string[]): Found | NotFound {
  const routingConfig = AppsRouting[appName] as Record<string, AppPageType> | undefined;
  if (!routingConfig) {
    return { notFound: true };
  }
  const mainPage = pages[0];
  const appPage = (routingConfig.layoutHandler || routingConfig[mainPage]) as AppPageType | undefined;
  if (!appPage) {
    return { notFound: true };
  }
  return { notFound: false, Component: appPage.default, ...appPage };
}

const AppPage: AppPageType["default"] = function AppPage(props) {
  const appName = props.appName as string;
  const params = useParamsWithFallback();
  const rawPages = params.pages;
  const pages = Array.isArray(rawPages) ? rawPages : rawPages?.toString().split("/") ?? [];
  const route = getRoute(appName, pages);

  if (!route || route.notFound) {
    throw new Error("Route not found");
  }

  return <route.Component {...props} pages={pages.slice(1)} />;
};

AppPage.PageWrapper = PageWrapper;

export const getLayout = (page: React.ReactElement) => {
  return page;
};

AppPage.getLayout = getLayout;

export default AppPage;

const paramsSchema = z.object({
  slug: z.string(),
  pages: z.array(z.string()),
  appPages: z.array(z.string()).optional(),
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;
  if (!params) {
    return { notFound: true };
  }

  const parsed = paramsSchema.safeParse(params);
  if (!parsed.success) {
    return { notFound: true };
  }

  const { slug: appName, pages } = parsed.data;
  const route = getRoute(appName, pages);
  if (route.notFound) {
    return { notFound: true };
  }

  if (route.getServerSideProps) {
    const typedParams = params as { slug: string; pages: string[]; appPages?: string[] };
    typedParams.appPages = pages.slice(1);

    const session = await getServerSession({ req });
    const user = session?.user;
    const app = await getAppWithMetadata({ slug: appName });
    if (!app) {
      return { notFound: true };
    }

    const result = await route.getServerSideProps(
      context as Parameters<AppGetServerSideProps>[0],
      prisma,
      user,
      ssrInit
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((result as any).notFound) return { notFound: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((result as any).redirect) return { redirect: (result as any).redirect };

    return {
      props: {
        appName,
        appUrl: app.simplePath || `/apps/${appName}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(result as any).props,
      },
    };
  }

  return { props: { appName } };
}
