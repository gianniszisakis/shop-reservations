import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        startDateTime: "asc",
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

    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { customerId, sourceId, serviceIds, startDateTime, notes } = body;

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer is required" },
        { status: 400 },
      );
    }

    if (!sourceId) {
      return NextResponse.json(
        { error: "Source is required" },
        { status: 400 },
      );
    }

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

    if (!startDateTime) {
      return NextResponse.json(
        { error: "Start date and time are required" },
        { status: 400 },
      );
    }

    const start = new Date(startDateTime);

    if (Number.isNaN(start.getTime())) {
      return NextResponse.json(
        { error: "Invalid start date and time" },
        { status: 400 },
      );
    }

    const [customer, source, services] = await Promise.all([
      prisma.customer.findUnique({
        where: {
          id: customerId,
        },
      }),

      prisma.source.findFirst({
        where: {
          id: sourceId,
          isActive: true,
        },
      }),

      prisma.service.findMany({
        where: {
          id: {
            in: serviceIds,
          },
          isActive: true,
        },
      }),
    ]);

    if (!customer || !customer.isActive) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    if (!source) {
      return NextResponse.json({ error: "Source not found" }, { status: 404 });
    }

    if (services.length !== serviceIds.length) {
      return NextResponse.json(
        { error: "One or more services were not found" },
        { status: 404 },
      );
    }

    const totalDurationMinutes = services.reduce(
      (total, service) => total + service.durationMinutes,
      0,
    );

    const end = new Date(start.getTime() + totalDurationMinutes * 60 * 1000);

    const overlappingAppointment = await prisma.appointment.findFirst({
      where: {
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

    const appointment = await prisma.appointment.create({
      data: {
        customerId,
        sourceId,
        startDateTime: start,
        endDateTime: end,
        notes: notes?.trim() || null,
        status: "CONFIRMED",
        services: {
          create: serviceIds.map((serviceId: string) => ({
            serviceId,
          })),
        },
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

    return NextResponse.json(appointment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 },
    );
  }
}
