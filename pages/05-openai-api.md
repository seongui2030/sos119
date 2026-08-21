
OpenAI API는 우리 서버가 인공지능 기능을 사용하도록 해 주는 웹 API입니다. 프로젝트는 `lib.ts`에서 OpenAI 클라이언트를 한 번 만들고 여러 API 라우트에서 가져다 씁니다.

```ts
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

API 키는 서버 환경 변수에서 읽습니다. `page.tsx` 같은 브라우저 코드에서 직접 OpenAI를 호출하지 않는 이유는 키가 사용자에게 노출될 수 있기 때문입니다.

모델 이름도 환경 변수로 바꿀 수 있게 만들어 두었습니다.

```ts
export const MODEL = process.env.OPENAI_MODEL || "gpt-4o";
```
