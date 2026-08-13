import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();

    const customers = await prisma.customer.findMany({
      where: {
        isActive: true,
        ...(search
          ? {
              OR: [
                {
                  fullName: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  phone: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = body?.fullName?.trim();
    const phone = body?.phone?.trim() || null;
    const email = body?.email?.trim() || null;
    const notes = body?.notes?.trim() || null;

    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 },
      );
    }

    const customer = await prisma.customer.create({
      data: {
        fullName,
        phone,
        email,
        notes,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 },
    );
  }
}
