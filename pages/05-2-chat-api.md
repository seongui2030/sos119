# 채팅 API

`POST /api/chat`은 질문이나 게임 요청을 OpenAI Responses API에 전달합니다.

```ts
const response = await openai.responses.create({
  model: MODEL,
  instructions: HEALTH_SYSTEM_PROMPT,
  input: message,
  tools: [mcpTool]
});
```

`input`은 사용자의 현재 메시지이고 `instructions`는 AI의 행동 규칙입니다. 게임 요청에는 MCP 도구 목록도 함께 전달합니다.

성공하면 `response.output_text`를 프론트엔드에 반환합니다. 입력이 없으면 `400`, API 키나 MCP 설정에 문제가 있으면 `500`을 반환합니다.
