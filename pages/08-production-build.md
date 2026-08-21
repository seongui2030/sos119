# 프로덕션 빌드

```bash
npm run build
```

이 명령은 코드를 컴파일하고 TypeScript 오류를 검사하며 페이지를 최적화합니다. 성공하면 `Compiled successfully`와 라우트 목록이 표시됩니다.

`○`는 정적으로 미리 만들 수 있는 페이지이고, `ƒ`는 요청이 들어올 때 서버에서 실행되는 동적 라우트입니다. `/api/chat`, `/api/transcribe`, `/api/tts`는 외부 서비스와 통신하므로 동적 라우트입니다.

빌드 결과를 실행하려면 다음을 사용합니다.

```bash
npm start
```
