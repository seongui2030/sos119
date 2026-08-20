# SOS119 — 음성 건강관리 + 인지활동 AI 비서

## 핵심 흐름
음성 입력 → STT → GPT-4o → 카카오 PlayMCP → TTS → 음성 출력

사용자가 **“게임 할래”**라고 말하면 GPT-4o가 게임 의도를 파악하고 카카오 PlayMCP 한방 끝말잇기를 실제 호출합니다.

### MCP 도구
- `start_game` : 게임 시작
- `submit_word` : 사용자 단어 제출
- `get_hint` : 힌트 요청
- `give_up` : 게임 종료
- `check_word` : 사전 등재 여부 확인

## `.env.local`
```env
OPENAI_API_KEY=sk-여기에-키
OPENAI_MODEL=gpt-4o
OPENAI_TRANSCRIBE_MODEL=gpt-4o-transcribe
OPENAI_TTS_MODEL=gpt-4o-mini-tts
REMOTE_MCP_URL=https://playmcp.kakao.com/mcp/69628021102960817
MCP_SERVER_LABEL=kakao-word-chain
```

## 실행
```bash
npm install
npm run dev
```
브라우저에서 `http://localhost:3000` 접속 후 마이크 권한을 허용합니다.

## 수행평가 발표
“사용자의 음성을 STT로 텍스트화하고 GPT-4o가 의도를 분석합니다. 건강 질문이면 건강관리 답변을 생성하고 TTS로 읽어줍니다. 사용자가 ‘게임 할래’라고 하면 카카오 PlayMCP의 끝말잇기 도구를 호출하여 인지활동 게임을 시작하고, 이후 단어 입력도 MCP를 통해 진행합니다.”

## 안전
응급 키워드는 일반 AI 답변보다 먼저 감지하여 119 전화 버튼을 표시합니다. 실제 신고는 사용자가 직접 버튼을 눌러 진행합니다. 이 프로젝트는 교육/수행평가용 프로토타입이며 의료 진단을 대신하지 않습니다.
