# 진입점: page.tsx

## 클라이언트 컴포넌트

`page.tsx`의 첫 줄에는 다음 코드가 있습니다.

```tsx
"use client";
```

이 표시가 있으면 브라우저에서 실행되는 클라이언트 컴포넌트가 됩니다. 마이크, 버튼 클릭, 음성 재생처럼 브라우저 기능을 사용하기 때문에 필요합니다.

## 주요 함수

- `start()`: 마이크 권한 요청과 녹음 시작
- `stop()`: 녹음 종료
- `process()`: 음성 파일을 STT API로 전송
- `ask()`: 채팅 API 호출
- `speak()`: TTS 결과 재생
- `newGame()`: 게임 시작

## 상태 관리

`status`, `mode`, `transcript`, `answer` 같은 상태가 화면 내용을 결정합니다. `setAnswer()`로 답변을 바꾸면 React가 답변 영역을 다시 그립니다.
