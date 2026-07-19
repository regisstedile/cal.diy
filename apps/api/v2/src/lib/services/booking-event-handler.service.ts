import {
  BookingEventHandlerService as BaseBookingEventHandlerService,
  getBookingAuditProducerService,
} from "@calcom/platform-libraries/bookings";
import { Injectable } from "@nestjs/common";
import { HashedLinkService } from "./hashed-link.service";
import { Logger } from "@/lib/logger.bridge";

@Injectable()
export class BookingEventHandlerService extends BaseBookingEventHandlerService {
  constructor(hashedLinkService: HashedLinkService, bridgeLogger: Logger) {
    super({
      log: bridgeLogger,
      hashedLinkService,
      // Mesmo producer do web (container DI de features) — sem ele todo audit
      // de booking criado via API v2 sumiria silenciosamente
      bookingAuditProducerService: getBookingAuditProducerService(),
    });
  }
}
