"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/Tabs";
import {
  type TabValue,
  SERVICE_CARDS,
  PLATFORM_CARDS,
  FOUNDATION_CARDS,
} from "@/lib/data/architecture";
import { cn } from "@/lib/utils";
import { Box } from "@/components/ui/Box";
import { ArchitectureCardGrid, type NavState } from "./ArchitectureCardGrid";
import { ArchitectureTabTrigger } from "./ArchitectureTabTrigger";
import { CarouselNavButtons } from "../partners/CarouselNavButtons";

const boxBorderByTab: Record<TabValue, string> = {
  service: "border-linus-service",
  platform: "border-linus-primary-dark",
  foundation: "border-linus-foundation",
};

const cardBaseClassName = cn(
  "rounded-xl border border-white/40 shadow-card"
);

const cardClassNameByTab = {
  service: cn(cardBaseClassName, "bg-linus-service-light/80"),
  platform: cn(
    cardBaseClassName,
    "bg-linus-primary-dark-bg border-linus-primary-dark-border"
  ),
  foundation: cn(
    cardBaseClassName,
    "bg-linus-foundation-bg border-linus-foundation-border"
  ),
} as const;

const titleClassNameByTab = {
  service: "text-[20px] font-bold text-linus-service",
  platform: "text-[20px] font-bold text-linus-primary-dark",
  foundation: "text-[20px] font-bold text-linus-foundation",
} as const;

type ServiceSectionProps = {
  "aria-labelledby"?: string;
};

export function ServiceSection({ "aria-labelledby": ariaLabelledBy }: ServiceSectionProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("service");
  const [navStates, setNavStates] = useState<Record<TabValue, NavState>>({
    service: { goPrev: () => { }, goNext: () => { }, isBeginning: true, isEnd: false },
    platform: { goPrev: () => { }, goNext: () => { }, isBeginning: true, isEnd: false },
    foundation: { goPrev: () => { }, goNext: () => { }, isBeginning: true, isEnd: false },
  });

  const handleServiceNavChange = useCallback((state: NavState) => {
    setNavStates((prev) => ({ ...prev, service: state }));
  }, []);

  const handlePlatformNavChange = useCallback((state: NavState) => {
    setNavStates((prev) => ({ ...prev, platform: state }));
  }, []);

  const handleFoundationNavChange = useCallback((state: NavState) => {
    setNavStates((prev) => ({ ...prev, foundation: state }));
  }, []);

  const activeNavState = navStates[activeTab];

  return (
    <Box
      as="section"
      className="w-full px-0 md:px-6 lg:px-8"
      aria-labelledby={ariaLabelledBy}
    >
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        className="w-full gap-3 md:gap-2"
      >
        <TabsList
          variant="line"
          className="w-fit h-auto gap-0 md:gap-6 bg-transparent p-0 border-b-0 mb-0 md:mb-4 mx-auto"
        >
          <ArchitectureTabTrigger value="service">
            Service
          </ArchitectureTabTrigger>
          <ArchitectureTabTrigger value="platform">
            Platform
          </ArchitectureTabTrigger>
          <ArchitectureTabTrigger value="foundation">
            Foundation
          </ArchitectureTabTrigger>
        </TabsList>
        <Box
          className={cn(
            "rounded-2xl border-2 p-6 lg:p-8 bg-white/50",
            boxBorderByTab[activeTab]
          )}
        >
          <TabsContent value="service" className="mt-0">
            <ArchitectureCardGrid
              cards={SERVICE_CARDS}
              cardClassName={cardClassNameByTab.service}
              titleClassName={titleClassNameByTab.service}
              onNavStateChange={handleServiceNavChange}
            />
          </TabsContent>
          <TabsContent value="platform" className="mt-0">
            <ArchitectureCardGrid
              cards={PLATFORM_CARDS}
              cols="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
              cardClassName={cardClassNameByTab.platform}
              titleClassName={titleClassNameByTab.platform}
              onNavStateChange={handlePlatformNavChange}
              slidesPerView={1}
            />
          </TabsContent>
          <TabsContent value="foundation" className="mt-0">
            <ArchitectureCardGrid
              cards={FOUNDATION_CARDS}
              cardClassName={cardClassNameByTab.foundation}
              titleClassName={titleClassNameByTab.foundation}
              onNavStateChange={handleFoundationNavChange}
            />
          </TabsContent>
        </Box>
        <CarouselNavButtons
          onPrev={activeNavState.goPrev}
          onNext={activeNavState.goNext}
          isBeginning={activeNavState.isBeginning}
          isEnd={activeNavState.isEnd}
          className="sm:hidden"
        />
      </Tabs>
    </Box>
  );
}
