import { MAIN_CONTAINER_ID, SCROLL_DURATION_MS } from "./constants";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * targetId 요소까지 부드럽게 스크롤 (지정 시간 동안)
 */
export function scrollToElementById(
  targetId: string = MAIN_CONTAINER_ID,
  durationMs: number = SCROLL_DURATION_MS
): void {
  if (typeof window === "undefined") return;
  const el = document.getElementById(targetId);
  if (!el) return;
  const startY = window.scrollY;
  const endY = el.getBoundingClientRect().top + startY;
  const startTime = performance.now();

  function tick(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + (endY - startY) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/** 본문(main-container)으로 스크롤 (더 알아보기용) */
export function scrollToMainContainer(): void {
  scrollToElementById(MAIN_CONTAINER_ID, SCROLL_DURATION_MS);
}
