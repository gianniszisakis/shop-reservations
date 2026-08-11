import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(customer);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch customer" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const data: {
      fullName?: string;
      phone?: string | null;
      email?: string | null;
      notes?: string | null;
      isActive?: boolean;
    } = {};

    if (body.fullName !== undefined) {
      const fullName = body.fullName.trim();

      if (!fullName) {
        return NextResponse.json(
          { error: "Full name cannot be empty" },
          { status: 400 },
        );
      }

      data.fullName = fullName;
    }

    if (body.phone !== undefined) {
      data.phone = body.phone?.trim() || null;
    }

    if (body.email !== undefined) {
      data.email = body.email?.trim() || null;
    }

    if (body.notes !== undefined) {
      data.notes = body.notes?.trim() || null;
    }

    if (body.isActive !== undefined) {
      data.isActive = Boolean(body.isActive);
    }

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(customer);
  } catch {
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(customer);
  } catch {
    return NextResponse.json(
      { error: "Failed to deactivate customer" },
      { status: 500 },
    );
  }
}
