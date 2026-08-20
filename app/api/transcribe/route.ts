import { NextResponse } from "next/server";
import { openai, TRANSCRIBE_MODEL } from "../../../lib";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "음성 파일이 없습니다." }, { status: 400 });
    }
    const result = await openai.audio.transcriptions.create({
      file,
      model: TRANSCRIBE_MODEL,
      language: "ko",
      response_format: "json"
    });
    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "STT 처리에 실패했습니다. API 키와 음성 파일을 확인해주세요." }, { status: 500 });
  }
}