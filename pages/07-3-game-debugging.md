
게임 시작 문장만 나오고 첫 단어가 나오지 않는다면 다음 순서로 확인합니다.

1. `.env.local`의 `REMOTE_MCP_URL`이 있는지 확인합니다.
2. `MCP_AUTHORIZATION` 값이 필요한 서버인지 확인합니다.
3. 개발 서버 터미널의 오류를 확인합니다.
4. 브라우저 Network 탭에서 `/api/chat` 응답을 확인합니다.
5. 서버에서 `response.output`을 로그로 확인합니다.

`console.log(...)`는 CMD에 직접 입력하는 명령이 아니라 TypeScript 코드입니다. 조사할 때는 `route.ts`의 OpenAI 호출 다음에 임시로 넣고, 확인이 끝나면 민감한 로그가 남지 않도록 삭제합니다.
