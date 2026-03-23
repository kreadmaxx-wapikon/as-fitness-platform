import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message } = body ?? {};

    if (!name || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // In a real deployment, send this to your CRM/email.
    // For this template, we just acknowledge the request.
    console.log("[AS-Fitness contact]", { name, phone, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

