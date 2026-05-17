import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { uuid } from "short-uuid";
import { z } from "zod";

import jackson from "@calcom/features/ee/sso/lib/jackson";
import { HttpError } from "@calcom/lib/http-error";
import logger from "@calcom/lib/logger";

import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

const requestQuery = z.object({ access_token: z.string() });

const extractAuthToken = (req: NextRequest) => {
  const uid = uuid();
  const authHeader = req.headers.get("authorization");
  const parts = (authHeader || "").split(" ");
  if (parts.length > 1) return parts[1];

  const parsed = requestQuery.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) {
    throw new HttpError({ statusCode: 401, message: `Unauthorized trace: ${uid}` });
  }

  const { access_token } = parsed.data;
  if (access_token) return access_token;

  throw new HttpError({ statusCode: 401, message: `Unauthorized trace: ${uid}` });
};

async function handler(req: NextRequest) {
  const log = logger.getSubLogger({ prefix: ["[SAML userinfo]"] });
  const { oauthController } = await jackson();
  const token = extractAuthToken(req);

  try {
    const userInfo = await oauthController.userInfo(token);
    return NextResponse.json(userInfo);
  } catch (error) {
    const uid = uuid();
    log.error(`trace: ${uid} Error getting user info: ${error}`);
    throw new Error(`Error getting user info. trace: ${uid}`);
  }
}

export const GET = defaultResponderForAppDir(handler);

export const dynamic = "force-dynamic";
