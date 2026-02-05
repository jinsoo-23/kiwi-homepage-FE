"use client";

import { useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { PARTNER_CARDS } from "@/lib/data/partners";
import { Box } from "@/components/ui/Box";
import { CarouselNavButtons } from "./CarouselNavButtons";
import { PartnerCard } from "./PartnerCard";
import { cn } from "@/lib/utils";

export function PartnersCarouselSection() {
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

  return (
    <Box
      as="section"
      aria-label="파트너 로고 캐러셀"
      className="w-full max-w-[1440px] mx-auto"
    >
      <Box className="relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setIsSwiperReady(true);
          }}
          onSlideChange={updateNavState}
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          slidesPerGroup={1}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4.5 },
          }}
          className={cn(
            "!overflow-visible transition-opacity duration-200",
            isSwiperReady ? "opacity-100" : "opacity-0"
          )}
          grabCursor
        >
          {PARTNER_CARDS.map((card) => (
            <SwiperSlide key={card.title} className="!h-auto">
              <PartnerCard card={card} showDescription />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <CarouselNavButtons
        onPrev={goPrev}
        onNext={goNext}
        isBeginning={isBeginning}
        isEnd={isEnd}
      />
    </Box>
  );
}
