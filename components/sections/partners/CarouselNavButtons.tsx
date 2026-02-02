"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Stack } from "@/components/ui/Stack";

type CarouselNavButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
  className?: string;
};

export function CarouselNavButtons({
  onPrev,
  onNext,
  isBeginning,
  isEnd,
  className,
}: CarouselNavButtonsProps) {
  const buttonStyle = {
    background: "var(--fill-strong)",
  };
  const buttonClassName = cn(
    "rounded-[100px] p-2.5 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer",
    "hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
  );

  return (
    <Stack
      direction="row"
      gap={2}
      align="center"
      justify="end"
      className={cn("mt-6", className)}
    >
      <button
        type="button"
        onClick={onPrev}
        aria-label="이전"
        disabled={isBeginning}
        style={buttonStyle}
        className={buttonClassName}
      >
        <Image
          src="/icon/arrow.svg"
          alt=""
          width={20}
          height={20}
          className="rotate-180"
        />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="다음"
        disabled={isEnd}
        style={buttonStyle}
        className={buttonClassName}
      >
        <Image src="/icon/arrow.svg" alt="" width={20} height={20} />
      </button>
    </Stack>
  );
}
