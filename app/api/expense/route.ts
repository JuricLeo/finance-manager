import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const { amount, category } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const expense = await db.expense.create({
      data: {
        userId,
        amount,
        category,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log("[EXPENSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
