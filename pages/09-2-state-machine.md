# 상태 기계 그리기

앱의 상태를 원으로 그리고 상태가 바뀌는 조건을 화살표에 적어 봅니다.

```text
idle → recording → processing → speaking → idle
idle → error
```

- `idle`: 사용자의 입력을 기다림
- `recording`: 마이크로 녹음 중
- `processing`: 서버와 AI가 처리 중
- `speaking`: TTS 음성 재생 중
- `error`: 권한이나 API 오류 발생

활동: `page.tsx`에서 각 상태를 바꾸는 `setStatus()` 호출을 찾아보세요.
