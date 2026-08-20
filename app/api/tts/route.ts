import { NextResponse } from "next/server";
import { openai, TTS_MODEL } from "../../../lib";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "TTS 텍스트가 없습니다." }, { status: 400 });
    }
    const response = await openai.audio.speech.create({
      model: TTS_MODEL,
      voice: "coral",
      input: text,
      response_format: "mp3"
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    return new NextResponse(buffer, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "TTS 처리에 실패했습니다." }, { status: 500 });
  }
}