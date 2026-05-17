import * as jose from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as dummy from "openid-client";
import { uuid } from "short-uuid";

import jackson from "@calcom/features/ee/sso/lib/jackson";
import type { OAuthTokenReq } from "@calcom/features/ee/sso/lib/jackson";
import logger from "@calcom/lib/logger";

import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";
import { parseRequestData } from "app/api/parseRequestData";

async function handler(req: NextRequest) {
  // These imports fix tree-shaking issues with jackson
  const _unused = dummy; // eslint-disable-line @typescript-eslint/no-unused-vars
  const _unused2 = jose; // eslint-disable-line @typescript-eslint/no-unused-vars
  const { oauthController } = await jackson();
  const log = logger.getSubLogger({ prefix: ["[SAML token]"] });

  const oauthTokenReq = (await parseRequestData(req)) as OAuthTokenReq;

  try {
    const tokenResponse = await oauthController.token(oauthTokenReq);
    return NextResponse.json(tokenResponse);
  } catch (error) {
    const uid = uuid();
    log.error(`Error getting auth token for client_id ${oauthTokenReq?.client_id}: ${error} trace: ${uid}`);
    throw new Error(`Error getting auth token. trace: ${uid}`);
  }
}

export const POST = defaultResponderForAppDir(handler);
