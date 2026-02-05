"use client";

import { useRef, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("partners");
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = PARTNER_CARDS.length;

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
    setActiveIndex(swiperRef.current.activeIndex);
  }, []);

  return (
    <Box
      as="section"
      aria-label={t("carouselLabel")}
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
            <SwiperSlide key={card.id} className="!h-auto">
              <PartnerCard
                card={card}
                title={t(`${card.id}.title`)}
                description={t(`${card.id}.description`)}
                descriptionHighlight={t.has(`${card.id}.descriptionHighlight`) ? t(`${card.id}.descriptionHighlight`) : undefined}
                showDescription
              />
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
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {`${activeIndex + 1} / ${totalSlides}`}
      </span>
    </Box>
  );
}
