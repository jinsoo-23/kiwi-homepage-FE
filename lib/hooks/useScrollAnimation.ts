"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type ScrollAnimationOptions = {
  /** 스크롤 진행률 계산을 위한 분모 배수 (기본값: 1.0) */
  progressMultiplier?: number;
  /** 최대 이동 거리 (vh 단위, 기본값: 60) */
  maxTranslateY?: number;
};

type ScrollAnimationResult = {
  blockRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLDivElement | null>;
  initialTop: number | null;
  translateY: number;
};

/**
 * 스크롤 애니메이션 훅
 * 헤드라인이 뷰포트 상단에 도착했을 때부터 이미지가 아래로 내려가는 효과
 */
export function useScrollAnimation(
  options: ScrollAnimationOptions = {}
): ScrollAnimationResult {
  const { progressMultiplier = 1.0, maxTranslateY = 60 } = options;

  const blockRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [initialTop, setInitialTop] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    function update() {
      const block = blockRef.current;
      const headline = headlineRef.current;
      if (!block || !headline) return;

      const blockRect = block.getBoundingClientRect();
      const headlineRect = headline.getBoundingClientRect();

      // 처음 한번만 top 위치 계산 (헤드라인 기준 위치)
      if (initialTop === null) {
        setInitialTop(headlineRect.top - blockRect.top);
      }

      // 스크롤 진행률: 헤드라인이 뷰포트 상단에 도착했을 때부터 시작
      const scrollProgress =
        headlineRect.top <= 0
          ? Math.max(
              0,
              Math.min(1, -headlineRect.top / (blockRect.height * progressMultiplier))
            )
          : 0;

      setTranslateY(scrollProgress * maxTranslateY);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [initialTop, progressMultiplier, maxTranslateY]);

  return { blockRef, headlineRef, initialTop, translateY };
}
