import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await db.category.findMany({
      where: { userId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY GET ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const { name, emoji } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await db.category.create({
      data: {
        name,
        emoji: emoji || "✅",
        userId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY PUT ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}