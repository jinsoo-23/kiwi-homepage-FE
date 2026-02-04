"use client";

import { useScrollAnimation } from "@/lib/hooks";
import { IntroSection } from "./IntroSection";

/**
 * Intro 섹션 + 배경 이미지 블록 (intro.svg)
 * 이미지는 "자유로운 학습경험 생태계" 텍스트 위치에서 시작하고,
 * 스크롤을 내리면 글씨는 그대로 두고 이미지만 아래로 내려가는 효과
 */
export function IntroScrollBlock() {
  const { blockRef, headlineRef, initialTop, translateY } = useScrollAnimation({
    progressMultiplier: 1.0,
    maxTranslateY: 60,
  });

  return (
    <div
      ref={blockRef}
      className="relative w-screen left-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
    >
      {/* 이미지: 헤드라인 위치에서 시작, 스크롤 시 아래로 내려감 */}
      <div
        className="absolute left-0 right-0 z-0 h-[150vh] w-full bg-cover bg-top bg-no-repeat pointer-events-none transition-transform duration-500 ease-out will-change-transform opacity-50"
        style={{
          top: `${initialTop ?? 0}px`,
          backgroundImage: "url(/intro.svg)",
          transform: `translateY(${translateY}vh)`,
        }}
      />
      {/* 글씨(콘텐츠): 이미지 위에 고정, 스크롤해도 이미지만 내려감 */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6">
        <div ref={headlineRef}>
          <IntroSection />
        </div>
      </div>
    </div>
  );
}
