import { NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || "https://local.codeguyakash.in";
const INTERNAL_KEY = process.env.INTERNAL_KEY || "dummy_key";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/internal/server/logs`, {
      headers: {
        Authorization: `Bearer ${Date.now() + Date.now()}`,
        "x-internal-key": INTERNAL_KEY,
      },
      cache: "no-store",
    });

    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json({ message: "Request failed" }, { status: 500 });
  }
}
