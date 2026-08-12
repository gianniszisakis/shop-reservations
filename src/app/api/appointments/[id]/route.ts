import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        source: true,
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(appointment);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        services: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 },
      );
    }

    const { customerId, sourceId, serviceIds, startDateTime, notes, status } =
      body;

    if (
      status !== undefined &&
      !["CONFIRMED", "COMPLETED", "CANCELLED"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid appointment status" },
        { status: 400 },
      );
    }

    if (customerId !== undefined) {
      const customer = await prisma.customer.findFirst({
        where: {
          id: customerId,
          isActive: true,
        },
      });

      if (!customer) {
        return NextResponse.json(
          { error: "Customer not found" },
          { status: 404 },
        );
      }
    }

    if (sourceId !== undefined) {
      const source = await prisma.source.findFirst({
        where: {
          id: sourceId,
          isActive: true,
        },
      });

      if (!source) {
        return NextResponse.json(
          { error: "Source not found" },
          { status: 404 },
        );
      }
    }

    let validServiceIds: string[] | undefined;

    if (serviceIds !== undefined) {
      if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
        return NextResponse.json(
          { error: "At least one service is required" },
          { status: 400 },
        );
      }

      if (new Set(serviceIds).size !== serviceIds.length) {
        return NextResponse.json(
          { error: "Duplicate services are not allowed" },
          { status: 400 },
        );
      }

      validServiceIds = serviceIds;

      const services = await prisma.service.findMany({
        where: {
          id: {
            in: validServiceIds,
          },
          isActive: true,
        },
      });

      if (services.length !== validServiceIds.length) {
        return NextResponse.json(
          { error: "One or more services were not found" },
          { status: 404 },
        );
      }
    }

    let start: Date;

    if (startDateTime !== undefined) {
      start = new Date(startDateTime);

      if (Number.isNaN(start.getTime())) {
        return NextResponse.json(
          { error: "Invalid start date and time" },
          { status: 400 },
        );
      }
    } else {
      start = appointment.startDateTime;
    }

    let end = appointment.endDateTime;

    if (validServiceIds !== undefined || startDateTime !== undefined) {
      const services =
        validServiceIds !== undefined
          ? await prisma.service.findMany({
              where: {
                id: {
                  in: validServiceIds,
                },
                isActive: true,
              },
            })
          : await prisma.service.findMany({
              where: {
                id: {
                  in: appointment.services.map((item) => item.serviceId),
                },
                isActive: true,
              },
            });

      const totalDurationMinutes = services.reduce(
        (total, service) => total + service.durationMinutes,
        0,
      );

      end = new Date(start.getTime() + totalDurationMinutes * 60 * 1000);
    }

    const resultingStatus = status !== undefined ? status : appointment.status;

    if (resultingStatus === "CONFIRMED") {
      const overlappingAppointment = await prisma.appointment.findFirst({
        where: {
          id: {
            not: id,
          },
          status: "CONFIRMED",
          startDateTime: {
            lt: end,
          },
          endDateTime: {
            gt: start,
          },
        },
      });

      if (overlappingAppointment) {
        return NextResponse.json(
          {
            error:
              "The selected time overlaps with another confirmed appointment",
          },
          { status: 409 },
        );
      }
    }

    const updatedAppointment = await prisma.$transaction(async (tx) => {
      const updated = await tx.appointment.update({
        where: {
          id,
        },
        data: {
          ...(customerId !== undefined && {
            customerId,
          }),

          ...(sourceId !== undefined && {
            sourceId,
          }),

          ...(startDateTime !== undefined && {
            startDateTime: start,
            endDateTime: end,
          }),

          ...(serviceIds !== undefined && {
            startDateTime: start,
            endDateTime: end,
            services: {
              deleteMany: {},
              create: validServiceIds!.map((serviceId) => ({
                serviceId,
              })),
            },
          }),

          ...(notes !== undefined && {
            notes: notes?.trim() || null,
          }),

          ...(status !== undefined && {
            status,
          }),
        },

        include: {
          customer: true,
          source: true,
          services: {
            include: {
              service: true,
            },
          },
        },
      });

      return updated;
    });

    return NextResponse.json(updatedAppointment);
  } catch {
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 },
    );
  }
}
