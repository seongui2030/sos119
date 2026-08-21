# 환경 변수 설정

## 환경 변수란?

환경 변수는 프로그램 코드와 분리해 보관하는 설정값입니다. API 키처럼 공개하면 안 되는 값이나 컴퓨터마다 달라지는 주소를 저장할 때 사용합니다.

프로젝트 루트에 `.env.local` 파일을 만들고 다음과 같이 작성합니다.

```env
OPENAI_API_KEY=발급받은_키
OPENAI_MODEL=gpt-4o
OPENAI_TRANSCRIBE_MODEL=gpt-4o-transcribe
OPENAI_TTS_MODEL=gpt-4o-mini-tts
REMOTE_MCP_URL=원격_MCP_주소
MCP_AUTHORIZATION=필요한_인증값
MCP_SERVER_LABEL=kakao-word-chain
```

## 주의할 점

`.env.local`은 Git에 올리지 않습니다. 서버를 다시 시작해야 환경 변수 변경이 반영됩니다. `NEXT_PUBLIC_`로 시작하는 값은 브라우저에 공개될 수 있으므로 비밀키에 사용하지 않습니다.
