"use client";

import type { RoutingFormTraceService } from "@calcom/features/routing-trace/domains/RoutingFormTraceService";
import type { App_RoutingForms_Form } from "@calcom/prisma/client";
import { Utils as QbUtils } from "react-awesome-query-builder";
import type { z } from "zod";
import type { NonRouterRoute, Response, SerializableForm } from "../types/types";
import type { zodNonRouterRoute } from "../zod";
import { getQueryBuilderConfig } from "./getQueryBuilderConfig";
import { isFallbackRoute } from "./isFallbackRoute";
import isRouter from "./isRouter";
import jsonLogic from "./jsonLogicOverrides";

export function processRoute({
  form,
  response,
}: {
  form: SerializableForm<App_RoutingForms_Form>;
  response: Record<string, Pick<Response[string], "value">>;
}) {
  const queryBuilderConfig = getQueryBuilderConfig(form);

  const routes = form.routes || [];

  let decidedAction: NonRouterRoute["action"] | null = null;

  const fallbackRoute = routes.find(isFallbackRoute);

  if (!fallbackRoute) {
    throw new Error("Fallback route is missing");
  }

  const routesWithFallbackInEnd = routes
    .flatMap((r) => {
      // For a router, use it's routes instead.
      if (isRouter(r)) return r.routes;
      return r;
    })
    // Use only non fallback routes
    .filter((route) => route && !isFallbackRoute(route))
    // After above flat map, all routes are non router routes.
    .concat([fallbackRoute]) as z.infer<typeof zodNonRouterRoute>[];

  routesWithFallbackInEnd.some((route) => {
    if (!route) {
      return false;
    }
    const state = {
      tree: QbUtils.checkTree(QbUtils.loadTree(route.queryValue), queryBuilderConfig as any),
      config: queryBuilderConfig,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonLogicQuery = QbUtils.jsonLogicFormat(state.tree, state.config as any);
    const logic = jsonLogicQuery.logic;
    let result = false;
    const responseValues: Record<string, Response[string]["value"]> = {};
    for (const [uuid, { value }] of Object.entries(response)) {
      responseValues[uuid] = value;
    }

    if (logic) {
      // Leave the logs for debugging of routing form logic test in production
      console.log("Checking logic with response", logic, responseValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = jsonLogic.apply(logic as any, responseValues);
    } else {
      // If no logic is provided, then consider it a match
      result = true;
    }
    if (result) {
      decidedAction = route.action;
      return true;
    }
  });

  if (!decidedAction) {
    return null;
  }

  // Without type assertion, it is never. See why https://github.com/microsoft/TypeScript/issues/16928
  return decidedAction as NonRouterRoute["action"];
}

export function findMatchingRoute({
  form,
  response,
  routingFormTraceService,
}: {
  form: SerializableForm<App_RoutingForms_Form>;
  response: Record<string, Pick<Response[string], "value">>;
  routingFormTraceService?: RoutingFormTraceService;
}): z.infer<typeof zodNonRouterRoute> | null {
  const queryBuilderConfig = getQueryBuilderConfig(form);
  const routes = form.routes || [];
  const fallbackRoute = routes.find(isFallbackRoute);

  if (!fallbackRoute) return null;

  const routesWithFallbackInEnd = routes
    .flatMap((r) => (isRouter(r) ? r.routes : r))
    .filter((route) => route && !isFallbackRoute(route))
    .concat([fallbackRoute]) as z.infer<typeof zodNonRouterRoute>[];

  for (const route of routesWithFallbackInEnd) {
    if (!route) continue;
    const state = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tree: QbUtils.checkTree(QbUtils.loadTree(route.queryValue), queryBuilderConfig as any),
      config: queryBuilderConfig,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonLogicQuery = QbUtils.jsonLogicFormat(state.tree, state.config as any);
    const logic = jsonLogicQuery.logic;
    const responseValues: Record<string, Response[string]["value"]> = {};
    for (const [uuid, { value }] of Object.entries(response)) {
      responseValues[uuid] = value;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = logic ? jsonLogic.apply(logic as any, responseValues) : true;
    if (result) {
      if (routingFormTraceService) {
        let routeName: string;
        if ("name" in route && route.name) {
          routeName = route.name;
        } else if (isFallbackRoute(route)) {
          routeName = "default_route";
        } else {
          routeName = route.id;
        }
        if (isFallbackRoute(route)) {
          routingFormTraceService.fallbackRouteUsed({ routeId: route.id, routeName });
        } else {
          routingFormTraceService.routeMatched({ routeId: route.id, routeName });
        }
      }
      return route;
    }
  }

  return null;
}
