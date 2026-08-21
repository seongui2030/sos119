# 마이크 녹음

## 권한 요청

```ts
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
```

브라우저가 마이크 사용 권한을 묻습니다. 사용자가 허용하면 `stream`에 음성 입력이 연결됩니다.

## 녹음 시작과 종료

```ts
const recorder = new MediaRecorder(stream);
recorder.start();
recorder.stop();
```

`ondataavailable` 이벤트에서 녹음 조각을 배열에 모으고, `onstop` 이벤트에서 하나의 Blob으로 합칩니다.

녹음이 끝나면 `stream.getTracks().forEach(track => track.stop())`으로 마이크 장치를 해제합니다. 장치를 해제하지 않으면 마이크가 계속 사용 중일 수 있습니다.
