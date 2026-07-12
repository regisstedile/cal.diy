import prismaMock from "@calcom/testing/lib/__mocks__/prismaMock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InsightsRoutingBaseService } from "./InsightsRoutingBaseService";

const FILTERS = { startDate: "2026-01-01T00:00:00.000Z", endDate: "2026-12-31T23:59:59.999Z" };

const makeService = () =>
  new InsightsRoutingBaseService({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prisma: prismaMock as any,
    options: { scope: "user", userId: 1, orgId: null },
    filters: FILTERS,
  });

const response = (overrides: Record<string, unknown> = {}) => ({
  id: 10,
  uuid: "resp-uuid-10",
  formFillerId: "filler",
  formId: "form-1",
  response: { campo1: { value: "sim" } },
  createdAt: new Date("2026-06-01T12:00:00.000Z"),
  chosenRouteId: null,
  routedToBookingUid: null,
  updatedAt: new Date("2026-06-01T12:00:00.000Z"),
  form: { id: "form-1", name: "Triagem", teamId: null, userId: 1 },
  ...overrides,
});

const routedBooking = {
  uid: "bk-uid-1",
  id: 77,
  status: "ACCEPTED",
  createdAt: new Date("2026-06-01T12:05:00.000Z"),
  user: { id: 5, name: "Atendente", email: "a@allged.com.br", avatarUrl: null },
  attendees: [{ name: "Cliente", email: "c@x.com", phoneNumber: null }],
  assignmentReason: [{ reasonString: "Round robin" }],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("booking linkage via routedToBookingUid", () => {
  it("fills booking columns when the response routed to a booking", async () => {
    prismaMock.app_RoutingForms_FormResponse.findMany.mockResolvedValue([
      response({ routedToBookingUid: "bk-uid-1" }),
    ] as never);
    prismaMock.booking.findMany.mockResolvedValue([routedBooking] as never);

    const { data } = await makeService().getTableData({});

    expect(data[0]).toMatchObject({
      uuid: "resp-uuid-10",
      bookingUid: "bk-uid-1",
      bookingId: 77,
      bookingUserId: 5,
      bookingUserName: "Atendente",
      bookingStatus: "ACCEPTED",
      bookingStatusOrder: 1,
      bookingAssignmentReason: "Round robin",
      bookingAttendees: [{ name: "Cliente", email: "c@x.com", phoneNumber: null }],
    });
  });

  it("keeps booking columns null when there is no routed booking, without querying bookings", async () => {
    prismaMock.app_RoutingForms_FormResponse.findMany.mockResolvedValue([response()] as never);

    const { data } = await makeService().getTableData({});

    expect(data[0]).toMatchObject({ bookingUid: null, bookingStatus: null, bookingStatusOrder: null });
    expect(prismaMock.booking.findMany).not.toHaveBeenCalled();
  });

  it("batches the booking lookup into a single query", async () => {
    prismaMock.app_RoutingForms_FormResponse.findMany.mockResolvedValue([
      response({ id: 10, routedToBookingUid: "bk-uid-1" }),
      response({ id: 11, uuid: "resp-uuid-11", routedToBookingUid: "bk-uid-2" }),
    ] as never);
    prismaMock.booking.findMany.mockResolvedValue([routedBooking] as never);

    await makeService().getTableData({});

    expect(prismaMock.booking.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.booking.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { uid: { in: ["bk-uid-1", "bk-uid-2"] } } })
    );
  });
});

describe("getRoutingFormStats", () => {
  it("splits totals between routed and unrouted responses", async () => {
    prismaMock.app_RoutingForms_FormResponse.findMany.mockResolvedValue([
      response({ id: 10, routedToBookingUid: "bk-uid-1" }),
      response({ id: 11, uuid: "resp-uuid-11" }),
    ] as never);
    prismaMock.booking.findMany.mockResolvedValue([routedBooking] as never);

    await expect(makeService().getRoutingFormStats()).resolves.toEqual({
      total: 2,
      totalWithBooking: 1,
      totalWithoutBooking: 1,
    });
  });
});

describe("getRoutingFunnelData", () => {
  it("counts submissions, successful routings and accepted bookings per range", async () => {
    prismaMock.app_RoutingForms_FormResponse.findMany.mockResolvedValue([
      response({ id: 10, routedToBookingUid: "bk-uid-1" }),
      response({ id: 11, uuid: "resp-uuid-11" }),
    ] as never);
    prismaMock.booking.findMany.mockResolvedValue([routedBooking] as never);

    const ranges = [
      {
        startDate: "2026-06-01T00:00:00.000Z",
        endDate: "2026-06-30T23:59:59.999Z",
        formattedDate: "Jun",
        formattedDateFull: "Junho 2026",
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [june] = await makeService().getRoutingFunnelData(ranges as any);

    expect(june).toMatchObject({ totalSubmissions: 2, successfulRoutings: 1, acceptedBookings: 1 });
  });
});
