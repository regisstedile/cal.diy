import type { ReassignmentAuditActionService } from "@calcom/features/booking-audit/lib/actions/ReassignmentAuditActionService";
import type { Actor } from "@calcom/features/booking-audit/lib/dto/types";
import type { BookingAuditProducerService } from "@calcom/features/booking-audit/lib/service/BookingAuditProducerService.interface";
import type { ActionSource } from "@calcom/features/booking-audit/lib/types/actionSource";
import type { ISimpleLogger } from "@calcom/features/di/shared/services/logger.service";
import type { HashedLinkService } from "@calcom/features/hashedLink/lib/service/HashedLinkService";
import { safeStringify } from "@calcom/lib/safeStringify";
import type { z } from "zod";
import type { BookingCreatedPayload, BookingRescheduledPayload } from "./types";

interface BookingEventHandlerDeps {
  log: ISimpleLogger;
  hashedLinkService: HashedLinkService;
  bookingAuditProducerService: BookingAuditProducerService;
}

interface OnBookingCreatedParams {
  payload: BookingCreatedPayload;
}

interface OnBookingRescheduledParams {
  payload: BookingRescheduledPayload;
}

interface OnReassignmentParams {
  bookingUid: string;
  actor: Actor;
  organizationId: number | null;
  source: ActionSource;
  auditData: z.infer<typeof ReassignmentAuditActionService.latestFieldsSchema>;
  isBookingAuditEnabled: boolean;
}

export class BookingEventHandlerService {
  private readonly log: BookingEventHandlerDeps["log"];

  constructor(private readonly deps: BookingEventHandlerDeps) {
    this.log = deps.log;
  }

  async onReassignment(params: OnReassignmentParams) {
    const { bookingUid, actor, organizationId, source, auditData, isBookingAuditEnabled } = params;
    this.log.debug("onReassignment", safeStringify(params));
    try {
      await this.deps.bookingAuditProducerService.queueReassignmentAudit({
        bookingUid,
        actor,
        organizationId,
        source,
        data: auditData,
        isBookingAuditEnabled,
      });
    } catch (error) {
      this.log.error("Error while queueing reassignment audit", safeStringify(error));
    }
  }

  async onBookingCreated(params: OnBookingCreatedParams) {
    const { payload } = params;
    this.log.debug("onBookingCreated", safeStringify(payload));
    if (payload.config.isDryRun) {
      return;
    }
    await this.onBookingCreatedOrRescheduled(payload);
  }

  async onBookingRescheduled(params: OnBookingRescheduledParams) {
    const { payload } = params;
    this.log.debug("onBookingRescheduled", safeStringify(payload));
    if (payload.config.isDryRun) {
      return;
    }
    await this.onBookingCreatedOrRescheduled(payload);
  }

  private async onBookingCreatedOrRescheduled(payload: BookingCreatedPayload | BookingRescheduledPayload) {
    const results = await Promise.allSettled([
      this.updatePrivateLinkUsage(payload.bookingFormData.hashedLink),
    ]);
    results.forEach((result) => {
      if (result.status === "rejected") {
        this.log.error(
          "Error while executing onBookingCreatedOrRescheduled task",
          safeStringify(result.reason)
        );
      }
    });
  }

  private async updatePrivateLinkUsage(hashedLink: string | null) {
    try {
      if (hashedLink) {
        await this.deps.hashedLinkService.validateAndIncrementUsage(hashedLink);
      }
    } catch (error) {
      this.log.error("Error while updating hashed link", safeStringify(error));
    }
  }
}
