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
