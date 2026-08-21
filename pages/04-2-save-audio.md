# 음성 파일 저장과 전송

이 프로젝트는 음성 파일을 서버나 데이터베이스에 영구 저장하지 않습니다. 녹음한 Blob을 바로 STT API에 전송하는 방식입니다.

```ts
const form = new FormData();
form.append("file", blob, "voice.webm");

const response = await fetch("/api/transcribe", {
  method: "POST",
  body: form
});
```

브라우저에서 `Content-Type`을 직접 지정하지 않는 점이 중요합니다. `FormData`를 사용하면 브라우저가 파일 경계를 포함한 올바른 헤더를 자동으로 만듭니다.
