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

export async function PATCH(request: Request) {
  try {
    const { userId } = auth();

    const { categoryId, name, emoji } = await request.json();

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category || category.userId !== userId) {
      return new NextResponse("Category not found or unauthorized", {
        status: 403,
      });
    }

    const updatedCategory = await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        emoji,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log("[CATEGORY PATCH ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = auth();
    const { categoryId } = await request.json();

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!userId || category?.userId !== userId) {
      return new NextResponse("Category not found or unauthorized", {
        status: 403,
      });
    }

    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY DELETE ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
