
```text
사용자 말하기
  → MediaRecorder로 녹음
  → /api/transcribe
  → 인식된 글자
  → /api/chat
  → OpenAI와 MCP 처리
  → 답변 글자
  → /api/tts
  → MP3 재생
```

각 단계는 네트워크 요청으로 연결됩니다. 한 단계에서 오류가 나면 다음 단계로 넘어갈 수 없으므로 브라우저 Network 탭과 서버 터미널을 함께 확인해야 합니다.

게임인지 건강 질문인지는 `page.tsx`가 키워드를 확인해 구분합니다. 게임이면 `start_game`, `submit_word` 같은 도구를 사용하라는 안내를 채팅 API에 추가합니다.
