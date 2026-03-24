import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || "https://local.codeguyakash.in";
const INTERNAL_KEY = process.env.INTERNAL_KEY;

export async function POST() {
  try {
    if (!INTERNAL_KEY) {
      return NextResponse.json(
        { message: "INTERNAL_KEY is not configured" },
        { status: 500 }
      );
    }

    const res = await axios.post(
      `${BASE_URL}/api/v1/internal/server/status`,
      {},
      {
        headers: {
          "x-internal-key": INTERNAL_KEY,
        },
      }
    );
    console.log("Status response code:", res.status);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Status request failed:", error.message);

      return NextResponse.json(
        { message: error.response?.data?.message || "Request failed" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("Unexpected status error:", error);

    return NextResponse.json({ message: "Request failed" }, { status: 500 });
  }
}
