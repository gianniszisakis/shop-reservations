import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, displayOrder } = body;

    const existingSource = await prisma.source.findUnique({
      where: {
        id,
      },
    });

    if (!existingSource) {
      return NextResponse.json({ error: "Source not found" }, { status: 404 });
    }

    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
      return NextResponse.json(
        { error: "Source name is required" },
        { status: 400 },
      );
    }

    if (
      displayOrder !== undefined &&
      (!Number.isInteger(displayOrder) || displayOrder < 0)
    ) {
      return NextResponse.json(
        { error: "Invalid display order" },
        { status: 400 },
      );
    }

    if (name !== undefined) {
      const duplicateSource = await prisma.source.findFirst({
        where: {
          name: name.trim(),
          NOT: {
            id,
          },
        },
      });

      if (duplicateSource) {
        return NextResponse.json(
          {
            error: "A source with this name already exists",
          },
          { status: 409 },
        );
      }
    }

    const updatedSource = await prisma.source.update({
      where: {
        id,
      },
      data: {
        ...(name !== undefined && {
          name: name.trim(),
        }),

        ...(displayOrder !== undefined && {
          displayOrder,
        }),
      },
    });

    return NextResponse.json(updatedSource);
  } catch {
    return NextResponse.json(
      { error: "Failed to update source" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const source = await prisma.source.findUnique({
      where: {
        id,
      },
    });

    if (!source) {
      return NextResponse.json({ error: "Source not found" }, { status: 404 });
    }

    const deactivatedSource = await prisma.source.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(deactivatedSource);
  } catch {
    return NextResponse.json(
      { error: "Failed to deactivate source" },
      { status: 500 },
    );
  }
}
