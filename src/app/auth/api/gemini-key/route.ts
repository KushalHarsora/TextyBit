// app/api/gemini/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const geminiKey = process.env.GEMINI_KEY;
    
    if (!geminiKey) {
        return NextResponse.json({ error: "Gemini API key not found" }, { status: 500 });
    }

    try {
        const response = await fetch("https://api.gemini.com/v1/endpoint", {
            headers: {
                Authorization: `Bearer ${geminiKey}`,
            },
        });

        const data = await response.json();
        
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching data from Gemini" }, { status: 500 });
    }
}
