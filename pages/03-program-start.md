# 프로그램 시작하기

## Next.js 명령 흐름

`npm run dev`는 `package.json`의 `dev` 스크립트를 실행합니다.

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

Next.js는 `app` 폴더를 찾아 페이지와 API를 구성합니다. 개발 중에는 코드가 바뀔 때 브라우저를 자동으로 새로 고치는 HMR 기능도 사용합니다.

## 첫 화면

`app/page.tsx`가 `/` 주소의 화면이 됩니다. `app/layout.tsx`는 모든 페이지를 감싸는 공통 HTML과 메타데이터를 담당합니다.
