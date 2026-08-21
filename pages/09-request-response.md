
브라우저 Network 탭에서 `/api/chat`을 선택하고 Request와 Response를 비교해 봅니다.

요청에는 보통 다음 값이 있습니다.

```json
{
  "message": "게임 할래",
  "previousResponseId": "resp_이전값"
}
```

응답에는 AI가 만든 글자와 다음 대화에 사용할 ID가 있습니다.

```json
{
  "text": "끝말잇기를 시작합니다.",
  "mcpUsed": true,
  "responseId": "resp_새값"
}
```

활동: 각 API의 요청 방식, 본문 형식, 응답 형식을 표로 정리해 보세요.
