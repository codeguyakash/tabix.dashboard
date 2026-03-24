import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL || 'https://local.codeguyakash.in';
const INTERNAL_KEY = process.env.INTERNAL_KEY || "dummy_key";

export async function GET() {
    try {
        const res = await axios.get(
            `${BASE_URL}/api/v1/internal/server/logs`,
            {
                headers: {
                    Authorization: `Bearer ${Date.now() + Date.now()}`,
                    "x-internal-key": INTERNAL_KEY,
                },
            }
        );

        return NextResponse.json(res.data, { status: res.status });

    } catch (error: any) {
        console.error(error?.response?.data || error.message);

        return NextResponse.json(
            error?.response?.data || { message: 'Request failed' },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}