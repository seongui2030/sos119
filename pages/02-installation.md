# 프로젝트 설치

## 터미널 열기

VS Code에서 `Ctrl + `` ` `` 단축키를 누르거나 메뉴의 **Terminal → New Terminal**을 선택합니다. 현재 위치가 `C:\sos119`인지 확인합니다.

```bash
npm install
```

이 명령은 `package.json`을 읽고 `node_modules` 폴더에 필요한 패키지를 설치합니다.

## 실행 명령

```bash
npm run dev
```

개발 서버가 시작되면 브라우저에서 `http://localhost:3000`을 엽니다.

## 빌드 명령

```bash
npm run build
npm start
```

`build`는 배포용 결과를 만들고, `start`는 그 결과를 실행합니다.
