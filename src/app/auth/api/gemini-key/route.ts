import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        console.log(request.body);
        return NextResponse.json({ message: "received" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
