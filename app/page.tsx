"use client";
import { useRef, useState } from "react";

type Status = "idle" | "recording" | "processing" | "speaking" | "error";
type Mode = "health" | "game";
const emergencyKeywords = ["숨이 안 쉬어","숨이 안쉬어","호흡이 안","심정지","의식이 없어","의식 잃","심한 흉통","가슴이 너무 아","가슴 통증이 심","대량 출혈","피가 멈추지","질식","경련","119","응급실"];
const gameKeywords = ["게임 할래","게임하자","게임 하자","끝말잇기","끝말 잇기","두뇌 게임","단어 게임","게임 하고 싶"];
const has = (text:string, arr:string[]) => arr.some(k => text.replace(/\s+/g," ").includes(k));

export default function Home(){
  const [status,setStatus]=useState<Status>("idle"); const [mode,setMode]=useState<Mode>("health");
  const [transcript,setTranscript]=useState(""); const [answer,setAnswer]=useState(""); const [emergency,setEmergency]=useState(false);
  const [error,setError]=useState(""); const [mcpUsed,setMcpUsed]=useState(false); const [gameStarted,setGameStarted]=useState(false);
  const previousResponseId=useRef<string|undefined>(undefined); const mediaRecorder=useRef<MediaRecorder|null>(null); const chunks=useRef<Blob[]>([]);

  const speak=async(text:string)=>{setStatus("speaking"); const r=await fetch("/api/tts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text})}); if(r.ok){const u=URL.createObjectURL(await r.blob());const a=new Audio(u);a.onended=()=>{URL.revokeObjectURL(u);setStatus("idle")};await a.play()}else setStatus("idle")};
  const ask=async(text:string,forceGame=false)=>{
    const game=forceGame||has(text,gameKeywords); if(game)setMode("game");
    if(game&&!gameStarted)setGameStarted(true);
    const input=game?`사용자 음성 입력: "${text}"\n끝말잇기 게임 요청입니다. 카카오 PlayMCP의 실제 도구를 사용해 게임을 진행하세요. 처음이면 start_game, 단어 입력이면 submit_word, 힌트면 get_hint, 종료면 give_up을 사용하세요.`:text;
    setStatus("processing");
    const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:input,previousResponseId:previousResponseId.current})});
    const d=await r.json(); if(!r.ok)throw new Error(d.error||"GPT/MCP 처리 실패");
    previousResponseId.current=d.responseId||undefined;setAnswer(d.text);setMcpUsed(!!d.mcpUsed);if(game)setGameStarted(true);await speak(d.text);
  };
  const process=async(blob:Blob)=>{try{const f=new FormData();f.append("file",blob,"voice.webm");const r=await fetch("/api/transcribe",{method:"POST",body:f});const d=await r.json();if(!r.ok)throw new Error(d.error);const t=d.text||"";setTranscript(t);if(has(t,emergencyKeywords)){setEmergency(true);setMode("health");setAnswer("응급상황이 의심됩니다. 즉시 119에 전화하고 주변 사람에게 도움을 요청하세요.");setStatus("idle");return}await ask(t)}catch(e){setError(e instanceof Error?e.message:"처리 중 오류");setStatus("error")}};
  const start=async()=>{setError("");setEmergency(false);try{const s=await navigator.mediaDevices.getUserMedia({audio:true});const mime=MediaRecorder.isTypeSupported("audio/webm;codecs=opus")?"audio/webm;codecs=opus":"audio/webm";const rec=new MediaRecorder(s,{mimeType:mime});chunks.current=[];rec.ondataavailable=e=>e.data.size&&chunks.current.push(e.data);rec.onstop=async()=>{s.getTracks().forEach(t=>t.stop());await process(new Blob(chunks.current,{type:mime}))};mediaRecorder.current=rec;rec.start();setStatus("recording")}catch{setError("마이크 권한이 필요합니다.");setStatus("error")}};
  const stop=()=>{if(mediaRecorder.current?.state==="recording"){mediaRecorder.current.stop();setStatus("processing")}};
  const quick=async(text:string,game=false)=>{setTranscript(text);setAnswer("");setError("");setEmergency(false);try{await ask(text,game)}catch(e){setError(e instanceof Error?e.message:"오류");setStatus("error")}};
  const newGame=()=>{previousResponseId.current=undefined;setGameStarted(false);setMode("game");quick("게임 할래",true)};
  const endGame=()=>{quick("게임 그만할래. 끝말잇기 게임을 종료해줘.",true);setGameStarted(false)};
  const statusText={idle:mode==="game"?"끝말잇기 단어를 말씀해주세요":"음성으로 건강 상태를 말씀해주세요",recording:"듣고 있습니다… 다시 누르면 종료됩니다",processing:"AI와 MCP가 처리하고 있습니다…",speaking:"AI가 답변을 읽어주는 중입니다…",error:"오류가 발생했습니다"}[status];
  
  return (
    <main className="page">
      <section className="shell">
        <header className="header">
          <div className="brand">
            <span className="brand-mark">SOS</span>
            <span>119</span>
          </div>
          <div className="model-pill">GPT-4o · STT · TTS · MCP</div>
        </header>

        {/* 34행 시작 */}
        <section className="hero">
          <div className={mode === "game" ? "eyebrow game-label" : "eyebrow"}>
            {mode === "game" ? "말벗비서" : "VOICE HEALTH ASSISTANT"}
          </div>
          <h1>
            {mode === "game" ? (
              <>
                말로 즐기는<br />
                <span>두뇌 끝말잇기.</span>
              </>
            ) : (
              <>
                말로 묻고,<br />
                <span>안심하고 관리하세요.</span>
              </>
            )}
          </h1>
          <p>
            {mode === "game"
              ? "“게임 할래”라고 말하면 카카오 끝말잇기 MCP가 실행됩니다."
              : "STT → GPT-4o → TTS + MCP로 연결되는 음성 건강관리 AI 비서입니다."}
          </p>

          {/* 35행 시작 */}
          <div className={`orb ${status}`}>
            <div className="orb-core">
              <span>
                {status === "recording"
                  ? "●"
                  : status === "processing"
                  ? "…"
                  : mode === "game"
                  ? "가"
                  : "⌁"}
              </span>
            </div>
          </div>
          <p className="status">{statusText}</p>

          {/* 36행 시작 */}
          <button
            className={`record ${status === "recording" ? "active" : ""}`}
            onClick={status === "recording" ? stop : start}
            disabled={status === "processing" || status === "speaking"}
          >
            <span className="mic">●</span>
            {status === "recording" ? "말하기 끝내기" : "말하기 시작"}
          </button>
          <div className="quick"><button onClick={()=>quick("오늘 혈압이 145에 90인데 어떻게 관리하면 좋을까요?")}>혈압 관리</button><button onClick={()=>quick("잠을 잘 못 자고 있습니다. 생활습관을 어떻게 바꾸면 좋을까요?")}>수면 관리</button><button onClick={newGame}>🎮 게임 할래</button>{gameStarted&&<button onClick={endGame}>게임 종료</button>}</div>
   </section>
     <section className="dashboard"><div className="card"><div className="card-title"><span>01</span> 음성 인식(STT)</div><p>{transcript||"음성 입력을 기다리고 있습니다."}</p></div><div className="card answer-card"><div className="card-title"><span>02</span> {mode==="game"?"카카오 끝말잇기 MCP":"GPT-4o 건강관리 답변"} {mcpUsed&&<em>MCP 연결</em>}</div><p>{answer||(mode==="game"?"“게임 할래”라고 말하면 카카오 PlayMCP의 start_game이 실행됩니다.":"질문을 말씀하시면 건강관리 방법을 안내합니다.")}</p></div></section>
     {mode==="game"&&<section className="game-info"><strong>🧠 인지활동 게임</strong><p>끝말잇기는 어르신이 재미있게 단어를 떠올리고 말하는 놀이 기능입니다.</p><small>MCP: start_game · submit_word · get_hint · give_up · check_word</small></section>}
     {emergency&&<section className="emergency"><div><strong>응급상황이 의심됩니다.</strong><p>AI의 판단만 기다리지 말고 즉시 전문 의료 도움을 요청하세요.</p></div><a className="call119" href="tel:119">119 전화</a></section>}{error&&<div className="error">{error}</div>}
    <footer><span>⚕ 건강 정보는 참고용이며 진단을 대신하지 않습니다.</span><span>SOS119 · GPT-4o + Kakao PlayMCP</span></footer></section></main>);
  }