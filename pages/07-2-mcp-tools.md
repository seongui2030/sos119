# MCP 도구와 API 연결

`app/api/chat/route.ts`에는 허용할 도구 이름이 배열로 적혀 있습니다.

```ts
const MCP_TOOLS = [
  "start_game",
  "submit_word",
  "get_hint",
  "give_up",
  "check_word"
];
```

OpenAI에 MCP 서버를 등록할 때 `allowed_tools`에 이 배열을 전달합니다. `require_approval: "never"`는 도구를 실행할 때 매번 별도 승인을 묻지 않는 설정입니다.

MCP 서버 주소가 없다면 `/api/mcp`를 `GET`으로 호출해 연결 설정 상태를 확인할 수 있습니다.
