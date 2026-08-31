import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as xlsx from "xlsx";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Hardcoded password as requested
    if (password !== "Lakshya@1304") {
      return NextResponse.json({ error: "Unauthorized: Invalid password" }, { status: 401 });
    }

    // Fetch all registrations
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Format data for excel
    const excelData = registrations.map((r) => ({
      ID: r.id,
      Name: r.name,
      Phone: r.phone,
      Email: r.email,
      Batch: r.batch,
      Program: r.program,
      "Pass Type": r.passType,
      "Amount Paid": r.amount,
      Activities: r.activities,
      "Mr/Miss Freshers": r.mrMissFreshers ? "Yes" : "No",
      "Registration Date": new Date(r.createdAt).toLocaleString(),
    }));

    // Generate Excel file
    const worksheet = xlsx.utils.json_to_sheet(excelData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Create buffer
    const buf = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Return as downloadable file
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="Shubharambh2_Registrations.xlsx"',
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
