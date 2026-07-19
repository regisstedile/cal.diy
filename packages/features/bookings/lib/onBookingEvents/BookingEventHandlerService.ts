import type { ReassignmentAuditActionService } from "@calcom/features/booking-audit/lib/actions/ReassignmentAuditActionService";
import type { Actor } from "@calcom/features/booking-audit/lib/dto/types";
import type { BookingAuditProducerService } from "@calcom/features/booking-audit/lib/service/BookingAuditProducerService.interface";
import type { ActionSource } from "@calcom/features/booking-audit/lib/types/actionSource";
import type { ISimpleLogger } from "@calcom/features/di/shared/services/logger.service";
import type { HashedLinkService } from "@calcom/features/hashedLink/lib/service/HashedLinkService";
import type { PushNotificationService } from "@calcom/features/notifications/lib/service/PushNotificationService";
import { safeStringify } from "@calcom/lib/safeStringify";
import type { z } from "zod";
import type { BookingCreatedPayload, BookingRescheduledPayload } from "./types";

interface BookingEventHandlerDeps {
  log: ISimpleLogger;
  hashedLinkService: HashedLinkService;
  bookingAuditProducerService: BookingAuditProducerService;
  pushNotificationService: PushNotificationService;
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
      this.notifyHost(payload),
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

  // Push (navegador via web-push + app companion via Expo) pro anfitrião.
  // Falha aqui nunca propaga -- push é cortesia, booking é o negócio.
  private async notifyHost(payload: BookingCreatedPayload | BookingRescheduledPayload) {
    try {
      const isReschedule = "oldBooking" in payload;
      const start = payload.booking.startTime;
      const when = start.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      await this.deps.pushNotificationService.sendToUser({
        userId: payload.booking.userId ?? payload.booking.user?.id ?? null,
        title: isReschedule ? "Reserva reagendada" : "Nova reserva",
        body: `${when}`,
        url: `/booking/${payload.booking.uid}`,
      });
    } catch (error) {
      this.log.error("Error while sending booking push", safeStringify(error));
    }
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
