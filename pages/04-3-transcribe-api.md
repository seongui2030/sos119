# STT API: 음성을 글자로 바꾸기

`app/api/transcribe/route.ts`는 음성 파일을 받아 OpenAI 음성 인식 API에 전달합니다.

```ts
const form = await req.formData();
const file = form.get("file");
```

파일이 없으면 `400` 오류를 반환합니다. 파일이 있으면 다음과 같이 한국어 음성 인식을 요청합니다.

```ts
openai.audio.transcriptions.create({
  file,
  model: TRANSCRIBE_MODEL,
  language: "ko",
  response_format: "json"
});
```

성공 결과는 `{ "text": "인식된 문장" }`입니다. OpenAI 호출에 실패하면 `500` 오류를 반환합니다.
