import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, price, durationMinutes } = body;

    // Find existing service
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Validate name
    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
      return NextResponse.json(
        { error: "Service name is required" },
        { status: 400 },
      );
    }

    // Validate price
    if (price !== undefined) {
      const parsedPrice = Number(price);

      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
        return NextResponse.json(
          { error: "Invalid service price" },
          { status: 400 },
        );
      }
    }

    // Validate duration
    if (durationMinutes !== undefined) {
      if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
        return NextResponse.json(
          { error: "Invalid service duration" },
          { status: 400 },
        );
      }
    }

    // Check duplicate name
    if (name !== undefined) {
      const normalizedName = name.trim();

      const duplicateService = await prisma.service.findFirst({
        where: {
          name: normalizedName,
          NOT: {
            id,
          },
        },
      });

      if (duplicateService) {
        return NextResponse.json(
          {
            error: "A service with this name already exists",
          },
          { status: 409 },
        );
      }
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...(name !== undefined && {
          name: name.trim(),
        }),

        ...(price !== undefined && {
          price: String(price),
        }),

        ...(durationMinutes !== undefined && {
          durationMinutes,
        }),
      },
    });

    return NextResponse.json(updatedService);
  } catch {
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(updatedService);
  } catch {
    return NextResponse.json(
      { error: "Failed to deactivate service" },
      { status: 500 },
    );
  }
}
