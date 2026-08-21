# 음성 입력 개요

음성 입력은 말소리를 파일로 만들어 서버에 보내는 과정입니다. 브라우저는 마이크 권한을 요청하고 `MediaRecorder`로 녹음합니다. 녹음이 끝나면 `Blob`이라는 파일 데이터가 만들어집니다.

이 파일은 `FormData`에 담겨 `/api/transcribe`로 전송됩니다. JSON은 글자와 숫자를 보내기 좋고, `FormData`는 파일을 보내기 좋습니다.

```text
마이크 → MediaRecorder → Blob → FormData → STT API
```

사용자가 마이크 권한을 거절하면 녹음을 시작할 수 없으므로 화면에 오류 안내를 표시합니다.
