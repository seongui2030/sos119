
개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열고 `F12` 또는 `Ctrl + Shift + I`로 개발자 도구를 엽니다.

## Console 탭

JavaScript 오류, 마이크 권한 오류, 재생 오류를 확인합니다.

## Network 탭

다음 요청을 확인합니다.

- `/api/transcribe`: 음성 파일과 STT 응답
- `/api/chat`: AI 답변과 응답 ID
- `/api/tts`: MP3 응답
- `/api/mcp`: MCP 설정 상태

검색창에 `favicon`을 입력했을 때 결과가 없어도 애플리케이션 기능 오류는 아닙니다. 프로젝트에는 `public/favicon.svg`가 있으므로 레이아웃에서 이 파일을 아이콘으로 지정할 수 있습니다.
