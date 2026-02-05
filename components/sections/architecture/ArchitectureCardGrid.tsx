"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid as SwiperGrid } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import type { ArchitectureCard as ArchitectureCardType } from "@/lib/data/architecture";
import { Grid } from "@/components/ui/Grid";
import { Box } from "@/components/ui/Box";
import { ArchitectureCard } from "./ArchitectureCard";
import { cn } from "@/lib/utils";

export type NavState = {
  goPrev: () => void;
  goNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

type ArchitectureCardGridProps = {
  cards: readonly ArchitectureCardType[];
  cols?: string;
  cardClassName?: string;
  titleClassName?: string;
  onNavStateChange?: (state: NavState) => void;
  slidesPerView?: number;
};

export function ArchitectureCardGrid({
  cards,
  cols = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  cardClassName,
  titleClassName,
  onNavStateChange,
  slidesPerView = 1.2,
}: ArchitectureCardGridProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const updateNavState = useCallback(() => {
    if (!swiperRef.current) return;
    setIsBeginning(swiperRef.current.isBeginning);
    setIsEnd(swiperRef.current.isEnd);
  }, []);

  useEffect(() => {
    onNavStateChange?.({ goPrev, goNext, isBeginning, isEnd });
  }, [isBeginning, isEnd, goPrev, goNext, onNavStateChange]);

  return (
    <>
      {/* 모바일: Swiper */}
      <Box className="sm:hidden">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setIsSwiperReady(true);
          }}
          onSlideChange={updateNavState}
          modules={[Navigation, SwiperGrid]}
          spaceBetween={12}
          slidesPerView={slidesPerView}
          grid={{
            rows: 4,
            fill: "row",
          }}
          className={cn(
            "!overflow-hidden [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:!h-auto [&_.swiper-slide>div]:h-full",
            "transition-opacity duration-200",
            isSwiperReady ? "opacity-100" : "opacity-0"
          )}
          grabCursor
        >
          {cards.map((card) => (
            <SwiperSlide key={card.title}>
              <ArchitectureCard
                card={card}
                cardClassName={cardClassName}
                titleClassName={titleClassName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* 태블릿/데스크탑: Grid */}
      <Box className="hidden sm:block">
        <Grid cols={cols} gap={4}>
          {cards.map((card) => (
            <ArchitectureCard
              key={card.title}
              card={card}
              cardClassName={cardClassName}
              titleClassName={titleClassName}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}
