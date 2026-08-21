
프론트엔드는 TTS API가 돌려준 MP3 응답을 Blob으로 읽습니다.

```ts
const url = URL.createObjectURL(await response.blob());
const audio = new Audio(url);
audio.onended = () => URL.revokeObjectURL(url);
await audio.play();
```

`URL.createObjectURL`은 브라우저가 임시로 사용할 수 있는 주소를 만듭니다. 재생이 끝나면 `revokeObjectURL`로 주소를 해제합니다.

음성 재생 중에는 상태를 `speaking`으로 바꾸어 사용자가 여러 요청을 동시에 보내지 않도록 합니다.
