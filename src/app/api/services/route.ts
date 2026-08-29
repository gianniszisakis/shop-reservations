import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });

  return NextResponse.json(services);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, price, durationMinutes } = body;

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Service name is required" },
        { status: 400 },
      );
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { error: "Invalid service price" },
        { status: 400 },
      );
    }

    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
      return NextResponse.json(
        { error: "Invalid service duration" },
        { status: 400 },
      );
    }

    const existingService = await prisma.service.findUnique({
      where: {
        name: name.trim(),
      },
    });

    if (existingService) {
      return NextResponse.json(
        {
          error: "A service with this name already exists",
        },
        { status: 409 },
      );
    }

    const service = await prisma.service.create({
      data: {
        name: name.trim(),
        price: String(parsedPrice),
        durationMinutes,
        isActive: true,
      },
    });

    return NextResponse.json(service, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}
