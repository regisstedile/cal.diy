import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import type { GetBookingType } from "@calcom/features/bookings/lib/get-booking";
import { getBookingForReschedule, getBookingForSeatedEvent } from "@calcom/features/bookings/lib/get-booking";
import type { getPublicEvent } from "@calcom/features/eventtypes/lib/getPublicEvent";
import { EventRepository } from "@calcom/features/eventtypes/repositories/EventRepository";
import slugify from "@calcom/lib/slugify";
import { prisma } from "@calcom/prisma";
import { BookingStatus } from "@calcom/prisma/enums";
import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

type Props = {
  eventData: NonNullable<Awaited<ReturnType<typeof getPublicEvent>>>;
  booking?: GetBookingType;
  rescheduleUid: string | null;
  bookingUid: string | null;
  user: string;
  slug: string;
  isBrandingHidden: boolean;
  isSEOIndexable: boolean | null;
  themeBasis: null | string;
  orgBannerUrl: null;
};

const paramsSchema = z.object({
  slug: z.string().transform((s) => slugify(s)),
  type: z.string().transform((s) => slugify(s)),
});

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { slug: teamSlug, type: eventSlug } = paramsSchema.parse(context.params);
  const { rescheduleUid, bookingUid } = context.query;
  const allowRescheduleForCancelledBooking = context.query.allowRescheduleForCancelledBooking === "true";
  const session = await getServerSession({ req: context.req });

  const team = await prisma.team.findFirst({
    where: { slug: teamSlug, isOrganization: false },
    select: { id: true, slug: true, parent: { select: { slug: true } } },
  });

  if (!team) {
    return { notFound: true } as const;
  }

  // Org-nested teams (parentId = org, the single-org invite flow) need their
  // org passed through — with org: null, getPublicEvent requires
  // team.parent = null and 404s every event of a nested team. Standalone
  // teams (custom /settings/teams flow) keep org: null. The fork's orgDomains
  // is a stub, so the team's own parent is the source of truth, not the host.
  const eventData = await EventRepository.getPublicEvent(
    {
      username: teamSlug,
      eventSlug,
      isTeamEvent: true,
      org: team.parent?.slug ?? null,
      fromRedirectOfNonOrgLink: false,
    },
    session?.user?.id
  );

  if (!eventData) {
    return { notFound: true } as const;
  }

  const props: Props = {
    eventData,
    user: teamSlug,
    slug: eventSlug,
    isBrandingHidden: false,
    isSEOIndexable: true,
    themeBasis: null,
    bookingUid: bookingUid ? `${bookingUid}` : null,
    rescheduleUid: null,
    orgBannerUrl: null,
  };

  if (rescheduleUid) {
    const booking = await getBookingForReschedule(`${rescheduleUid}`, session?.user?.id);
    if (booking?.eventType?.disableRescheduling) {
      return { redirect: { destination: `/booking/${rescheduleUid}`, permanent: false } };
    }
    if (
      booking === null ||
      !booking.eventTypeId ||
      (booking.eventTypeId === props.eventData.id &&
        (booking.status !== BookingStatus.CANCELLED || allowRescheduleForCancelledBooking))
    ) {
      props.booking = booking;
      props.rescheduleUid = Array.isArray(rescheduleUid) ? rescheduleUid[0] : rescheduleUid;
    } else {
      const target = await prisma.eventType.findUnique({
        where: { id: booking.eventTypeId },
        select: { slug: true },
      });
      if (!target) return { notFound: true } as const;
      return { redirect: { permanent: false, destination: target.slug } };
    }
  } else if (bookingUid) {
    const booking = await getBookingForSeatedEvent(`${bookingUid}`);
    if (booking?.status === BookingStatus.CANCELLED && !allowRescheduleForCancelledBooking) {
      return { redirect: { permanent: false, destination: eventSlug } };
    }
    props.booking = booking;
    props.bookingUid = Array.isArray(bookingUid) ? bookingUid[0] : bookingUid;
  }

  return { props };
};
