import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sources = await prisma.source.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
    });

    return NextResponse.json(sources);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch sources" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, displayOrder } = body;

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Source name is required" },
        { status: 400 },
      );
    }

    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      return NextResponse.json(
        { error: "Invalid display order" },
        { status: 400 },
      );
    }

    const sourceName = name.trim();

    const existingSource = await prisma.source.findUnique({
      where: {
        name: sourceName,
      },
    });

    // Same behavior as Services:
    // active duplicate -> reject
    if (existingSource?.isActive) {
      return NextResponse.json(
        {
          error: "A source with this name already exists",
        },
        { status: 409 },
      );
    }

    // Inactive duplicate -> reactivate existing record
    if (existingSource) {
      const reactivatedSource = await prisma.source.update({
        where: {
          id: existingSource.id,
        },
        data: {
          displayOrder,
          isActive: true,
        },
      });

      return NextResponse.json(reactivatedSource, { status: 200 });
    }

    const source = await prisma.source.create({
      data: {
        name: sourceName,
        displayOrder,
        isActive: true,
      },
    });

    return NextResponse.json(source, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create source" },
      { status: 500 },
    );
  }
}
