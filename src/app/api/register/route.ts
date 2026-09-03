import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.name || !data.phone || !data.email || !data.batch || !data.program) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Determine pass amount
    let amount = 0;
    if (data.passType === "Fresher") amount = 500;
    else if (data.passType === "Seniors") amount = 650;

    const registration = await prisma.registration.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        batch: data.batch,
        program: data.program,
        activities: Array.isArray(data.activities) ? data.activities.join(", ") : "",
        mrMissFreshers: Boolean(data.mrMissFreshers),
        passType: data.passType,
        amount: amount,
      },
    });

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
