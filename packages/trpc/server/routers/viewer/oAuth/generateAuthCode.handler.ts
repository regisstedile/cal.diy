import { getOAuthService } from "@calcom/features/oauth/di/OAuthService.container";
import {
  type AuthorizeResult,
  type OAuthErrorReason,
  OAUTH_ERROR_REASONS,
} from "@calcom/features/oauth/services/OAuthService";
import { ErrorWithCode } from "@calcom/lib/errors";
import { getHttpStatusCode } from "@calcom/lib/server/getServerErrorFromUnknown";
import { AccessScope } from "@calcom/prisma/enums";
import { httpStatusToTrpcCode } from "@calcom/trpc/server/lib/toTRPCError";
import type { TrpcSessionUser } from "@calcom/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TGenerateAuthCodeInputSchema } from "./generateAuthCode.schema";

type AddClientOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGenerateAuthCodeInputSchema;
};

const SCOPE_ALIASES: Record<string, AccessScope> = {
  READ_PROFILE: AccessScope.READ_PROFILE,
  PROFILE_READ: AccessScope.READ_PROFILE,
  READ_BOOKING: AccessScope.READ_BOOKING,
  BOOKING_READ: AccessScope.READ_BOOKING,
};

function normalizeAccessScopes(scopes: string[]): AccessScope[] {
  const normalized = scopes
    .flatMap((scope) => scope.split(/[,\s]+/))
    .map((scope) => SCOPE_ALIASES[scope])
    .filter((scope): scope is AccessScope => Boolean(scope));

  if (normalized.length === 0) {
    return [AccessScope.READ_PROFILE];
  }

  return Array.from(new Set(normalized));
}

export const generateAuthCodeHandler = async ({ ctx, input }: AddClientOptions): Promise<AuthorizeResult> => {
  try {
    const { clientId, scopes, teamSlug, codeChallenge, codeChallengeMethod, state, redirectUri } = input;
    const oAuthService = getOAuthService();

    const oAuthClientRedirectUri = redirectUri;
    const { authorizationCode, client, redirectUrl } = await oAuthService.generateAuthorizationCode(
      clientId,
      ctx.user.id,
      oAuthClientRedirectUri,
      normalizeAccessScopes(scopes),
      state,
      teamSlug,
      codeChallenge,
      codeChallengeMethod
    );
    return { client, authorizationCode: authorizationCode, redirectUrl: redirectUrl };
  } catch (error) {
    if (error instanceof ErrorWithCode) {
      throw new TRPCError({
        code: httpStatusToTrpcCode(getHttpStatusCode(error)),
        message: OAUTH_ERROR_REASONS[error?.data?.reason as OAuthErrorReason] ?? error.message,
        cause: error,
      });
    }

    throw error;
  }
};
