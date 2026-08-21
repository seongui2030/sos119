# TTS API 구현

`app/api/tts/route.ts`는 JSON으로 받은 텍스트를 OpenAI 음성 API에 전달합니다.

```ts
const { text } = await req.json();
const response = await openai.audio.speech.create({
  model: TTS_MODEL,
  voice: "coral",
  input: text,
  response_format: "mp3"
});
```

응답을 `ArrayBuffer`와 `Buffer`로 바꾸고 `audio/mpeg` 형식으로 반환합니다. 텍스트가 비어 있으면 `400` 오류를 반환합니다.
