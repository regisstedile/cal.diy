import { BookingAccessService } from "@calcom/features/bookings/services/BookingAccessService";
import { RoutingTracePresenter } from "@calcom/features/routing-trace/presenters/RoutingTracePresenter";
import { PrismaRoutingTraceRepository } from "@calcom/features/routing-trace/repositories/PrismaRoutingTraceRepository";
import prisma from "@calcom/prisma";
import type { TrpcSessionUser } from "@calcom/trpc/server/types";
import { TRPCError } from "@trpc/server";
import type { TGetRoutingTraceInputSchema } from "./getRoutingTrace.schema";

type GetRoutingTraceOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetRoutingTraceInputSchema;
};

export const getRoutingTraceHandler = async ({ ctx, input }: GetRoutingTraceOptions) => {
  const { user } = ctx;
  const { bookingUid } = input;

  const bookingAccessService = new BookingAccessService(prisma);
  const hasAccess = await bookingAccessService.doesUserIdHaveAccessToBooking({
    userId: user.id,
    bookingUid,
  });

  if (!hasAccess) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You don't have access to this booking" });
  }

  const repo = new PrismaRoutingTraceRepository(prisma);
  const record = await repo.findByBookingUid(bookingUid);

  if (!record) {
    return { steps: [] };
  }

  return { steps: RoutingTracePresenter.present(record.trace) };
};
