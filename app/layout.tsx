import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOS119 | 음성 건강관리 AI 비서",
  description: "STT → GPT-4o → TTS 기반 음성 건강관리 AI 비서"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}