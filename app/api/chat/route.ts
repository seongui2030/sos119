import { NextResponse } from "next/server";
import { openai, MODEL, HEALTH_SYSTEM_PROMPT } from "../../../lib";

export const maxDuration = 10;
export const runtime = "nodejs";

const MCP_TOOLS = ["start_game", "submit_word", "get_hint", "give_up", "check_word"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;
    const previousResponseId = body?.previousResponseId || undefined;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "입력이 없습니다." }, { status: 400 });
    }

    const mcpUrl = process.env.REMOTE_MCP_URL;
    let mcpAuthorization = process.env.MCP_AUTHORIZATION;

    if (!mcpUrl) {
      return NextResponse.json({ error: "REMOTE_MCP_URL이 설정되지 않았습니다." }, { status: 500 });
    }

    // Bearer 접두사 보장 처리
    if (mcpAuthorization && !mcpAuthorization.startsWith("Bearer ")) {
      mcpAuthorization = `Bearer ${mcpAuthorization}`;
    }

    const response = await openai.responses.create({
      model: MODEL,
      instructions: HEALTH_SYSTEM_PROMPT,
      input: message,
      ...(previousResponseId ? { previous_response_id: previousResponseId } : {}),
      tools: [
        {
          type: "mcp",
          server_label: process.env.MCP_SERVER_LABEL || "kakao-word-chain",
          server_url: mcpUrl,
          // authorization 값이 있을 때만 전달
          ...(mcpAuthorization ? { authorization: mcpAuthorization } : {}),
          allowed_tools: MCP_TOOLS,
          require_approval: "never"
        } as any
      ]
    });

    return NextResponse.json({ text: response.output_text, mcpUsed: true, responseId: response.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "GPT-4o 또는 카카오 끝말잇기 MCP 처리에 실패했습니다. API 키와 MCP 주소를 확인해주세요."
    }, { status: 500 });
  }
}
